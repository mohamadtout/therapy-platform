import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const posts = [
  {
    id: 1,
    title: "Autism Spectrum Disorder: Signs, Symptoms, and Support",
    href: "/blogs/autism-spectrum-disorder",
    description:
      "Learn about the early signs of autism, diagnostic process, and how to support your child's development with effective interventions.",
    date: "Mar 16, 2023",
    category: { name: "Delays & Disorders" },
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_404443582-g8BdYp49g78Tiv5oaNjVkKK40LGK9Y.jpeg",
  },
  {
    id: 2,
    title: "Establishing Healthy Sleep Routines for Children",
    href: "/blogs/healthy-sleep-routines",
    description:
      "Discover effective strategies to establish consistent sleep patterns and overcome common bedtime challenges for children of all ages.",
    date: "Feb 12, 2023",
    category: { name: "Parenting Support" },
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_205813503%20%281%29-WM0lWmFovXLbeQUUpcSN4R3jdzaw2t.jpeg",
  },
  {
    id: 3,
    title: "Managing Challenging Behaviors in Children",
    href: "/blogs/managing-challenging-behaviors",
    description:
      "Practical approaches to understanding and addressing challenging behaviors through positive reinforcement and consistent strategies.",
    date: "Jan 24, 2023",
    category: { name: "Parenting Support" },
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_112130603-sxnHxRLX08Wr6lr4FCnbJOhJB14mun.jpeg",
  },
]

export default function BlogTeaser() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Latest Articles</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Expert advice and resources for your child's development journey
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col overflow-hidden">
              <div className="relative w-full">
                <Image
                  src={post.imageUrl || "/placeholder.svg"}
                  alt=""
                  width={400}
                  height={200}
                  className="aspect-[16/9] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
              </div>
              <CardHeader className="flex-1">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.date} className="text-gray-500">
                    {post.date}
                  </time>
                  <span className="text-primary">{post.category.name}</span>
                </div>
                <CardTitle className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <Link href={post.href}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={post.href} className="flex items-center text-sm font-semibold leading-6 text-primary">
                  Read more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/blogs">Read More Articles</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

