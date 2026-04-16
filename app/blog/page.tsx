import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { BLOG_POSTS } from '@/lib/blog-posts';

export const metadata: Metadata = {
  title: "Resume Tips & Career Advice Blog",
  description: "Expert resume writing tips, ATS guides, and career advice. Learn how to write a resume that gets interviews — from professionals who've reviewed thousands.",
  alternates: { canonical: "https://gethiretoday.com/blog" },
};

export default function BlogIndex() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-[var(--teal-50)] to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 bg-white border border-[var(--teal-200)] text-teal rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Tag className="w-4 h-4" /> Resume Tips & Career Advice
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Resume Writing Blog
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Practical advice to help you write a resume that beats ATS filters and impresses recruiters.
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {BLOG_POSTS.map((post) => (
                <article key={post.slug} className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row">
                    <div className={`sm:w-48 h-32 sm:h-auto bg-gradient-to-br ${post.gradient} flex-shrink-0`} />
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold text-teal bg-[var(--teal-50)] px-2.5 py-1 rounded-full">{post.category}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                        <span className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.description}</p>
                      <Link href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline">
                        Read article <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gradient-teal py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to Build Your Resume?
            </h2>
            <p className="text-white/80 mb-8">Put these tips into practice with our AI-powered builder.</p>
            <Link href="/builder/resume/new"
              className="inline-flex items-center gap-2 bg-white text-teal font-semibold rounded-full px-8 py-3 hover:bg-gray-50 transition-colors">
              Start Building Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
