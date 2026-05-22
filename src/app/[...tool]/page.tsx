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
  "trello-alternatives": {
    name: "Trello",
    desc: "Kanban-style list-making app for project management and team collaboration",
    searchVolume: "250K+ monthly searches",
    alternatives: [
      {
        name: "ClickUp",
        price: "Free / $7/user/mo",
        freePlan: true,
        bestFor: "All-in-one project management with kanban boards",
        features: ["Kanban boards", "Docs & Wikis", "Goals tracking", "Time tracking", "Custom fields"],
        affiliateUrl: "https://clickup.com",
        rating: "★★★★☆",
        affiliateText: "Try ClickUp Free",
      },
      {
        name: "Notion",
        price: "Free / $8/user/mo",
        freePlan: true,
        bestFor: "Notes, docs & flexible databases",
        features: ["Databases", "Wikis", "Docs", "Templates", "API access"],
        affiliateUrl: "https://notion.so",
        rating: "★★★★☆",
        affiliateText: "Try Notion Free",
      },
      {
        name: "Linear",
        price: "Free / $8/user/mo",
        freePlan: true,
        bestFor: "Engineering teams wanting fast issue tracking",
        features: ["Issue tracking", "GitHub integration", "Sprint planning", "Cycles", "Keyboard-first UI"],
        affiliateUrl: "https://linear.app",
        rating: "★★★★★",
        affiliateText: "Try Linear Free",
      },
      {
        name: "Asana",
        price: "Free / $10.99/user/mo",
        freePlan: true,
        bestFor: "Teams needing structured project management",
        features: ["Boards & Timeline", "Goals", "Forms", "Automation", "Portfolios"],
        affiliateUrl: "https://asana.com",
        rating: "★★★★☆",
        affiliateText: "Try Asana Free",
      },
      {
        name: "Taskade",
        price: "Free / $8/mo",
        freePlan: true,
        bestFor: "AI-powered task lists and mind maps",
        features: ["AI writing", "Mind mapping", "Outliner", "Real-time collaboration", "Task templates"],
        affiliateUrl: "https://taskade.com",
        rating: "★★★★☆",
        affiliateText: "Try Taskade Free",
      },
    ],
    faq: [
      { q: "Is Trello free?", a: "Yes, Trello has a generous free plan with unlimited cards, boards, and up to 10 boards per workspace." },
      { q: "What is the best free alternative to Trello?", a: "ClickUp and Notion both offer free plans that go far beyond Trello's feature set, including docs, databases, and advanced project tracking." },
      { q: "Is there an open source alternative to Trello?", a: "Wekan is a popular open-source Kanban alternative that can be self-hosted. Focalboard by Mattermost is another option." },
    ],
  },
  "evernote-alternatives": {
    name: "Evernote",
    desc: "Note-taking and organization app for capturing ideas, docs, and web clips",
    searchVolume: "200K+ monthly searches",
    alternatives: [
      {
        name: "Obsidian",
        price: "Free / $8/mo (Sync) / $96/yr (App license)",
        freePlan: true,
        bestFor: "Power users who want local-first, Markdown-based notes",
        features: ["Local-first storage", "Markdown native", "Graph view", "Plugins & themes", "Privacy-first"],
        affiliateUrl: "https://obsidian.md",
        rating: "★★★★★",
        affiliateText: "Download Obsidian Free",
      },
      {
        name: "Notion",
        price: "Free / $8/user/mo",
        freePlan: true,
        bestFor: "Teams wanting notes, docs & databases in one place",
        features: ["Databases", "Wikis", "Docs", "Templates", "API access"],
        affiliateUrl: "https://notion.so",
        rating: "★★★★☆",
        affiliateText: "Try Notion Free",
      },
      {
        name: "Bear",
        price: "Free / $15/yr (Pro)",
        freePlan: true,
        bestFor: "Mac & iOS users wanting beautiful Markdown notes",
        features: ["Apple ecosystem", "Markdown editor", "Tags & nesting", "Themes", "iCloud sync"],
        affiliateUrl: "https://bear.app",
        rating: "★★★★☆",
        affiliateText: "Try Bear Free",
      },
      {
        name: "Logseq",
        price: "Free / $8/mo (Pro)",
        freePlan: true,
        bestFor: "Outliner-style notes with graph view",
        features: ["Outliner-first", "Local storage", "Graph view", "Org-mode compatible", "Open source"],
        affiliateUrl: "https://logseq.com",
        rating: "★★★★☆",
        affiliateText: "Try Logseq Free",
      },
      {
        name: "ClickUp",
        price: "Free / $7/user/mo",
        freePlan: true,
        bestFor: "Teams needing docs + tasks combined",
        features: ["Docs & Wikis", "Task management", "Views (Board/List/Doc)", "AI assistant", "Templates"],
        affiliateUrl: "https://clickup.com",
        rating: "★★★★☆",
        affiliateText: "Try ClickUp Free",
      },
    ],
    faq: [
      { q: "Is there a free Evernote alternative?", a: "Yes. Obsidian, Notion, Bear, and Logseq all offer free plans that are more feature-rich than Evernote's free tier." },
      { q: "What is the best Evernote alternative for Mac?", a: "Bear is the most Apple-native alternative with a beautiful editor and deep iOS/macOS integration. Obsidian offers more power for Markdown users." },
      { q: "Can I migrate from Evernote easily?", a: "Most alternatives support Evernote import. Notion and Obsidian both have official Evernote import tools." },
    ],
  },
  "confluence-alternatives": {
    name: "Confluence",
    desc: "Team workspace for docs, knowledge bases, and project collaboration from Atlassian",
    searchVolume: "150K+ monthly searches",
    alternatives: [
      {
        name: "Notion",
        price: "Free / $8/user/mo",
        freePlan: true,
        bestFor: "All-in-one docs, wikis & project management",
        features: ["Databases", "Wikis", "Docs", "Templates", "API access"],
        affiliateUrl: "https://notion.so",
        rating: "★★★★☆",
        affiliateText: "Try Notion Free",
      },
      {
        name: "ClickUp",
        price: "Free / $7/user/mo",
        freePlan: true,
        bestFor: "Teams wanting docs + project management combined",
        features: ["Docs & Wikis", "Task management", "Goals", "Views", "Templates"],
        affiliateUrl: "https://clickup.com",
        rating: "★★★★☆",
        affiliateText: "Try ClickUp Free",
      },
      {
        name: "Nuclino",
        price: "Free / $8/user/mo",
        freePlan: true,
        bestFor: "Lightweight team wiki & knowledge base",
        features: ["Real-time collab", "Graph view", "Markdown support", "Interlinking", "Simple UI"],
        affiliateUrl: "https://nuclino.com",
        rating: "★★★★☆",
        affiliateText: "Try Nuclino Free",
      },
      {
        name: "Outline",
        price: "Free (self-hosted) / Cloud from $8/user/mo",
        freePlan: true,
        bestFor: "Open-source wiki for developer teams",
        features: ["Open source", "Markdown editor", "Permissions", "Integrations", "Self-hostable"],
        affiliateUrl: "https://www.getoutline.com",
        rating: "★★★★☆",
        affiliateText: "Try Outline",
      },
      {
        name: "Slite",
        price: "Free / $12/user/mo",
        freePlan: true,
        bestFor: "Simple team docs with AI assistance",
        features: ["AI-powered search", "Docs & SOPs", "Channels", "Templates", "Markdown support"],
        affiliateUrl: "https://slite.com",
        rating: "★★★★☆",
        affiliateText: "Try Slite Free",
      },
    ],
    faq: [
      { q: "Is there a free Confluence alternative?", a: "Yes. Notion, ClickUp, and Outline all offer free plans that rival Confluence's features without the high price." },
      { q: "What is better than Confluence for small teams?", a: "Notion and Slite are lighter and easier to set up than Confluence, with better pricing for small teams." },
      { q: "Can I self-host a Confluence alternative?", a: "Outline is the best self-hosted open-source alternative. It's built for teams that need full data ownership." },
    ],
  },
  "jira-alternatives": {
    name: "Jira",
    desc: "Enterprise issue tracking and project management tool from Atlassian",
    searchVolume: "350K+ monthly searches",
    alternatives: [
      {
        name: "Linear",
        price: "Free / $8/user/mo",
        freePlan: true,
        bestFor: "Engineering teams wanting fast, keyboard-first issue tracking",
        features: ["Issue tracking", "GitHub integration", "Sprint planning", "Cycles", "Keyboard-first UI"],
        affiliateUrl: "https://linear.app",
        rating: "★★★★★",
        affiliateText: "Try Linear Free",
      },
      {
        name: "ClickUp",
        price: "Free / $7/user/mo",
        freePlan: true,
        bestFor: "All-in-one project management for dev teams",
        features: ["Bug tracking", "Dev docs", "Sprints", "Custom fields", "GitHub integration"],
        affiliateUrl: "https://clickup.com",
        rating: "★★★★☆",
        affiliateText: "Try ClickUp Free",
      },
      {
        name: "GitHub Issues",
        price: "Free / $4/user/mo",
        freePlan: true,
        bestFor: "Open-source projects on GitHub",
        features: ["Code-linked issues", "Labels & milestones", "Projects", "Discussions", "GitHub integration"],
        affiliateUrl: "https://github.com/features/issues",
        rating: "★★★★☆",
        affiliateText: "Try GitHub Issues Free",
      },
      {
        name: "YouTrack",
        price: "Free (up to 10 users) / $10/user/mo",
        freePlan: true,
        bestFor: "Dev teams wanting on-premise or cloud",
        features: ["Agile boards", "Time tracking", "Knowledge base", "Git integration", "Custom workflows"],
        affiliateUrl: "https://www.jetbrains.com/youtrack/",
        rating: "★★★★☆",
        affiliateText: "Try YouTrack Free",
      },
      {
        name: "Shortcut",
        price: "Free / $12/user/mo",
        freePlan: true,
        bestFor: "Streamlined issue tracking for startups",
        features: ["Story points", "Milestones", "Iterations", "Slack integration", "Custom workflows"],
        affiliateUrl: "https://shortcut.com",
        rating: "★★★★☆",
        affiliateText: "Try Shortcut Free",
      },
    ],
    faq: [
      { q: "Is there a free Jira alternative?", a: "Yes. Linear, GitHub Issues, ClickUp, and YouTrack all offer free plans suitable for small dev teams." },
      { q: "What is the best Jira alternative for small teams?", a: "Linear is widely regarded as the best Jira alternative — it's faster, cleaner, and designed specifically for modern dev teams." },
      { q: "Can I migrate from Jira easily?", a: "Most alternatives offer Jira import. Linear and ClickUp both have migration tools that transfer issues, comments, and attachments." },
    ],
  },
  "zoom-alternatives": {
    name: "Zoom",
    desc: "Video conferencing platform for meetings, webinars, and remote collaboration",
    searchVolume: "1M+ monthly searches",
    alternatives: [
      {
        name: "Google Meet",
        price: "Free / $10/user/mo",
        freePlan: true,
        bestFor: "Teams already using Google Workspace",
        features: ["HD video", "Screen sharing", "Live captions", "Recording", "Calendar integration"],
        affiliateUrl: "https://meet.google.com",
        rating: "★★★★☆",
        affiliateText: "Try Google Meet Free",
      },
      {
        name: "Microsoft Teams",
        price: "Free / $5/user/mo",
        freePlan: true,
        bestFor: "Enterprise teams using Microsoft 365",
        features: ["Video meetings", "Chat", "Office 365 integration", "File storage", "Channel posts"],
        affiliateUrl: "https://teams.microsoft.com",
        rating: "★★★★☆",
        affiliateText: "Try Teams Free",
      },
      {
        name: "Discord",
        price: "Free / Nitro $9.99/mo",
        freePlan: true,
        bestFor: "Casual teams, communities & gaming groups",
        features: ["Voice & video channels", "Screen sharing", "Bots", "Threads", "Large group calls"],
        affiliateUrl: "https://discord.com",
        rating: "★★★★☆",
        affiliateText: "Try Discord Free",
      },
      {
        name: "Jitsi Meet",
        price: "Free (self-hosted or via meet.jit.si)",
        freePlan: true,
        bestFor: "Privacy-conscious users wanting no account required",
        features: ["No account needed", "Open source", "End-to-end encryption", "Customizable", "Self-hostable"],
        affiliateUrl: "https://meet.jit.si",
        rating: "★★★★☆",
        affiliateText: "Use Jitsi Meet Free",
      },
      {
        name: "Whereby",
        price: "Free / $10/mo",
        freePlan: true,
        bestFor: "Simple browser-based video meetings",
        features: ["No app needed", "Custom rooms", "Screen sharing", "Breakout rooms", "iframe embed"],
        affiliateUrl: "https://whereby.com",
        rating: "★★★★☆",
        affiliateText: "Try Whereby Free",
      },
    ],
    faq: [
      { q: "Is there a free alternative to Zoom?", a: "Yes. Google Meet, Microsoft Teams, Discord, and Jitsi all offer generous free plans for video conferencing." },
      { q: "Which Zoom alternative has no time limit?", a: "Google Meet's free plan allows 60-minute group meetings. Jitsi Meet has no time limit. Discord's free tier allows 25-person video calls." },
      { q: "What is the most private Zoom alternative?", a: "Jitsi Meet is open-source and can be self-hosted, giving you full control over your data without any account required." },
    ],
  },
  "dropbox-alternatives": {
    name: "Dropbox",
    desc: "Cloud file storage and synchronization service for backing up and sharing files",
    searchVolume: "300K+ monthly searches",
    alternatives: [
      {
        name: "Google Drive",
        price: "Free / $1.99/user/mo (100GB)",
        freePlan: true,
        bestFor: "Teams using Google Workspace",
        features: ["15GB free", "Google Docs integration", "Real-time collaboration", "Shared drives", "Offline access"],
        affiliateUrl: "https://drive.google.com",
        rating: "★★★★☆",
        affiliateText: "Try Google Drive Free",
      },
      {
        name: "pCloud",
        price: "Free / $3.99/mo (500GB)",
        freePlan: true,
        bestFor: "Users wanting lifetime cloud storage",
        features: ["10GB free", "Lifetime plans", "File versioning", "Encryption", "Client-side encryption"],
        affiliateUrl: "https://pcloud.com",
        rating: "★★★★☆",
        affiliateText: "Try pCloud Free",
      },
      {
        name: "Sync.com",
        price: "Free / $8/mo (2TB)",
        freePlan: true,
        bestFor: "Privacy-focused users",
        features: ["Zero-knowledge encryption", "End-to-end encryption", "No file size limits", "GDPR compliant", "Canadian servers"],
        affiliateUrl: "https://sync.com",
        rating: "★★★★★",
        affiliateText: "Try Sync.com Free",
      },
      {
        name: "Icedrive",
        price: "Free / $2.99/mo (150GB)",
        freePlan: true,
        bestFor: "Users wanting simple, modern interface",
        features: ["10GB free", "One-time payment option", "Built-in media viewer", "Desktop app", "Clean UI"],
        affiliateUrl: "https://icedrive.net",
        rating: "★★★★☆",
        affiliateText: "Try Icedrive Free",
      },
      {
        name: "Nextcloud",
        price: "Free (self-hosted) / Hosted from $5/mo",
        freePlan: true,
        bestFor: "Tech-savvy users wanting full data control",
        features: ["Open source", "Self-hostable", "File sync & share", "Calendar & contacts", "300+ apps"],
        affiliateUrl: "https://nextcloud.com",
        rating: "★★★★☆",
        affiliateText: "Try Nextcloud",
      },
    ],
    faq: [
      { q: "Is there a free alternative to Dropbox?", a: "Yes. Google Drive offers 15GB free, pCloud offers 10GB, and Nextcloud is completely free and open-source." },
      { q: "What is the best Dropbox alternative for privacy?", a: "Sync.com and Nextcloud offer end-to-end encryption. Sync.com is zero-knowledge, meaning even the company cannot access your files." },
      { q: "Can I switch from Dropbox easily?", a: "Yes. All major alternatives offer migration tools or support direct Dropbox import. Most sync clients can also replace Dropbox directly." },
    ],
  },
  "powerpoint-alternatives": {
    name: "PowerPoint",
    desc: "Microsoft's presentation software for creating slide decks and visual presentations",
    searchVolume: "350K+ monthly searches",
    alternatives: [
      {
        name: "Canva",
        price: "Free / $12.99/mo",
        freePlan: true,
        bestFor: "Non-designers creating beautiful presentations",
        features: ["Thousands of templates", "Drag-and-drop editor", "Brand kit", "Team collaboration", "AI design tools"],
        affiliateUrl: "https://canva.com",
        rating: "★★★★☆",
        affiliateText: "Try Canva Free",
      },
      {
        name: "Google Slides",
        price: "Free (with Google account)",
        freePlan: true,
        bestFor: "Teams using Google Workspace",
        features: ["Free with Google account", "Real-time collaboration", "Office compatibility", "Templates", "Offline editing"],
        affiliateUrl: "https://slides.google.com",
        rating: "★★★★☆",
        affiliateText: "Try Google Slides Free",
      },
      {
        name: "Slidebean",
        price: "Free / $19/mo",
        freePlan: true,
        bestFor: "Startups and founders pitching investors",
        features: ["AI-powered slides", "Pitch deck templates", "Currencies & branding", "Share online", "Analytics"],
        affiliateUrl: "https://slidebean.com",
        rating: "★★★★☆",
        affiliateText: "Try Slidebean Free",
      },
      {
        name: "Beautiful.ai",
        price: "$12/user/mo",
        freePlan: false,
        bestFor: "Teams wanting auto-formatting design",
        features: ["Smart templates", "Auto-design", "Team libraries", "Analytics", "Brand control"],
        affiliateUrl: "https://beautiful.ai",
        rating: "★★★★☆",
        affiliateText: "Try Beautiful.ai",
      },
      {
        name: "Zoho Show",
        price: "Free / $3/user/mo",
        freePlan: true,
        bestFor: "Users in Zoho ecosystem",
        features: ["Free tier available", "AI presentation assistant", "Real-time collab", "Template library", "Zoho integration"],
        affiliateUrl: "https://zoho.com/show",
        rating: "★★★★☆",
        affiliateText: "Try Zoho Show Free",
      },
    ],
    faq: [
      { q: "Is there a free PowerPoint alternative?", a: "Yes. Canva, Google Slides, and Zoho Show all offer free plans with robust presentation features." },
      { q: "What is better than PowerPoint for design?", a: "Canva offers more design templates and a more intuitive drag-and-drop interface. Beautiful.ai uses AI to auto-format your slides." },
      { q: "Can Google Slides replace PowerPoint?", a: "For most users, yes. Google Slides is free, supports real-time collaboration, and can open and export PowerPoint files." },
    ],
  },
  "photoshop-alternatives": {
    name: "Photoshop",
    desc: "Adobe's professional raster graphics editor for photo editing and digital art",
    searchVolume: "500K+ monthly searches",
    alternatives: [
      {
        name: "GIMP",
        price: "Free / Open source",
        freePlan: true,
        bestFor: "Budget-conscious users needing professional editing",
        features: ["Completely free", "Open source", "Layer support", "Advanced retouching", "Plugins & scripts"],
        affiliateUrl: "https://gimp.org",
        rating: "★★★★☆",
        affiliateText: "Download GIMP Free",
      },
      {
        name: "Photopea",
        price: "Free (online)",
        freePlan: true,
        bestFor: "Users wanting Photoshop without installing anything",
        features: ["Runs in browser", "PSD file support", "Layer-based editing", "No signup needed", "Mobile-friendly"],
        affiliateUrl: "https://photopea.com",
        rating: "★★★★☆",
        affiliateText: "Use Photopea Free",
      },
      {
        name: "Canva",
        price: "Free / $12.99/mo",
        freePlan: true,
        bestFor: "Non-designers and quick edits",
        features: ["Photo editor", "Templates", "AI background remover", "Brand kit", "Magic resize"],
        affiliateUrl: "https://canva.com",
        rating: "★★★★☆",
        affiliateText: "Try Canva Free",
      },
      {
        name: "Figma",
        price: "Free / $15/user/mo",
        freePlan: true,
        bestFor: "Designers wanting all-in-one design tool",
        features: ["Vector editing", "Prototyping", "Components", "Real-time collab", "Dev handoff"],
        affiliateUrl: "https://figma.com",
        rating: "★★★★★",
        affiliateText: "Try Figma Free",
      },
      {
        name: "Affinity Photo 2",
        price: "$69 (one-time)",
        freePlan: false,
        bestFor: "Professionals wanting one-time purchase",
        features: ["One-time purchase", "RAW editing", "HDR merge", "Focus stacking", "No subscription"],
        affiliateUrl: "https://affinity.serif.com/en-us/photo/",
        rating: "★★★★★",
        affiliateText: "Try Affinity Photo",
      },
    ],
    faq: [
      { q: "Is there a free alternative to Photoshop?", a: "Yes. GIMP is the most powerful free alternative with professional-grade editing tools. Photopea runs in your browser and supports PSD files." },
      { q: "What is the best Photoshop alternative for beginners?", a: "Canva is the easiest alternative — it has a simple photo editor with templates, AI tools, and no learning curve." },
      { q: "Can I cancel Photoshop and use something cheaper?", a: "Yes. GIMP is free and covers most photo editing needs. Affinity Photo 2 is a one-time $69 purchase without subscription. Canva is $12.99/mo for the Pro plan." },
    ],
  },
  "github-alternatives": {
    name: "GitHub",
    desc: "Cloud platform for version control and collaborative software development",
    searchVolume: "200K+ monthly searches",
    alternatives: [
      {
        name: "GitLab",
        price: "Free (Community) / $4/user/mo (Premium)",
        freePlan: true,
        bestFor: "Teams wanting integrated DevOps platform",
        features: ["Free self-hosted option", "CI/CD built-in", "Wikis", "Issue tracking", "Container registry"],
        affiliateUrl: "https://gitlab.com",
        rating: "★★★★★",
        affiliateText: "Try GitLab Free",
      },
      {
        name: "Bitbucket",
        price: "Free / $3/user/mo",
        freePlan: true,
        bestFor: "Teams using Atlassian ecosystem",
        features: ["Free up to 5 users", "Jira integration", "CI/CD pipelines", "Branching workflows", "Mercurial support"],
        affiliateUrl: "https://bitbucket.org",
        rating: "★★★★☆",
        affiliateText: "Try Bitbucket Free",
      },
      {
        name: "Gitea",
        price: "Free / Open source",
        freePlan: true,
        bestFor: "Self-hosted lightweight GitHub alternative",
        features: ["Open source", "Single binary deployment", "Low resource usage", "GitHub-like UI", "Actively maintained"],
        affiliateUrl: "https://gitea.com",
        rating: "★★★★☆",
        affiliateText: "Try Gitea",
      },
      {
        name: "Forgejo",
        price: "Free / Open source",
        freePlan: true,
        bestFor: "Community-focused self-hosted Git",
        features: ["Fork of Gitea", "Non-profit governed", "Lightweight", "CIVIL values", "GitHub compatible"],
        affiliateUrl: "https://forgejo.org",
        rating: "★★★★☆",
        affiliateText: "Try Forgejo",
      },
      {
        name: "SourceForge",
        price: "Free",
        freePlan: true,
        bestFor: "Open-source projects wanting hosting + discovery",
        features: ["Free hosting", "Project pages", "Download stats", "Social features", "Git & Mercurial"],
        affiliateUrl: "https://sourceforge.net",
        rating: "★★★★☆",
        affiliateText: "Explore SourceForge",
      },
    ],
    faq: [
      { q: "Is there a free GitHub alternative?", a: "Yes. GitLab and Bitbucket both offer generous free plans. Gitea and Forgejo are free and open-source for self-hosting." },
      { q: "What is the best GitHub alternative for open-source projects?", a: "GitLab is the most popular alternative — it has a strong open-source community and a great free tier with CI/CD built in." },
      { q: "Can I self-host a GitHub alternative?", a: "Yes. GitLab, Gitea, and Forgejo all offer self-hosted options. Gitea is the lightest, while GitLab is the most feature-complete." },
    ],
  },
  "teams-alternatives": {
    name: "Microsoft Teams",
    desc: "Unified communication platform combining chat, video meetings, and file collaboration",
    searchVolume: "250K+ monthly searches",
    alternatives: [
      {
        name: "Slack",
        price: "Free / $7.25/user/mo",
        freePlan: true,
        bestFor: "Teams wanting fast, organized communication",
        features: ["Channels & DMs", "Huddles", "Slack Connect", "Workflow Builder", "Integrations"],
        affiliateUrl: "https://slack.com",
        rating: "★★★★☆",
        affiliateText: "Try Slack Free",
      },
      {
        name: "Discord",
        price: "Free / Nitro $9.99/mo",
        freePlan: true,
        bestFor: "Casual teams, communities & creative studios",
        features: ["Voice & video channels", "Threads", "Screen sharing", "Bots & apps", "Large file sharing"],
        affiliateUrl: "https://discord.com",
        rating: "★★★★☆",
        affiliateText: "Try Discord Free",
      },
      {
        name: "Google Meet",
        price: "Free / $10/user/mo",
        freePlan: true,
        bestFor: "Teams using Google Workspace",
        features: ["HD video calls", "Live captions", "Recording", "Calendar integration", "Screen sharing"],
        affiliateUrl: "https://meet.google.com",
        rating: "★★★★☆",
        affiliateText: "Try Google Meet Free",
      },
      {
        name: "Zoom",
        price: "Free / $13.33/user/mo",
        freePlan: true,
        bestFor: "Professional meetings and webinars",
        features: ["HD video", "Breakout rooms", "Webinars", "Recording", "Virtual backgrounds"],
        affiliateUrl: "https://zoom.us",
        rating: "★★★★☆",
        affiliateText: "Try Zoom Free",
      },
      {
        name: "Ringover",
        price: "Free / $15/user/mo",
        freePlan: true,
        bestFor: "Sales teams needing business calling + video",
        features: ["Video meetings", "Business phone", "Call routing", "CRM integrations", "Call logging"],
        affiliateUrl: "https://ringover.com",
        rating: "★★★★☆",
        affiliateText: "Try Ringover Free",
      },
    ],
    faq: [
      { q: "Is there a free Microsoft Teams alternative?", a: "Yes. Slack, Google Meet, Discord, and Zoom all offer free plans with video conferencing and chat." },
      { q: "What is better than Teams for small business?", a: "Slack offers a cleaner interface and better organization with channels. Google Meet integrates seamlessly with Google Workspace at a lower price." },
      { q: "Can I use Teams without Microsoft 365?", a: "Yes. Teams has a free version with most core features. However, paid Microsoft 365 Business Basic ($6/user/mo) is needed for full functionality." },
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
    { tool: ["trello-alternatives"] },
    { tool: ["evernote-alternatives"] },
    { tool: ["confluence-alternatives"] },
    { tool: ["jira-alternatives"] },
    { tool: ["zoom-alternatives"] },
    { tool: ["dropbox-alternatives"] },
    { tool: ["powerpoint-alternatives"] },
    { tool: ["photoshop-alternatives"] },
    { tool: ["github-alternatives"] },
    { tool: ["teams-alternatives"] },
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
