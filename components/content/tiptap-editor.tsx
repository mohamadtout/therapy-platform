"use client"

import type React from "react"

import { useEditor, EditorContent, BubbleMenu, Extension } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import { Heading } from "@tiptap/extension-heading"
import { useState, useEffect } from "react"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Code,
  Link2,
  ImageIcon,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Check,
  Palette,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Custom extension to add IDs to headings
const HeadingWithID = Extension.create({
  name: "headingWithID",

  addGlobalAttributes() {
    return [
      {
        types: ["heading"],
        attributes: {
          id: {
            default: null,
            parseHTML: (element) => element.getAttribute("id"),
            renderHTML: (attributes) => {
              if (!attributes.id) {
                return {}
              }
              return { id: attributes.id }
            },
          },
        },
      },
    ]
  },

  // Use the onUpdate hook to add IDs to headings
  onUpdate() {
    const transaction = this.editor.view.state.tr
    let modified = false

    // Find all heading nodes in the document
    this.editor.view.state.doc.descendants((node, pos) => {
      if (node.type.name === "heading" && !node.attrs.id) {
        // Get the heading text content
        let headingText = ""
        node.forEach((child) => {
          if (child.text) {
            headingText += child.text
          }
        })

        if (headingText) {
          // Generate an ID from the heading text
          const id = headingText
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")

          // Set the ID attribute on the heading node
          transaction.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            id,
            level: node.attrs.level,
          })
          modified = true
        }
      }
      return true
    })

    // Apply the transaction if we made changes
    if (modified) {
      this.editor.view.dispatch(transaction)
    }
  },
})

// Type for table of contents item
interface TocItem {
  id: string
  level: number
  text: string
}

interface TiptapEditorProps {
  initialContent?: string
  onChange: (content: string) => void
  placeholder?: string
  minHeight?: string
  showPreview?: boolean
  onUpdateToc?: (toc: TocItem[]) => void
}

export default function TiptapEditor({
  initialContent = "",
  onChange,
  placeholder = "Start writing...",
  minHeight = "400px",
  showPreview = true,
  onUpdateToc,
}: TiptapEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("edit")
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [imageCaption, setImageCaption] = useState("")
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null)
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState("#000000")
  const [tableOfContents, setTableOfContents] = useState<TocItem[]>([])
  const colors = [
    "#000000",
    "#343A40",
    "#495057",
    "#6C757D",
    "#ADB5BD",
    "#E9ECEF",
    "#F8F9FA",
    "#FFFFFF",
    "#E03131",
    "#C2255C",
    "#9C36B5",
    "#6741D9",
    "#3B5BDB",
    "#1971C2",
    "#0C8599",
    "#099268",
    "#2B8A3E",
    "#5C940D",
    "#E67700",
    "#D9480F",
  ]

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable default heading to use our custom one
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      HeadingWithID,
      Placeholder.configure({
        placeholder,
      }),
      Image.configure({
        allowBase64: true,
        inline: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      TextStyle,
      Color,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)

      // Extract table of contents
      const toc = extractTableOfContents(editor)
      setTableOfContents(toc)

      // Call the onUpdateToc callback if provided
      if (onUpdateToc) {
        onUpdateToc(toc)
      }
    },
    editorProps: {
      attributes: {
        class: "onesti-editor onesti-content focus:outline-none",
        style: `min-height: ${minHeight}; padding: 1rem;`,
      },
    },
  })

  // Extract table of contents from the editor content
  const extractTableOfContents = (editor: any): TocItem[] => {
    if (!editor) return []

    const toc: TocItem[] = []
    const json = editor.getJSON()

    if (json.content) {
      json.content.forEach((node: any) => {
        if (node.type === "heading" && node.attrs && node.content) {
          const level = node.attrs.level
          const id = node.attrs.id || ""
          const text = node.content
            .map((item: any) => item.text || "")
            .join("")   
            .trim()

          if (text && (level === 1 || level === 2 || level === 3)) {
            // If no ID exists, generate one
            const headingId =
              id ||
              text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")

            toc.push({
              id: headingId,
              level,
              text,
            })
          }
        }
      })
    }

    return toc
  }

  // Add CSS for editor styles
  useEffect(() => {
    // Add custom styles for the editor
    const style = document.createElement("style")
    style.innerHTML = `
      .onesti-editor h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        line-height: 1.2;
      }
      .onesti-editor h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 1.25rem;
        margin-bottom: 0.75rem;
        line-height: 1.3;
      }
      .onesti-editor h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        line-height: 1.4;
      }
      .onesti-editor p {
        margin-bottom: 0.75rem;
      }
      .onesti-editor ul, .onesti-editor ol {
        margin-left: 1.5rem;
        margin-bottom: 1rem;
      }
      .onesti-editor blockquote {
        border-left: 4px solid #e2e8f0;
        padding-left: 1rem;
        font-style: italic;
        margin: 1rem 0;
      }
      .onesti-content h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        line-height: 1.2;
      }
      .onesti-content h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 1.25rem;
        margin-bottom: 0.75rem;
        line-height: 1.3;
      }
      .onesti-content h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        line-height: 1.4;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedImage(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Insert image
  const insertImage = () => {
    if (!editor) return

    let imgSrc = ""

    if (uploadedImagePreview) {
      imgSrc = uploadedImagePreview
    } else if (imageUrl) {
      imgSrc = imageUrl
    } else {
      return
    }

    // Insert image
    editor
      .chain()
      .focus()
      .setImage({
        src: imgSrc,
        alt: imageAlt || "Image",
        title: imageCaption || undefined,
      })
      .run()

    // Reset form
    setShowImageDialog(false)
    setImageUrl("")
    setImageAlt("")
    setImageCaption("")
    setUploadedImage(null)
    setUploadedImagePreview(null)
  }

  // Insert link
  const insertLink = () => {
    if (!editor) return

    if (linkUrl) {
      // If there's selected text, use it as the link text
      if (editor.state.selection.empty && linkText) {
        // If no text is selected but linkText is provided, insert it
        editor
          .chain()
          .focus()
          .insertContent(linkText)
          .setTextSelection({
            from: editor.state.selection.from - linkText.length,
            to: editor.state.selection.from,
          })
          .setLink({ href: linkUrl })
          .run()
      } else {
        // Use the selected text or update the existing link
        editor.chain().focus().setLink({ href: linkUrl }).run()
      }

      setShowLinkDialog(false)
      setLinkUrl("")
      setLinkText("")
    }
  }

  // Set text color
  const setTextColor = (color: string) => {
    if (!editor) return

    editor.chain().focus().setColor(color).run()
    setSelectedColor(color)
    setColorPickerOpen(false)
  }

  return (
    <div className="w-full">
      {showPreview ? (
        <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            {tableOfContents.length > 0 && <TabsTrigger value="toc">Table of Contents</TabsTrigger>}
          </TabsList>

          <TabsContent value="edit" className="w-full">
            <EditorToolbar
              editor={editor}
              setShowLinkDialog={setShowLinkDialog}
              setShowImageDialog={setShowImageDialog}
              selectedColor={selectedColor}
              setColorPickerOpen={setColorPickerOpen}
              colorPickerOpen={colorPickerOpen}
              colors={colors}
              setTextColor={setTextColor}
            />
            <div className="border rounded-md">
              <EditorContent editor={editor} />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="w-full">
            <div className="border rounded-md p-4 onesti-content" style={{ minHeight }}>
              <div dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }} />
            </div>
          </TabsContent>

          <TabsContent value="toc" className="w-full">
            <div className="border rounded-md p-4" style={{ minHeight }}>
              <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
              {tableOfContents.length > 0 ? (
                <ul className="space-y-2">
                  {tableOfContents.map((item, index) => (
                    <li key={index} className={`${item.level === 1 ? "ml-0" : item.level === 2 ? "ml-4" : "ml-8"}`}>
                      <a
                        href={`#${item.id}`}
                        className="text-blue-600 hover:underline"
                        onClick={(e) => {
                          e.preventDefault()
                          if (activeTab === "preview") {
                            const element = document.getElementById(item.id)
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" })
                            }
                          } else {
                            setActiveTab("preview")
                            setTimeout(() => {
                              const element = document.getElementById(item.id)
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth" })
                              }
                            }, 100)
                          }
                        }}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No headings found in the content.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <EditorToolbar
            editor={editor}
            setShowLinkDialog={setShowLinkDialog}
            setShowImageDialog={setShowImageDialog}
            selectedColor={selectedColor}
            setColorPickerOpen={setColorPickerOpen}
            colorPickerOpen={colorPickerOpen}
            colors={colors}
            setTextColor={setTextColor}
          />
          <div className="border rounded-md">
            <EditorContent editor={editor} />
          </div>
        </>
      )}

      {/* Link Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="link-text">Link Text (optional)</Label>
              <Input
                id="link-text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Text to display"
              />
              <p className="text-xs text-muted-foreground">Leave empty to use selected text</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
                Cancel
              </Button>
              <Button onClick={insertLink} disabled={!linkUrl}>
                Insert Link
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Upload Image</Label>
              <div className="border-2 border-dashed rounded-md p-4 text-center">
                {uploadedImagePreview ? (
                  <div className="space-y-2">
                    <img src={uploadedImagePreview || "/placeholder.svg"} alt="Preview" className="max-h-40 mx-auto" />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setUploadedImage(null)
                        setUploadedImagePreview(null)
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Label htmlFor="image-upload" className="cursor-pointer text-blue-600 hover:text-blue-800">
                      Click to upload image
                    </Label>
                  </>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or use URL</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                disabled={!!uploadedImagePreview}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input
                id="image-alt"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Image description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image-caption">Caption (optional)</Label>
              <Input
                id="image-caption"
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
                placeholder="Image caption"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" onClick={() => setShowImageDialog(false)}>
                Cancel
              </Button>
              <Button onClick={insertImage} disabled={!uploadedImagePreview && !imageUrl}>
                Insert Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bubble Menu for quick formatting of selected text */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex items-center gap-1 bg-white border rounded-md shadow-md p-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-active={editor.isActive("bold")}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-active={editor.isActive("italic")}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              data-active={editor.isActive("underline")}
            >
              <UnderlineIcon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                const url = editor.getAttributes("link").href
                setLinkUrl(url || "")
                setShowLinkDialog(true)
              }}
              data-active={editor.isActive("link")}
            >
              <Link2 className="h-4 w-4" />
            </Button>
          </div>
        </BubbleMenu>
      )}
    </div>
  )
}

interface EditorToolbarProps {
  editor: any
  setShowLinkDialog: (show: boolean) => void
  setShowImageDialog: (show: boolean) => void
  selectedColor: string
  setColorPickerOpen: (open: boolean) => void
  colorPickerOpen: boolean
  colors: string[]
  setTextColor: (color: string) => void
}

function EditorToolbar({
  editor,
  setShowLinkDialog,
  setShowImageDialog,
  selectedColor,
  setColorPickerOpen,
  colorPickerOpen,
  colors,
  setTextColor,
}: EditorToolbarProps) {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b pb-2 mb-4">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        data-active={editor.isActive("bold")}
        className={editor.isActive("bold") ? "bg-muted" : ""}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        data-active={editor.isActive("italic")}
        className={editor.isActive("italic") ? "bg-muted" : ""}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        data-active={editor.isActive("underline")}
        className={editor.isActive("underline") ? "bg-muted" : ""}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        data-active={editor.isActive("heading", { level: 1 })}
        className={editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        data-active={editor.isActive("heading", { level: 2 })}
        className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        data-active={editor.isActive("heading", { level: 3 })}
        className={editor.isActive("heading", { level: 3 }) ? "bg-muted" : ""}
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        data-active={editor.isActive("bulletList")}
        className={editor.isActive("bulletList") ? "bg-muted" : ""}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        data-active={editor.isActive("orderedList")}
        className={editor.isActive("orderedList") ? "bg-muted" : ""}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        data-active={editor.isActive("blockquote")}
        className={editor.isActive("blockquote") ? "bg-muted" : ""}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        data-active={editor.isActive({ textAlign: "left" })}
        className={editor.isActive({ textAlign: "left" }) ? "bg-muted" : ""}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        data-active={editor.isActive({ textAlign: "center" })}
        className={editor.isActive({ textAlign: "center" }) ? "bg-muted" : ""}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        data-active={editor.isActive({ textAlign: "right" })}
        className={editor.isActive({ textAlign: "right" }) ? "bg-muted" : ""}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        data-active={editor.isActive("codeBlock")}
        className={editor.isActive("codeBlock") ? "bg-muted" : ""}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShowLinkDialog(true)}
        data-active={editor.isActive("link")}
        className={editor.isActive("link") ? "bg-muted" : ""}
      >
        <Link2 className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="icon" onClick={() => setShowImageDialog(true)}>
        <ImageIcon className="h-4 w-4" />
      </Button>

      {/* Color picker */}
      <Popover open={colorPickerOpen} onOpenChange={setColorPickerOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="ghost" size="icon" className="relative">
            <Palette className="h-4 w-4" />
            <div
              className="absolute bottom-0 right-0 w-2 h-2 rounded-full"
              style={{ backgroundColor: selectedColor }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2">
          <div className="grid grid-cols-5 gap-1">
            {colors.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-md border flex items-center justify-center"
                style={{ backgroundColor: color }}
                onClick={() => setTextColor(color)}
              >
                {color === selectedColor && <Check className="h-4 w-4 text-white stroke-2" />}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <div className="ml-auto flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
