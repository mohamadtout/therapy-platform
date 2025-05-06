"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, MessageSquare, Search, ArrowLeft } from "lucide-react"

// Mock data for blog posts - aligned with admin CMS data structure
const featuredBlog = {
  id: 1,
  title: "Understanding Child Development Milestones",
  subtitle: "A comprehensive guide to tracking your child's development and knowing when to seek professional guidance.",
  date: "15 Mar 2025",
  author: "Dr. Sarah Johnson",
  category: "Child Development",
  image: "/images/child-development.jpeg",
  slug: "child-development-milestones",
  tags: ["Milestones", "Cognitive Development", "Early Childhood", "Parenting Tips"],
}

const blogPosts = [
  {
    id: 2,
    title: "Sensory Processing Strategies for Children with Autism",
    excerpt: "Discover effective sensory processing techniques to help children with autism thrive in various environments.",
    date: "06 Nov 2024",
    author: "Dr. Michael Chen",
    category: "Delays & Disorders",
    image: "/images/speech-therapy.jpeg",
    slug: "sensory-processing-strategies",
    tags: ["Autism Spectrum Disorder", "Sensory Processing", "Special Needs", "Intervention Strategies"],
  },
  {
    id: 3,
    title: "Speech Development Milestones: What to Expect",
    excerpt: "Learn about typical speech development patterns and when to consider seeking help from a speech-language pathologist.",
    date: "15 Nov 2024",
    author: "Dr. Lisa Patel",
    category: "Child Development",
    image: "/images/therapy-session.jpeg",
    slug: "speech-development-milestones",
    tags: ["Language Skills", "Speech Delay", "Milestones", "Early Childhood"],
  },
  {
    id: 4,
    title: "Nutrition and Child Development: Building Healthy Habits",
    excerpt: "Explore the crucial connection between nutrition and cognitive development in children of all ages.",
    date: "08 Dec 2024",
    author: "Dr. Robert Williams",
    category: "Parenting Support",
    image: "/images/child-development.jpeg",
    slug: "nutrition-child-development",
    tags: ["Healthy Eating", "Cognitive Development", "Parenting Tips", "Child Development"],
  },
  {
    id: 5,
    title: "The Benefits of Early Intervention for Developmental Delays",
    excerpt: "Understanding how early intervention services can make a significant difference in a child's developmental trajectory.",
    date: "17 Dec 2024",
    author: "Dr. Emily Chen",
    category: "Assessments & Intervention",
    image: "/images/child-learning.jpeg",
    slug: "early-intervention-benefits",
    tags: ["Early Intervention", "Developmental Screening", "Therapy Options", "Developmental Delays"],
  },
]

// Categories with post count - updated to align with new content organization
const categories = [
  { name: "Child Development", count: 8 },
  { name: "Delays & Disorders", count: 6 },
  { name: "Assessments & Intervention", count: 5 },
  { name: "Parenting Support", count: 5 },
  { name: "Therapy & Specialists", count: 4 },
  { name: "Telepractice & Online Therapy", count: 3 },
]

// Available tags - updated to align with new content organization
const tags = [
  "Milestones",
  "Cognitive Development",
  "Language Skills",
  "Motor Skills",
  "Autism Spectrum Disorder",
  "Speech Delay",
  "Early Intervention",
  "Parenting Tips",
  "Therapy Options",
  "Online Sessions",
]

function BlogsPage({ searchParams }: { searchParams?: { category?: string; tag?: string; q?: string } }) {
  const clientSearchParams = useSearchParams()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState<string | null>(null)
  const [tag, setTag] = useState<string | null>(null)
  
  // Initialize params from URL when component mounts or when URL changes
  useEffect(() => {
    // Use clientSearchParams (from useSearchParams hook) instead of possibly stale prop values
    const q = clientSearchParams.get('q')
    const categoryParam = clientSearchParams.get('category')
    const tagParam = clientSearchParams.get('tag')
    
    if (q) {
      setSearchTerm(q)
    }
    setCategory(categoryParam)
    setTag(tagParam)
  }, [clientSearchParams])
  
  // Filter posts based on category, tag or search term if specified
  const filteredPosts = blogPosts.filter(post => {
    // Start with basic filters for category and tag
    let matches = true;
    
    if (category) {
      matches = matches && post.category.toLowerCase() === decodeURIComponent(category).toLowerCase();
    }
    
    if (tag) {
      matches = matches && (post.tags?.includes(decodeURIComponent(tag)) || false);
    }
    
    // If there's a search term, filter by title, excerpt, author, or category
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchesSearch = 
        post.title.toLowerCase().includes(search) || 
        (post.excerpt && post.excerpt.toLowerCase().includes(search)) || 
        post.author.toLowerCase().includes(search) || 
        post.category.toLowerCase().includes(search) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(search)));
      
      matches = matches && matchesSearch;
    }
    
    return matches;
  });

  // Determine if featured blog should be shown based on filters
  const shouldShowFeaturedBlog = (!category && !tag && !searchTerm) || 
    (category && featuredBlog.category.toLowerCase() === decodeURIComponent(category).toLowerCase()) ||
    (tag && featuredBlog.tags?.includes(decodeURIComponent(tag))) ||
    (searchTerm && (
      featuredBlog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      featuredBlog.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      featuredBlog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      featuredBlog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (featuredBlog.tags && featuredBlog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    ));

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL with search parameter using router.push
    let searchUrl = '/blogs';
    const params = new URLSearchParams();
    
    if (searchTerm) {
      params.set('q', searchTerm);
    }
    if (category) {
      params.set('category', category);
    }
    if (tag) {
      params.set('tag', tag);
    }
    
    const queryString = params.toString();
    if (queryString) {
      searchUrl += `?${queryString}`;
    }
    
    router.push(searchUrl);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {searchTerm && 'Search Results'}
          {category && !searchTerm && `Learn: ${decodeURIComponent(category)}`}
          {tag && !searchTerm && !category && `Tag: ${decodeURIComponent(tag)}`}
          {!category && !tag && !searchTerm && '[COMPANY] Learning Center'}
        </h1>

        {(category || tag || searchTerm) && (
          <div className="mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Learn
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {searchTerm && (
              <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-700">
                  Showing {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "{searchTerm}"
                </p>
              </div>
            )}

            {/* Featured Post - only show if not filtered or if matches filter */}
            {shouldShowFeaturedBlog && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{featuredBlog.title}</h2>

                <div className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col">
                  <div className="relative h-[400px] w-full">
                    <Image
                      src={featuredBlog.image || "/placeholder.svg"}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <Badge className="absolute top-4 left-4 bg-white text-primary">{featuredBlog.category}</Badge>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-500">{featuredBlog.date}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6">{featuredBlog.subtitle}</p>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">{featuredBlog.author}</span>
                      <Link href={`/blogs/${featuredBlog.slug}`}>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Blog Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((blog) => (
                <div key={blog.id} className="bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col">
                  <Link href={`/blogs/${blog.slug}`} className="block">
                    <div className="relative w-full h-48">
                      <Image
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-white text-primary">{blog.category}</Badge>
                    </div>
                  </Link>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between text-gray-500 text-sm mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{blog.date}</span>
                      </div>
                      <span className="text-sm font-medium">{blog.author}</span>
                    </div>

                    <Link href={`/blogs/${blog.slug}`} className="block">
                      <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">{blog.title}</h3>
                    </Link>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>

                    <div className="mt-auto flex justify-end">
                      <Link href={`/blogs/${blog.slug}`} className="text-primary text-sm font-medium hover:underline">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                <p className="text-gray-600">
                  {searchTerm && `No results for "${searchTerm}"`}
                  {category && !searchTerm && `No posts found in the "${decodeURIComponent(category)}" category.`}
                  {tag && !searchTerm && !category && `No posts found with the "${decodeURIComponent(tag)}" tag.`}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search Box */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <form onSubmit={handleSearch} className="mt-6 mb-8">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search for resources..."
                    className="w-full p-3 pl-10 pr-14 bg-white border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Button type="submit" size="sm" className="h-8 rounded-md">
                      Search
                    </Button>
                  </div>
                </div>
                
                {searchTerm && (
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm("");
                        // Update URL to remove search
                        const params = new URLSearchParams();
                        if (category) {
                          params.set('category', category);
                        }
                        if (tag) {
                          params.set('tag', tag);
                        }
                        const queryString = params.toString();
                        if (queryString) {
                          router.push(`/blogs?${queryString}`);
                        } else {
                          router.push('/blogs');
                        }
                      }}
                      className="text-sm text-gray-500 hover:text-primary"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Categories</h3>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <Link
                      href={`/blogs?category=${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-700 hover:text-primary"
                    >
                      {category.name}
                    </Link>
                    <span className="text-gray-500">({category.count})</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Latest News */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Latest Resources</h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 4).map((post) => (
                  <Link href={`/blogs/${post.slug}`} key={post.id} className="flex gap-3 group h-20">
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-0.5">
                      <div className="text-gray-500 text-xs">{post.date}</div>
                      <h4 className="text-sm font-medium group-hover:text-primary line-clamp-2">
                        {post.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/blogs?tag=${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Wrapped ({ searchParams }: { searchParams?: { category?: string; tag?: string; q?: string } }) {
  return(
    <Suspense>
      <BlogsPage searchParams={searchParams}/>
    </Suspense>
  )
}

