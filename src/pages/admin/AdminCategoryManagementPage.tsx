import { Pencil, Search, Trash2 } from "lucide-react"

import Button from "@/components/common/Button"
import { Input } from "@/components/ui/input"

const categories = [
  { id: "1", name: "Cat" },
  { id: "2", name: "General" },
  { id: "3", name: "Inspiration" },
]

export default function AdminCategoryManagementPage() {
  return (
    <section>
      <header className="mb-6 flex items-center justify-between border-b border-brown-300 pb-4">
        <h1 className="text-3xl font-semibold text-brown-600">Category management</h1>
        <Button type="button" className="w-auto! px-6!">
          + Create category
        </Button>
      </header>

      <article className="overflow-hidden rounded-xl border border-brown-300 bg-[#F5F5F5]">
        <section className="border-b border-brown-300 p-5">
          <label htmlFor="category-search" className="sr-only">
            Search categories
          </label>
          <div className="relative max-w-[420px]">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brown-400"
              aria-hidden
            />
            <Input
              id="category-search"
              placeholder="Search..."
              className="h-11 border-brown-300 bg-white pl-10 text-brown-600 placeholder:text-brown-400"
            />
          </div>
        </section>

        <section className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-brown-300 text-sm text-brown-400">
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="w-[110px] px-4 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr
                  key={category.id}
                  className={index === categories.length - 1 ? "" : "border-b border-brown-300/70"}
                >
                  <td className="px-4 py-4 text-brown-600">{category.name}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-3 text-brown-400">
                      <button
                        type="button"
                        className="rounded p-1 transition-colors hover:bg-brown-300/40 hover:text-brown-600"
                        aria-label={`Edit ${category.name} category`}
                      >
                        <Pencil className="size-4" aria-hidden />
                      </button>
                      <button
                        type="button"
                        className="rounded p-1 transition-colors hover:bg-brown-300/40 hover:text-brown-600"
                        aria-label={`Delete ${category.name} category`}
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </article>
    </section>
  )
}
