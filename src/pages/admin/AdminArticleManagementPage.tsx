import Button from "@/components/common/Button"
import { Input } from "@/components/ui/input"

const articles = [
  {
    id: "1",
    title: "Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do",
    category: "Cat",
    status: "Published",
  },
  {
    id: "2",
    title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
    category: "Cat",
    status: "Published",
  },
  {
    id: "3",
    title: "Finding Motivation: How to Stay Inspired Through Life's Challenges",
    category: "General",
    status: "Published",
  },
  {
    id: "4",
    title: "The Science of the Cat's Purr: How It Benefits Cats and Humans Alike",
    category: "Cat",
    status: "Published",
  },
  {
    id: "5",
    title: "Top 10 Health Tips to Keep Your Cat Happy and Healthy",
    category: "Cat",
    status: "Published",
  },
  {
    id: "6",
    title: "Unlocking Creativity: Simple Habits to Spark Inspiration Daily",
    category: "Inspiration",
    status: "Published",
  },
]

export default function AdminArticleManagementPage() {
  return (
    <section>
      <header className="mb-6 flex items-center justify-between border-b border-brown-300 pb-4">
        <h1 className="text-3xl font-semibold text-brown-600">Article management</h1>
        <Button type="button" className="w-auto! px-6!">
          + Create article
        </Button>
      </header>

      <article className="rounded-xl border border-brown-300 bg-[#F5F5F5]">
        <section className="grid grid-cols-1 gap-4 border-b border-brown-300 p-5 md:grid-cols-[1fr_140px_140px]">
          <Input placeholder="Search..." className="h-11 border-brown-300 bg-white" />
          <select
            aria-label="Filter by status"
            className="h-11 rounded-lg border border-brown-300 bg-white px-3 text-brown-600"
            defaultValue=""
          >
            <option value="" disabled>
              Status
            </option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            aria-label="Filter by category"
            className="h-11 rounded-lg border border-brown-300 bg-white px-3 text-brown-600"
            defaultValue=""
          >
            <option value="" disabled>
              Category
            </option>
            <option value="cat">Cat</option>
            <option value="general">General</option>
            <option value="inspiration">Inspiration</option>
          </select>
        </section>

        <section className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-brown-300 text-sm text-brown-400">
                <th className="px-4 py-3 font-medium">Article title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-brown-300/70">
                  <td className="px-4 py-4 text-brown-600">{article.title}</td>
                  <td className="px-4 py-4 text-brown-500">{article.category}</td>
                  <td className="px-4 py-4 text-green-600">• {article.status}</td>
                  <td className="px-4 py-4 text-brown-400">✎  🗑</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </article>
    </section>
  )
}
