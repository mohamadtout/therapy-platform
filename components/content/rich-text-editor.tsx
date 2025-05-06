"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Bold,
  Italic,
  Underline,
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
  Columns,
  LayoutGrid,
  Info,
  AlertTriangle,
  Lightbulb,
  Sidebar,
  MousePointer,
  Undo,
  Redo,
  Strikethrough,
  Superscript,
  Subscript,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface RichTextEditorProps {
  initialContent?: string
  onChange: (content: string) => void
  placeholder?: string
  minHeight?: string
  showPreview?: boolean
}

export default function RichTextEditor({
  initialContent = "",
  onChange,
  placeholder = "Start writing...",
  minHeight = "400px",
  showPreview = true,
}: RichTextEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [activeTab, setActiveTab] = useState<string>("edit")
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [linkTitle, setLinkTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [imageCaption, setImageCaption] = useState("")
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null)

  const editorRef = useRef<HTMLDivElement>(null)

  // Initialize editor with initial content
  useEffect(() => {
    if (editorRef.current) {
      // Set the initial content
      editorRef.current.innerHTML = initialContent

      // Set proper text direction
      editorRef.current.setAttribute("dir", "ltr")

      // Add event listener for keydown to fix Enter key behavior
      editorRef.current.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      // Clean up event listener
      if (editorRef.current) {
        editorRef.current.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [initialContent])

  // Update parent component when content changes
  useEffect(() => {
    onChange(content)
  }, [content, onChange])

  // Handle content changes from the editor
  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
    }
  }

  // Focus the editor
  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  // Format text
  const formatText = (format: string) => {
    // Focus the editor first to ensure commands work on the selection
    focusEditor()

    // Save the current selection
    const selection = window.getSelection()
    const range = selection?.getRangeAt(0)

    // Execute the command
    document.execCommand(format, false)

    // Restore focus and trigger content change
    handleContentChange()
    focusEditor()
  }

  // Insert heading
  const insertHeading = (level: number) => {
    // Focus the editor first
    focusEditor()

    // Save the current selection
    const selection = window.getSelection()
    const range = selection?.getRangeAt(0)

    // Execute the command
    document.execCommand("formatBlock", false, `h${level}`)

    // Trigger content change and maintain focus
    handleContentChange()
    focusEditor()
  }

  // Insert custom element
  const insertCustomElement = (elementType: string) => {
    let html = ""

    switch (elementType) {
      case "info-box":
        html = `<div class="info-box"><h4>Information</h4><p>Add your information here.</p></div>`
        break
      case "warning-box":
        html = `<div class="warning-box"><h4>Warning</h4><p>Add your warning here.</p></div>`
        break
      case "tip-box":
        html = `<div class="tip-box"><h4>Tip</h4><p>Add your tip here.</p></div>`
        break
      case "sidebar":
        html = `<div class="sidebar"><h4>Sidebar Title</h4><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul></div>`
        break
      case "two-column":
        html = `<div class="two-column"><div><p>First column content.</p></div><div><p>Second column content.</p></div></div>`
        break
      case "three-column":
        html = `<div class="three-column"><div><p>First column content.</p></div><div><p>Second column content.</p></div><div><p>Third column content.</p></div></div>`
        break
      case "cta-button":
        html = `<a href="#" class="cta-button">Call to Action</a>`
        break
      default:
        return
    }

    execCommand("insertHTML", html)
  }

  // Insert link
  const insertLink = () => {
    if (linkUrl) {
      const linkHtml = `<a href="${linkUrl}" title="${linkTitle}" ${linkTitle ? `title="${linkTitle}"` : ""}>${linkText || linkUrl}</a>`
      execCommand("insertHTML", linkHtml)
      setShowLinkDialog(false)
      setLinkUrl("")
      setLinkText("")
      setLinkTitle("")
    }
  }

  // Insert image
  const insertImage = () => {
    let imgSrc = ""

    if (uploadedImagePreview) {
      imgSrc = uploadedImagePreview
    } else if (imageUrl) {
      imgSrc = imageUrl
    } else {
      return
    }

    let imgHtml = ""

    if (imageCaption) {
      imgHtml = `<figure><img src="${imgSrc}" alt="${imageAlt}" /><figcaption>${imageCaption}</figcaption></figure>`
    } else {
      imgHtml = `<img src="${imgSrc}" alt="${imageAlt}" />`
    }

    execCommand("insertHTML", imgHtml)
    setShowImageDialog(false)
    setImageUrl("")
    setImageAlt("")
    setImageCaption("")
    setUploadedImage(null)
    setUploadedImagePreview(null)
  }

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

  // Generate table of contents
  const generateTableOfContents = () => {
    if (!editorRef.current) return

    // Find all headings
    const headings = editorRef.current.querySelectorAll("h1, h2, h3, h4")

    // If no headings, don't create TOC
    if (headings.length === 0) return

    // Create TOC HTML
    let tocHtml = `<div class="onesti-toc"><h3>Table of Contents</h3><ul>`

    // Process each heading
    headings.forEach((heading, index) => {
      // Create an ID if it doesn't exist
      if (!heading.id) {
        const headingText = heading.textContent || `heading-${index}`
        const headingId = headingText
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .replace(/\s+/g, "-")

        heading.id = `heading-${index}-${headingId}`
      }

      // Get heading level
      const level = heading.tagName.charAt(1)

      // Add to TOC
      tocHtml += `<li class="toc-h${level}"><a href="#${heading.id}">${heading.textContent}</a></li>`
    })

    tocHtml += `</ul></div>`

    // Insert TOC at the beginning of the content
    editorRef.current.innerHTML = tocHtml + editorRef.current.innerHTML

    // Update content state
    handleContentChange()
  }

  // Handle keydown events
  const handleKeyDown = (e: KeyboardEvent) => {
    // Fix Enter key behavior
    if (e.key === "Enter" && !e.shiftKey) {
      // Get the current selection
      const selection = window.getSelection()
      const range = selection?.getRangeAt(0)

      if (range) {
        // Insert a proper line break
        document.execCommand("insertParagraph", false)

        // Prevent default behavior
        e.preventDefault()

        // Update content state
        handleContentChange()
      }
    }
  }

  const execCommand = (command: string, value: string) => {
    document.execCommand(command, false, value)
    handleContentChange()
  }

  return (
    <div className="w-full">
      {showPreview ? (
        <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="w-full">
            <EditorToolbar
              formatText={formatText}
              insertHeading={insertHeading}
              insertCustomElement={insertCustomElement}
              setShowLinkDialog={setShowLinkDialog}
              setShowImageDialog={setShowImageDialog}
              generateTableOfContents={generateTableOfContents}
            />
            <div
              ref={editorRef}
              className="onesti-editor onesti-content"
              contentEditable
              style={{ minHeight }}
              onInput={handleContentChange}
              dangerouslySetInnerHTML={{ __html: initialContent }}
              data-placeholder={placeholder}
              dir="ltr" // Add this attribute to force left-to-right text direction
            />
          </TabsContent>

          <TabsContent value="preview" className="w-full">
            <div className="border rounded-md p-4 onesti-content" style={{ minHeight }}>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <EditorToolbar
            formatText={formatText}
            insertHeading={insertHeading}
            insertCustomElement={insertCustomElement}
            setShowLinkDialog={setShowLinkDialog}
            setShowImageDialog={setShowImageDialog}
            generateTableOfContents={generateTableOfContents}
          />
          <div
            ref={editorRef}
            className="onesti-editor onesti-content"
            contentEditable
            style={{ minHeight }}
            onInput={handleContentChange}
            dangerouslySetInnerHTML={{ __html: initialContent }}
            data-placeholder={placeholder}
            dir="ltr" // Add this attribute to force left-to-right text direction
          />
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
              <Label htmlFor="link-text">Link Text</Label>
              <Input
                id="link-text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Text to display"
              />
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
            <div className="space-y-2">
              <Label htmlFor="link-title">Title (optional)</Label>
              <Input
                id="link-title"
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
                placeholder="Tooltip text"
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
    </div>
  )
}

interface EditorToolbarProps {
  formatText: (format: string) => void
  insertHeading: (level: number) => void
  insertCustomElement: (elementType: string) => void
  setShowLinkDialog: (show: boolean) => void
  setShowImageDialog: (show: boolean) => void
  generateTableOfContents: () => void
}

function EditorToolbar({
  formatText,
  insertHeading,
  insertCustomElement,
  setShowLinkDialog,
  setShowImageDialog,
  generateTableOfContents,
}: EditorToolbarProps) {
  return (
    <div className="onesti-editor-toolbar">
      <TooltipProvider>
        {/* Text formatting */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => formatText("bold")}>
              <Bold className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bold</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => formatText("italic")}>
              <Italic className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Italic</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => formatText("underline")}>
              <Underline className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Underline</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => formatText("strikeThrough")}>
              <Strikethrough className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Strikethrough</TooltipContent>
        </Tooltip>

        <div className="divider" />

        {/* Headings */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => insertHeading(1)}>
              <Heading1 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Heading 1</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => insertHeading(2)}>
              <Heading2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Heading 2</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => insertHeading(3)}>
              <Heading3 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Heading 3</TooltipContent>
        </Tooltip>

        <div className="divider" />

        {/* Lists */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => formatText("insertUnorderedList")}>
              <List className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bullet List</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => formatText("insertOrderedList")}>
              <ListOrdered className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Numbered List</TooltipContent>
        </Tooltip>

        <div className="divider" />

        {/* Alignment */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => formatText("justifyLeft")}>
              <AlignLeft className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Align Left</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => formatText("justifyCenter")}>
              <AlignCenter className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Align Center</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => formatText("justifyRight")}>
              <AlignRight className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Align Right</TooltipContent>
        </Tooltip>

        <div className="divider" />

        {/* Special formatting */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => formatText("superscript")}>
              <Superscript className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Superscript</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => formatText("subscript")}>
              <Subscript className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Subscript</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                document.execCommand("formatBlock", false, "<pre>")
              }}
            >
              <Code className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Code Block</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                document.execCommand("formatBlock", false, "<blockquote>")
              }}
            >
              <Quote className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Quote</TooltipContent>
        </Tooltip>

        <div className="divider" />

        {/* Links and media */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => setShowLinkDialog(true)}>
              <Link2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Insert Link</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => setShowImageDialog(true)}>
              <ImageIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Insert Image</TooltipContent>
        </Tooltip>

        <div className="divider" />

        {/* Custom elements */}
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="ghost" size="icon">
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Custom Element</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => insertCustomElement("info-box")}
              >
                <Info className="h-5 w-5" />
                <span>Info Box</span>
              </Button>

              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => insertCustomElement("warning-box")}
              >
                <AlertTriangle className="h-5 w-5" />
                <span>Warning Box</span>
              </Button>

              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => insertCustomElement("tip-box")}
              >
                <Lightbulb className="h-5 w-5" />
                <span>Tip Box</span>
              </Button>

              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => insertCustomElement("sidebar")}
              >
                <Sidebar className="h-5 w-5" />
                <span>Sidebar</span>
              </Button>

              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => insertCustomElement("two-column")}
              >
                <Columns className="h-5 w-5" />
                <span>Two Columns</span>
              </Button>

              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => insertCustomElement("three-column")}
              >
                <LayoutGrid className="h-5 w-5" />
                <span>Three Columns</span>
              </Button>

              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center gap-2 col-span-2"
                onClick={() => insertCustomElement("cta-button")}
              >
                <MousePointer className="h-5 w-5" />
                <span>Call to Action Button</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={generateTableOfContents}>
              <ListOrdered className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Generate Table of Contents</TooltipContent>
        </Tooltip>

        <div className="divider" />

        {/* History */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => formatText("undo")}>
              <Undo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={() => formatText("redo")}>
              <Redo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
