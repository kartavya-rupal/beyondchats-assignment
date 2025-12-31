"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { Loader2 } from "lucide-react"

interface Article {
  _id: string
  title: string
  content: string
  sourceUrl?: string
  version: "original" | "updated"
}


export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles`)
        setArticles(res.data)
      } catch (error) {
        console.error("Failed to fetch articles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Latest insights</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-pretty">Articles & Updates</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mt-2">
              Explore our latest articles and insights curated for you.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center min-h-100">
            <div className="text-center">
              <Loader2 className="h-12 w-12 text-muted-foreground animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <article
      className="group relative h-full rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden flex flex-col"
      role="article"
      aria-labelledby={`article-title-${article._id}`}
    >
      <div className="flex items-start justify-between p-6 pb-4">
        <h2
          id={`article-title-${article._id}`}
          className="text-xl font-semibold text-card-foreground pr-4 line-clamp-2 group-hover:text-primary transition-colors"
        >
          {article.title}
        </h2>
        <div className="shrink-0">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide whitespace-nowrap ${article.version === "updated"
                ? "bg-green-100/20 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : "bg-blue-100/20 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
              }`}
            aria-label={`Version: ${article.version}`}
          >
            {article.version}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="prose prose-sm dark:prose-invert max-w-none text-card-foreground/80 leading-relaxed">
          {article.content ? (
            <ReactMarkdown
              components={{
                p: ({ ...props }) => <p className="mb-3 last:mb-0" {...props} />,
                h1: ({ ...props }) => <h1 className="text-lg font-bold mb-2" {...props} />,
                h2: ({ ...props }) => <h2 className="text-base font-bold mb-2" {...props} />,
                h3: ({ ...props }) => <h3 className="text-sm font-bold mb-1" {...props} />,
                ul: ({ ...props }) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                ol: ({ ...props }) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                li: ({ ...props }) => <li className="text-sm" {...props} />,
                blockquote: ({ ...props }) => (
                  <blockquote className="border-l-2 border-primary/30 pl-4 italic text-sm mb-3" {...props} />
                ),
                code: ({ ...props }) => <code className="bg-muted px-2 py-1 rounded text-xs font-mono" {...props} />,
              }}
            >
              {article.content.slice(0, 1200)}
            </ReactMarkdown>
          ) : (
            <p className="text-muted-foreground italic">No content available.</p>
          )}
        </div>

        {article.content && article.content.length > 1200 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-card to-transparent" />
        )}
      </div>

      <div className="border-t border-border px-6 py-4 bg-muted/30">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium">{article.content?.length || 0} characters</span>
          {article.sourceUrl && (
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors underline"
              aria-label={`Read full article: ${article.title}`}
            >
              Read Full
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
