import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const articles = [
  {
    id: 1,
    title: "Our experts will take care of your child...",
    description: "Our experts are dedicated to taking care of your child,...",
    image: "/placeholder.svg?height=200&width=300",
    category: "Paediatrician",
    author: {
      name: "Dr. Pamila Certis",
      image: "/placeholder.svg?height=40&width=40",
    },
    comments: 70,
    views: 1200,
    href: "/resources/blog/experts-care",
  },
  {
    id: 2,
    title: "The first step of the toddler Beyond immunize",
    description: "Nurturing the first steps of your toddler extends beyond...",
    image: "/placeholder.svg?height=200&width=300",
    category: "Paediatrician",
    author: {
      name: "Dr. Ronald Jacobs",
      image: "/placeholder.svg?height=40&width=40",
    },
    comments: 70,
    views: 1200,
    href: "/resources/blog/toddler-immunize",
  },
  {
    id: 3,
    title: "Balanced Diet Chart for Children under age 10",
    description: "Discover a balanced diet chart for children, ensuring optimal nutrition....",
    image: "/placeholder.svg?height=200&width=300",
    category: "Paediatrician",
    author: {
      name: "Dr. Marie Wells",
      image: "/placeholder.svg?height=40&width=40",
    },
    comments: 70,
    views: 1200,
    href: "/resources/blog/balanced-diet-chart",
  },
]

export default function LatestArticles() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Latest Articles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <Link href={article.href}>
                <div className="relative aspect-[3/2]">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4 bg-white text-primary px-3 py-1 rounded-md text-sm font-medium">
                    {article.category}
                  </div>
                </div>
              </Link>
              <CardContent className="p-6">
                <Link href={article.href} className="group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                </Link>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={article.author.image || "/placeholder.svg"}
                      alt={article.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="text-primary">{article.author.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div>{article.comments}</div>
                    <div>{article.views / 1000}k</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

