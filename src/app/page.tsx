import Link from "next/link";

const TOP_ALTERNATIVES = [
  { slug: "notion-alternatives", name: "Notion", desc: "All-in-one workspace for notes, docs & projects", icon: "📝", visits: "500K+" },
  { slug: "canva-alternatives", name: "Canva", desc: "Graphic design & visual content creation", icon: "🎨", visits: "450K+" },
  { slug: "zapier-alternatives", name: "Zapier", desc: "Workflow automation & app integration", icon: "⚡", visits: "120K+" },
  { slug: "slack-alternatives", name: "Slack", desc: "Team communication & collaboration", icon: "💬", visits: "1M+" },
  { slug: "asana-alternatives", name: "Asana", desc: "Project management & task tracking", icon: "📋", visits: "300K+" },
  { slug: "monday-alternatives", name: "Monday.com", desc: "Work OS for teams & businesses", icon: "📊", visits: "250K+" },
  { slug: "airtable-alternatives", name: "Airtable", desc: "Spreadsheet & database hybrid", icon: "🗃️", visits: "350K+" },
  { slug: "figma-alternatives", name: "Figma", desc: "Collaborative interface design tool", icon: "✏️", visits: "400K+" },
  { slug: "trello-alternatives", name: "Trello", desc: "Kanban boards & task management", icon: "📌", visits: "250K+" },
  { slug: "evernote-alternatives", name: "Evernote", desc: "Note-taking & knowledge management", icon: "📒", visits: "200K+" },
  { slug: "confluence-alternatives", name: "Confluence", desc: "Team wiki & documentation", icon: "📖", visits: "150K+" },
  { slug: "jira-alternatives", name: "Jira", desc: "Issue tracking & project management", icon: "🐞", visits: "350K+" },
  { slug: "zoom-alternatives", name: "Zoom", desc: "Video conferencing & meetings", icon: "📹", visits: "1M+" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 px-4 text-center">
        <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
          Find the <span className="text-blue-400">Best Alternative</span> to Any Tool
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          Honest comparisons of top tools. See features, pricing, and find the perfect
          alternative — all in one place.
        </p>
        <div className="flex gap-4 justify-center text-sm">
          <Link href="/notion-alternatives" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Start with Notion Alternatives →
          </Link>
          <a href="#categories" className="border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-lg transition-colors">
            Browse All
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { n: "13+", label: "Tools Covered" },
            { n: "50+", label: "Alternatives Listed" },
            { n: "100%", label: "Unbiased Reviews" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-400 mb-1">{s.n}</div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-6xl mx-auto px-4 pb-24">
        <h2 className="text-2xl font-bold text-white mb-6">Popular Alternatives</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOP_ALTERNATIVES.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}/`}
              className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:border-blue-500/50 hover:bg-white/10 transition-all"
            >
              <div className="text-3xl mb-3">{tool.icon}</div>
              <h3 className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-gray-500 text-xs mb-3">{tool.desc}</p>
              <div className="text-xs text-gray-600">~{tool.visits}/mo searches</div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="prose prose-invert prose-sm max-w-none">
          <h2 className="text-2xl font-bold text-white mb-4">
            Why Look for Tool Alternatives?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Whether you&apos;re looking to cut costs, find better features, or escape
            vendor lock-in, finding the right alternative to your current tools can
            save time and money. We research and compare the top alternatives so
            you don&apos;t have to.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Each comparison includes pricing, key features, pros & cons, and
            affiliate links to help you make the best decision for your needs.
          </p>
        </div>
      </section>
    </div>
  );
}
