import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, Sparkles } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { RESUME_EXAMPLES, getExampleBySlug } from '@/lib/resume-examples-data';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return RESUME_EXAMPLES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ex = getExampleBySlug(slug);
  if (!ex) return {};
  return {
    title: ex.metaTitle,
    description: ex.metaDescription,
    alternates: { canonical: `https://gethiretoday.com/resume-examples/${ex.slug}` },
    openGraph: {
      title: ex.metaTitle,
      description: ex.metaDescription,
      url: `https://gethiretoday.com/resume-examples/${ex.slug}`,
      type: 'article',
    },
  };
}

export default async function ExamplePage({ params }: Props) {
  const { slug } = await params;
  const ex = getExampleBySlug(slug);
  if (!ex) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": ex.metaTitle,
    "description": ex.metaDescription,
    "url": `https://gethiretoday.com/resume-examples/${ex.slug}`,
    "publisher": { "@type": "Organization", "name": "Get Hire Today", "url": "https://gethiretoday.com" },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb + hero */}
        <section className="bg-gradient-to-b from-[var(--teal-50)] to-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/resume-examples" className="inline-flex items-center gap-1.5 text-sm text-teal hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to all examples
            </Link>

            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ex.gradient} flex-shrink-0`} />
              <div>
                <span className="text-xs font-semibold text-teal uppercase tracking-wider">{ex.industry} · {ex.level}</span>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">{ex.title} Resume Example</h1>
              </div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">{ex.intro}</p>

            <div className="flex flex-wrap gap-2 mt-6">
              {ex.skills.map((s) => (
                <span key={s} className="text-sm bg-white border border-[var(--teal-200)] text-teal px-3 py-1 rounded-full font-medium">{s}</span>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

          {/* Sample summary */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal" /> Sample Professional Summary
            </h2>
            <div className="bg-[var(--teal-50)] border-l-4 border-teal rounded-r-xl p-5">
              <p className="text-gray-700 leading-relaxed italic">&ldquo;{ex.sampleSummary}&rdquo;</p>
            </div>
            <p className="text-sm text-gray-500 mt-2">Use this as a starting point — customise it with your own metrics and experience.</p>
          </section>

          {/* Sample experience */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sample Work Experience Entry</h2>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-bold text-gray-900 text-base">{ex.sampleExperience.role}</span>
                <span className="text-xs text-gray-400">Jan 2022 – Present</span>
              </div>
              <div className="text-sm font-semibold text-teal mb-3">{ex.sampleExperience.company}</div>
              <ul className="space-y-2">
                {ex.sampleExperience.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-teal font-bold mt-0.5 flex-shrink-0">›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Must-have section */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" /> What to Include in a {ex.title} Resume
            </h2>
            <ul className="space-y-3">
              {ex.mustHave.map((item, i) => (
                <li key={i} className="flex gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" /> Expert Tips for {ex.title} Resumes
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {ex.tips.map((tip, i) => (
                <div key={i} className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">Tip {i + 1}</span>
                  <p className="text-sm text-gray-700 mt-1">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related examples */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">More Resume Examples</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {RESUME_EXAMPLES.filter((e) => e.slug !== ex.slug && e.industry === ex.industry).slice(0, 3).concat(
                RESUME_EXAMPLES.filter((e) => e.slug !== ex.slug && e.industry !== ex.industry).slice(0, 3)
              ).slice(0, 3).map((rel) => (
                <Link key={rel.slug} href={`/resume-examples/${rel.slug}`}
                  className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:border-[var(--teal-200)] hover:bg-[var(--teal-50)] transition-colors">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${rel.gradient} flex-shrink-0`} />
                  <span className="text-sm font-medium text-gray-700">{rel.title}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* CTA */}
        <section className="gradient-teal py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Build Your {ex.title} Resume Now
            </h2>
            <p className="text-white/80 mb-8">
              Use our AI-powered builder. Free to start — takes under 10 minutes.
            </p>
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
