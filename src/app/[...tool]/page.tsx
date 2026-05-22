import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ tool: string[] }>;
}

// 替代品数据（静态数据，后续可迁移到 MDX）
const TOOLS_DATA: Record<string, {
  name: string;
  desc: string;
  searchVolume: string;
  alternatives: Array<{
    name: string;
    price: string;
    freePlan: boolean;
    bestFor: string;
    features: string[];
    affiliateUrl: string;
    rating: string;
    affiliateText: string;
  }>;
  faq: Array<{ q: string; a: string }>;
}> = {
  "notion-alternatives": {
    name: "Notion",
    desc: "All-in-one workspace for notes, docs, wikis & project management",
    searchVolume: "500K+ monthly searches",
    alternatives: [
      {
        name: "ClickUp",
        price: "Free / $7/user/mo",
        freePlan: true,
        bestFor: "Teams needing powerful project management",
        features: ["Docs & Wikis", "Project timelines", "Goals tracking", "AI assistant built-in", "Native time tracking"],
        affiliateUrl: "https://clickup.com",
        rating: "★★★★☆",
        affiliateText: "Try ClickUp Free",
      },
      {
        name: "Coda",
        price: "Free / $10/user/mo",
        freePlan: true,
        bestFor: "Advanced docs with embedded apps",
        features: ["AI-powered docs", "Cross-doc references", "Embedding any app", "Packs (plugins)", "Rich templates"],
        affiliateUrl: "https://coda.io",
        rating: "★★★★☆",
        affiliateText: "Try Coda Free",
      },
      {
        name: "Obsidian",
        price: "Free / $8/mo (Sync) / $96/yr (App license)",
        freePlan: true,
        bestFor: "Note-taking power users & writers",
        features: ["Local-first storage", "Markdown native", "Graph view", "Plugins & themes", "Privacy-first"],
        affiliateUrl: "https://obsidian.md",
        rating: "★★★★★",
        affiliateText: "Download Obsidian Free",
      },
      {
        name: "Linear",
        price: "Free / $8/user/mo",
        freePlan: true,
        bestFor: "Engineering teams",
        features: ["Issue tracking", "GitHub integration", "Sprint planning", "Cycle & roadmap", "Keyboard-first UI"],
        affiliateUrl: "https://linear.app",
        rating: "★★★★☆",
        affiliateText: "Try Linear Free",
      },
      {
        name: "Airtable",
        price: "Free / $20/user/mo",
        freePlan: true,
        bestFor: "Teams needing database + spreadsheet hybrid",
        features: ["Custom views", "Automations", "Apps & integrations", "Enterprise scale", "Connected records"],
        affiliateUrl: "https://airtable.com",
        rating: "★★★★☆",
        affiliateText: "Try Airtable Free",
      },
    ],
    faq: [
      { q: "Is there a free Notion alternative?", a: "Yes. ClickUp, Coda, Obsidian, Linear, and Airtable all offer generous free plans that work for individuals and small teams." },
      { q: "What is the cheapest Notion alternative?", a: "Obsidian has the lowest cost for power users — free for local use. ClickUp and Linear also offer free tiers with extensive features." },
      { q: "Can I migrate my Notion data?", a: "Most alternatives support Notion import or offer migration guides. Obsidian and Logseq can import Notion exports directly." },
    ],
  },
  "canva-alternatives": {
    name: "Canva",
    desc: "Online graphic design platform for social media, presentations & branding",
    searchVolume: "450K+ monthly searches",
    alternatives: [
      {
        name: "Adobe Express",
        price: "Free / $9.99/mo",
        freePlan: true,
        bestFor: "Creative professionals & teams",
        features: ["Adobe integration", "Premium templates", "Brand kit", "Video editing", "AI-powered design"],
        affiliateUrl: "https://express.adobe.com",
        rating: "★★★★☆",
        affiliateText: "Try Adobe Express Free",
      },
      {
        name: "Figma",
        price: "Free / $15/user/mo",
        freePlan: true,
        bestFor: "Designers & teams needing prototyping",
        features: ["Vector design", "Prototyping", "Components & variants", "Real-time collaboration", "Dev handoff"],
        affiliateUrl: "https://figma.com",
        rating: "★★★★★",
        affiliateText: "Try Figma Free",
      },
      {
        name: "VistaCreate",
        price: "Free / $10/mo",
        freePlan: true,
        bestFor: "Small businesses & social media managers",
        features: ["10K+ templates", "Brand kit", "Video editing", "Social scheduler", "Background remover"],
        affiliateUrl: "https://vistacreate.com",
        rating: "★★★★☆",
        affiliateText: "Try VistaCreate Free",
      },
    ],
    faq: [
      { q: "Is Canva free to use?", a: "Yes, Canva has a generous free plan with thousands of templates. Pro plans start at $12.99/month." },
      { q: "What's better than Canva for professional design?", a: "Figma is preferred by professional designers for its vector tools and prototyping. Adobe Express offers Adobe ecosystem integration." },
    ],
  },
  "zapier-alternatives": {
    name: "Zapier",
    desc: "Workflow automation platform connecting apps and automating tasks",
    searchVolume: "200K+ monthly searches",
    alternatives: [
      {
        name: "Make (formerly Integromat)",
        price: "Free / $9/mo",
        freePlan: true,
        bestFor: "Power users wanting complex workflows",
        features: ["Visual workflow builder", "Data transformers", "Error handling", "Scheduling", "Multi-step paths"],
        affiliateUrl: "https://make.com",
        rating: "★★★★☆",
        affiliateText: "Try Make Free",
      },
      {
        name: "n8n",
        price: "Free (self-hosted) / Cloud from $20/mo",
        freePlan: true,
        bestFor: "Developers & tech teams wanting full control",
        features: ["Open source", "Self-hostable", "Custom code", "400+ integrations", "Workflow templates"],
        affiliateUrl: "https://n8n.io",
        rating: "★★★★☆",
        affiliateText: "Try n8n Cloud Free",
      },
      {
        name: "Pabbly",
        price: "Free / $19/mo",
        freePlan: true,
        bestFor: "Budget-conscious businesses",
        features: ["Unlimited tasks", "Email marketing", "Form builder", "Workflows", "API integration"],
        affiliateUrl: "https://pabbly.com",
        rating: "★★★★☆",
        affiliateText: "Try Pabbly Free",
      },
    ],
    faq: [
      { q: "Is there a free Zapier alternative?", a: "Yes. Make offers a free plan with 1,000 operations/month. n8n is free and open-source for self-hosting." },
      { q: "Which automation tool is best for developers?", a: "n8n is preferred by developers due to its open-source nature, self-hosting option, and custom code execution." },
    ],
  },
  "slack-alternatives": {
    name: "Slack",
    desc: "Business communication platform for teams and organizations",
    searchVolume: "1M+ monthly searches",
    alternatives: [
      {
        name: "Discord",
        price: "Free / Nitro $9.99/mo",
        freePlan: true,
        bestFor: "Communities & gaming teams",
        features: ["Voice & video channels", "Screen sharing", "Bots & integrations", "Threads", "File sharing"],
        affiliateUrl: "https://discord.com",
        rating: "★★★★☆",
        affiliateText: "Try Discord Free",
      },
      {
        name: "Microsoft Teams",
        price: "Free / From $5/user/mo",
        freePlan: true,
        bestFor: "Enterprise teams using Microsoft 365",
        features: ["Video meetings", "Office 365 integration", "File storage", "Channel posts", "App integrations"],
        affiliateUrl: "https://teams.microsoft.com",
        rating: "★★★★☆",
        affiliateText: "Try Teams Free",
      },
      {
        name: "Zulip",
        price: "Free / Cloud from $7/user/mo",
        freePlan: true,
        bestFor: "Open-source teams & developers",
        features: ["Topic-based threading", "Open source", "Self-hostable", "GitHub integration", "Markdown support"],
        affiliateUrl: "https://zulip.com",
        rating: "★★★★☆",
        affiliateText: "Try Zulip Cloud Free",
      },
    ],
    faq: [
      { q: "Is there a free Slack alternative?", a: "Yes. Discord and Microsoft Teams both offer generous free plans. Zulip also has a free cloud tier." },
      { q: "Which is better for business than Slack?", a: "Microsoft Teams integrates deeply with Office 365. Discord is better for community and casual teams." },
    ],
  },
  "asana-alternatives": {
    name: "Asana",
    desc: "Project management and team collaboration platform",
    searchVolume: "300K+ monthly searches",
    alternatives: [
      {
        name: "ClickUp",
        price: "Free / $7/user/mo",
        freePlan: true,
        bestFor: "All-in-one project management",
        features: ["Docs & Wikis", "Project timelines", "Goals tracking", "AI assistant", "Native time tracking"],
        affiliateUrl: "https://clickup.com",
        rating: "★★★★☆",
        affiliateText: "Try ClickUp Free",
      },
      {
        name: "Monday.com",
        price: "Free / $9/seat/mo",
        freePlan: true,
        bestFor: "Visual project tracking",
        features: ["Visual boards", "Automations", "Integrations", "Dashboards", "Templates"],
        affiliateUrl: "https://monday.com",
        rating: "★★★★☆",
        affiliateText: "Try Monday.com Free",
      },
      {
        name: "Linear",
        price: "Free / $8/user/mo",
        freePlan: true,
        bestFor: "Engineering & product teams",
        features: ["Issue tracking", "GitHub integration", "Sprint planning", "Cycle & roadmap", "Keyboard-first UI"],
        affiliateUrl: "https://linear.app",
        rating: "★★★★★",
        affiliateText: "Try Linear Free",
      },
    ],
    faq: [
      { q: "Is Asana free?", a: "Asana has a free plan for up to 15 users with unlimited tasks and projects." },
      { q: "What's the best alternative to Asana?", a: "ClickUp offers the most features at the lowest price. Linear is preferred by engineering teams for its speed and issue tracking." },
    ],
  },
  "monday-alternatives": {
    name: "Monday.com",
    desc: "Work operating system for teams to manage projects and workflows",
    searchVolume: "250K+ monthly searches",
    alternatives: [
      {
        name: "ClickUp",
        price: "Free / $7/user/mo",
        freePlan: true,
        bestFor: "Feature-rich project management",
        features: ["Docs & Wikis", "Project timelines", "Goals tracking", "AI assistant", "Native time tracking"],
        affiliateUrl: "https://clickup.com",
        rating: "★★★★☆",
        affiliateText: "Try ClickUp Free",
      },
      {
        name: "Asana",
        price: "Free / $10.99/user/mo",
        freePlan: true,
        bestFor: "Team collaboration & goals",
        features: ["Portfolios", "Goals tracking", "Automation", "Forms", "Timeline view"],
        affiliateUrl: "https://asana.com",
        rating: "★★★★☆",
        affiliateText: "Try Asana Free",
      },
      {
        name: "Notion",
        price: "Free / $8/user/mo",
        freePlan: true,
        bestFor: "Notes, docs & lightweight project management",
        features: ["Databases", "Wikis", "Docs", "Templates", "API access"],
        affiliateUrl: "https://notion.so",
        rating: "★★★★☆",
        affiliateText: "Try Notion Free",
      },
    ],
    faq: [
      { q: "Is Monday.com free?", a: "Monday.com offers a free plan for up to 2 boards with unlimited items." },
      { q: "What is cheaper than Monday.com?", a: "ClickUp starts at $7/user/mo vs Monday.com at $9/seat/mo. Notion is also cheaper at $8/user/mo." },
    ],
  },
  "airtable-alternatives": {
    name: "Airtable",
    desc: "Cloud-based spreadsheet-database hybrid for organizing anything",
    searchVolume: "350K+ monthly searches",
    alternatives: [
      {
        name: "Notion",
        price: "Free / $8/user/mo",
        freePlan: true,
        bestFor: "Notes, docs & database views",
        features: ["Databases", "Wikis", "Docs", "Templates", "API access"],
        affiliateUrl: "https://notion.so",
        rating: "★★★★☆",
        affiliateText: "Try Notion Free",
      },
      {
        name: "ClickUp",
        price: "Free / $7/user/mo",
        freePlan: true,
        bestFor: "All-in-one workspace",
        features: ["Docs & Wikis", "Project timelines", "Goals tracking", "Custom fields", "Databases"],
        affiliateUrl: "https://clickup.com",
        rating: "★★★★☆",
        affiliateText: "Try ClickUp Free",
      },
      {
        name: "Coda",
        price: "Free / $10/user/mo",
        freePlan: true,
        bestFor: "Doc + database hybrid",
        features: ["AI-powered docs", "Cross-doc references", "Embedding any app", "Packs (plugins)", "Rich templates"],
        affiliateUrl: "https://coda.io",
        rating: "★★★★☆",
        affiliateText: "Try Coda Free",
      },
    ],
    faq: [
      { q: "Is Airtable free?", a: "Yes, Airtable has a free plan with 1,000 records per base and unlimited bases." },
      { q: "What is better than Airtable?", a: "Notion offers similar database functionality with better docs integration at a lower price. Coda excels at cross-doc references." },
    ],
  },
  "figma-alternatives": {
    name: "Figma",
    desc: "Collaborative interface design and prototyping tool",
    searchVolume: "400K+ monthly searches",
    alternatives: [
      {
        name: "Canva",
        price: "Free / $12.99/mo",
        freePlan: true,
        bestFor: "Non-designers & quick designs",
        features: ["Templates", "Social media designs", "Presentation mode", "Brand kit", "AI design"],
        affiliateUrl: "https://canva.com",
        rating: "★★★★☆",
        affiliateText: "Try Canva Free",
      },
      {
        name: "Adobe XD",
        price: "Free / $9.99/mo",
        freePlan: true,
        bestFor: "Adobe ecosystem users",
        features: ["Vector design", "Prototyping", "Auto-animate", "3D Components", "Voice prototyping"],
        affiliateUrl: "https://adobe.com/products/xd.html",
        rating: "★★★★☆",
        affiliateText: "Try Adobe XD Free",
      },
      {
        name: "Sketch",
        price: "$99/year",
        freePlan: false,
        bestFor: "Mac-native UI design",
        features: ["Vector editing", "Symbols & components", "Mac-only", "Developer handoff", "Plugins"],
        affiliateUrl: "https://sketch.com",
        rating: "★★★★☆",
        affiliateText: "Try Sketch",
      },
    ],
    faq: [
      { q: "Is Figma free?", a: "Yes, Figma has a free plan with unlimited files and 3 projects. Unlimited projects require $15/user/mo." },
      { q: "What is the best free alternative to Figma?", a: "Canva offers the most generous free plan for non-designers. Adobe XD also has a free tier for prototyping." },
    ],
  },
};

function buildTitle(name: string) {
  return `${name} Alternatives — Top 5 Best ${name} Alternatives in 2025`;
}

function buildDesc(name: string) {
  return `Looking for ${name} alternatives? Compare the top 5 best ${name} alternatives with pricing, features, and affiliate links. Updated May 2025.`;
}

export async function generateMetadata({ params }: Props) {
  const { tool: toolArr } = await params;
  const tool = toolArr.join('/');
  const data = TOOLS_DATA[tool];
  if (!data) return {};
  return {
    title: buildTitle(data.name),
    description: buildDesc(data.name),
    alternates: { canonical: `https://bestalt.org/${tool}/` },
    openGraph: {
      title: buildTitle(data.name),
      description: buildDesc(data.name),
      type: "article",
    },
  };
}

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [
    { tool: ["notion-alternatives"] },
    { tool: ["canva-alternatives"] },
    { tool: ["zapier-alternatives"] },
    { tool: ["slack-alternatives"] },
    { tool: ["asana-alternatives"] },
    { tool: ["monday-alternatives"] },
    { tool: ["airtable-alternatives"] },
    { tool: ["figma-alternatives"] },
  ];
}

export default async function ToolAlternativesPage({ params }: Props) {
  const { tool: toolArr } = await params;
  const tool = toolArr.join('/');
  const data = TOOLS_DATA[tool];
  if (!data) notFound();

  const alternatives = data.alternatives;

  return (
    <article className="max-w-6xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-white">{data.name} Alternatives</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-3">
          {data.name} Alternatives — Top {alternatives.length} Best {data.name} Alternatives in 2025
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          {data.desc}. Updated May 2025 — ~{data.searchVolume}.
        </p>
      </header>

      {/* Comparison Table */}
      <div className="overflow-x-auto mb-10 rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="text-left p-4 font-semibold text-white">Tool</th>
              <th className="text-left p-4 font-semibold text-white">Price</th>
              <th className="text-left p-4 font-semibold text-white">Free Plan</th>
              <th className="text-left p-4 font-semibold text-white">Best For</th>
              <th className="text-left p-4 font-semibold text-white">Rating</th>
            </tr>
          </thead>
          <tbody>
            {alternatives.map((alt, i) => (
              <tr key={alt.name} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                <td className="p-4 font-semibold text-blue-400">{alt.name}</td>
                <td className="p-4 text-gray-300">{alt.price}</td>
                <td className="p-4 text-gray-300">{alt.freePlan ? "✓" : "✗"}</td>
                <td className="p-4 text-gray-400">{alt.bestFor}</td>
                <td className="p-4 text-yellow-400">{alt.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alternatives Detail Cards */}
      <div className="space-y-6 mb-12">
        {alternatives.map((alt, i) => (
          <div key={alt.name} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-1">
                  {i + 1}. {alt.name}
                </h2>
                <p className="text-gray-400 text-sm mb-3">{alt.bestFor}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {alt.features.map((f) => (
                    <span key={f} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
                      {f}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  <span className="font-semibold text-white">Price:</span> {alt.price}
                </p>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-3 min-w-[200px]">
                <div className="text-yellow-400 text-sm">{alt.rating}</div>
                <a
                  href={alt.affiliateUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  {alt.affiliateText} →
                </a>
                <p className="text-xs text-gray-600">*Affiliate link</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How to Choose */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          How to Choose the Right {data.name} Alternative
        </h2>
        <div className="text-gray-400 leading-relaxed space-y-3">
          <p>
            When choosing an alternative to {data.name}, consider what you use most: note-taking,
            project management, databases, or all of the above. No single tool excels at everything.
          </p>
          <p>
            <strong className="text-white">For teams:</strong> Prioritize collaboration features, integrations,
            and admin controls. ClickUp and Airtable excel here.
          </p>
          <p>
            <strong className="text-white">For individuals:</strong> Prioritize ease of use, offline access,
            and long-term cost. Obsidian is free and local-first.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">FAQ</h2>
        <div className="space-y-4">
          {data.faq.map((item) => (
            <details key={item.q} className="bg-white/5 border border-white/10 rounded-lg group">
              <summary className="p-5 cursor-pointer font-semibold text-white text-sm hover:text-blue-400 transition-colors list-none flex items-center justify-between">
                {item.q}
                <span className="text-gray-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Disclosure */}
      <section className="border-t border-white/10 pt-6">
        <p className="text-xs text-gray-600">
          <strong>Disclosure:</strong> This page contains affiliate links. If you sign up through our links,
          we may earn a commission at no extra cost to you. Our reviews are based on research and are not
          influenced by compensation.
        </p>
      </section>
    </article>
  );
}
