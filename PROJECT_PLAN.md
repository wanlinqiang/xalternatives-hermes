# X Alternatives 网站项目计划

> "X Alternatives" — 英文工具替代品导航站
> 目标：SEO 流量 + Affiliate 佣金 + AdSense

---

## 项目信息

| 项目 | 内容 |
|------|------|
| 项目名称 | X Alternatives（待定域名） |
| 定位 | 英文 "X Alternatives" 工具替代品合集导航站 |
| 目标市场 | 全球英文用户 |
| 变现模式 | Affiliate CPS 佣金 + Google AdSense |
| 当前状态 | 筹备阶段 |
| 负责人 | Lucas |
| 开始日期 | 2025-05-22 |

---

## 运营目标（OKR）

| 周期 | 目标 |
|------|------|
| 第1个月 | 完成网站搭建 + 上线10个页面 |
| 第3个月 | 月UV达到500 |
| 第6个月 | 月UV达到3000， Affiliate开始出单 |
| 第12个月 | 月UV达到10000，月收入$200+ |

---

## 第一阶段：域名与品牌

### 1.1 域名选择

**策略**：用 `[工具名]alternatives.org` 或 `[工具名]alternatives.com`
或做一个品牌站：`ToolWiki.com` / `AltStack.com`

**候选域名列表**：

| 域名 | 备注 | 价格参考 |
|------|------|----------|
| bestalt.org | ✅ 可注册，最便宜 | ~$10/年 |
| notionalt.com | ✅ 可注册，品牌向 | ~$12/年 |
| zapieralt.com | ✅ 可注册，利基向 | ~$12/年 |
| toolalternatives.com | ❌ 已注册 | - |
| bestalternatives.org | ❌ 已注册 | - |
| altwiki.com | ❌ 已注册 | - |
| toolscope.com | ❌ 已注册 | - |
| altfinder.com | ❌ 已注册 | - |

**操作**：
- [x] 用 Python 脚本批量检测上述域名可用性 ✅ 2025-05-22
- [ ] 选定一个域名并注册（建议 Namesilo / Cloudflare Registrar）
- [ ] 配置 WHOIS 隐私保护

### 1.2 品牌命名

**品牌名候选**：
- **AltWiki** — alternatives + wiki 混合，最实用
- **ToolScope** — 工具望远镜，定位清晰
- **AltFinder** — 替代品发现器
- **BestAlt** — 最简单直接

**操作**：
- [ ] 确定品牌名
- [ ] 设计 Logo（可用 Canva 或在线 Logo 生成器）
- [ ] 确定品牌色系（蓝/绿/紫科技感配色）

---

## 第二阶段：技术架构

### 2.1 技术选型

| 技术 | 选择 | 理由 |
|------|------|------|
| 框架 | Next.js 16 (App Router) | 静态导出 + SEO 友好 |
| 样式 | Tailwind CSS | 快速开发 |
| 内容 | MDX | 便于管理文章/页面内容 |
| 部署 | Vercel / Cloudflare Pages | 免费 + 全球 CDN |
| 域名托管 | Cloudflare Registrar | 便宜 + 隐私保护 |

### 2.2 站点结构

```
/
├── / (Home — 热门工具替代品列表 + SEO首页)
├── /category/
│   └── [category] (如 /productivity-alternatives)
├── /[tool]-alternatives/ (如 /notion-alternatives)
│   ├── /notion-alternatives (替代品列表页)
│   └── /notion-alternatives/[subpage] (单个替代品详情)
├── /about
├── /privacy-policy
└── /contact
```

### 2.3 SEO 技术配置

- [ ] 配置 `next.config.mjs` 静态导出 (`output: 'export'`)
- [ ] 设置 `sitemap.xml` 自动生成
- [ ] 设置 `robots.txt`
- [ ] 配置 Canonical URL
- [ ] Open Graph + Twitter Card 元标签
- [ ] 结构化数据 (JSON-LD) — Organization + WebSite + Article

### 2.4 性能优化

- [ ] 图片使用 Next/Image + Cloudflare 优化
- [ ] 字体使用 Google Fonts（预连接）
- [ ] 启用 Gzip/Brotli 压缩（Vercel/Cloudflare 自动处理）

---

## 第三阶段：内容规划

### 3.1 目标工具选择（首批10个）

选高搜索量 + 有 affiliate 项目的热门工具：

| 工具名 | 月搜索量(Google) | Affiliate 情况 |
|--------|-----------------|---------------|
| Notion | 500K+ | 有（Affiliates.com/Impact） |
| Zapier | 100K+ | 有（官方Affiliate计划） |
| Canva | 500K+ | 有（官方Partner） |
| ChatGPT | 1000K+ | OpenAI 无官方affiliate |
| Slack | 200K+ | 有（官方） |
| Asana | 100K+ | 有（官方） |
| Monday.com | 150K+ | 有（官方） |
| Airtable | 100K+ | 有（官方） |
| Figma | 200K+ | 有（官方） |
| Jira | 300K+ | 有（Atlassian Affiliate） |

### 3.2 页面模板

每个工具替代品页面结构：

```
# [Tool] Alternatives — Top [N] Best [Tool] Alternatives in 2025

## What is [Tool]?
[2-3段介绍，SEO关键词植入]

## Why Look for [Tool] Alternatives?
[痛点描述，1-2段]

## Top [N] Best [Tool] Alternatives

### 1. [替代品名称]
- **Price**: $X/month (Free plan available)
- **Best for**: [人群定位]
- **Key features**: [3-5个核心功能]
- **Affiliate link**: [推广链接]
- Rating: ★★★★☆

### 2. [替代品名称]
... (同上结构)

## How to Choose the Right [Tool] Alternative
[决策指南，1-2段]

## FAQ
### Is there a free [Tool] alternative?
### What is the cheapest [Tool] alternative?
### Can I import my [Tool] data to alternatives?

## Conclusion
[总结 + CTA]
```

### 3.3 内容生产计划

| 周次 | 完成页面数 | 具体页面 |
|------|-----------|---------|
| 第1周 | 3页 | Notion Alternatives, Canva Alternatives, Zapier Alternatives |
| 第2周 | 3页 | Slack Alternatives, Asana Alternatives, Monday Alternatives |
| 第3周 | 2页 | Airtable Alternatives, Figma Alternatives |
| 第4周 | 2页 | Jira Alternatives, ChatGPT Alternatives |

---

## 第四阶段：SEO 优化

### 4.1 On-Page SEO

**每个页面必须包含**：
- [ ] Title: `[Tool] Alternatives — Top [N] Best [Tool] Alternatives (2025)`
- [ ] Meta Description: 155字符以内，包含关键词
- [ ] H1: 必须是页面主标题
- [ ] H2/H3: 合理的标题层级
- [ ] 图片 Alt 标签（所有图片）
- [ ] 内链：页面之间互相链接
- [ ] 外链：引用权威来源（Wikipedia、官方链接）

### 4.2 Technical SEO

- [ ] 提交 sitemap.xml 到 Google Search Console
- [ ] 设置 Google Analytics 4
- [ ] 配置 Bing Webmaster Tools
- [ ] 安装 Google Tag Manager（可选）
- [ ] 设置面包屑导航（Breadcrumb）
- [ ] 配置 HTTPS（Vercel/Cloudflare 自动）

### 4.3 Off-Page SEO

- [ ] 提交到 DMOZ 类型目录
- [ ] 在 Reddit 相关社区（r/SideProject、r/startups）分享
- [ ] 在 X/Twitter 搜索相关话题互动
- [ ] 建立 GitHub 仓库并链接回主站

### 4.4 内容 SEO 策略

**关键词策略**：
- 主关键词：`[tool] alternatives`
- 长尾词：`best [tool] alternatives 2025`, `free [tool] alternative`, `[tool] vs [alt]` comparison
- 问题词：`how to replace [tool]`, `what is better than [tool]`

**内容更新频率**：
- 第1个月：每周2-3篇新页面
- 第2个月起：每月更新一次旧页面（添加新替代品、更新价格）

---

## 第五阶段：变现

### 5.1 Affiliate 佣金（主要收入）

**优先申请的 Affiliate 平台**：

| 工具 | Affiliate 平台 | 佣金方式 | 预估佣金率 |
|------|--------------|---------|-----------|
| Notion | Impact | CPA | $5-15/注册 |
| Canva | Awin/ShareASale | 30% 复购 | 30天Cookie |
| Zapier | 官方 | 25% 复购 | 30天Cookie |
| Asana | 官方 | 15% 复购 | 90天Cookie |
| Monday.com | 官方 | 25% 复购 | 180天Cookie |
| Airtable | 官方 | 15% 复购 | 30天Cookie |
| Figma | 官方 | 按年付费3% | 90天Cookie |
| Atlassian (Jira) | 官方 | $25-100/企业注册 | 60天Cookie |

**操作**：
- [ ] 注册 ShareASale 账号（聚合多品牌）
- [ ] 注册 Awin 账号
- [ ] 直接申请 Notion/Zapier/Monday.com 官方 Affiliate
- [ ] 在页面嵌入 Affiliate 链接（用 `rel="sponsored"` 标注）

### 5.2 Google AdSense（次要收入）

- [ ] 申请 AdSense 账号（网站需有一定内容）
- [ ] 在侧边栏和文末插入广告单元
- [ ] 配置广告展示顺序（Affiliate > AdSense）
- [ ] 使用 Google AdSense auto ads 或手动放置

**广告布局建议**：
- 页面顶部：Banner广告
- 文章中间：In-article ad
- 侧边栏：Display ad（桌面端）
- 文章结尾：In-article ad

### 5.3 变现优先级

| 阶段 | 重点 |
|------|------|
| 0-3个月 | 积累内容 + 申请 Affiliate |
| 3-6个月 | Affiliate 出单 + AdSense 通过 |
| 6-12个月 | 多 Affiliate 叠加 + AdSense 稳定 |
| 12个月+ | 谈判直接广告合作 |

---

## 第六阶段：数据分析与迭代

### 6.1 监控指标

| 指标 | 工具 | 查看频率 |
|------|------|---------|
| UV/UV来源 | Google Analytics 4 | 每天 |
| 关键词排名 | Google Search Console | 每周 |
| 页面排名 | GA4 + GSC | 每周 |
| Affiliate 转化 | 各平台后台 | 每天 |
| AdSense 收入 | AdSense 后台 | 每天 |
| 核心性能 | PageSpeed Insights | 每月 |

### 6.2 迭代优化

- [ ] 每月分析 top 10 流量页面，强化这些页面的 Affiliate 链接
- [ ] 每季度分析低排名页面，重写或合并
- [ ] 测试不同 Affiliate 链接位置（开头 vs 中间 vs 结尾）
- [ ] A/B 测试 CTA 按钮文案

---

## 当前进度总览

### 阶段 1：域名与品牌
- [ ] 域名可用性检测
- [ ] 注册域名
- [ ] 确定品牌名
- [ ] Logo 设计

### 阶段 2：技术架构
- [ ] 初始化 Next.js 项目
- [ ] 配置静态导出
- [ ] 配置 SEO 元标签
- [ ] 部署到 Vercel
- [ ] 验证站点可访问

### 阶段 3：内容规划
- [ ] 选定10个目标工具
- [ ] 编写页面模板
- [ ] 完成10个页面内容

### 阶段 4：SEO 优化
- [ ] 配置 sitemap/robots
- [ ] 提交 Google Search Console
- [ ] 安装 Google Analytics 4

### 阶段 5：变现
- [ ] 申请 Affiliate 账号
- [ ] 申请 Google AdSense
- [ ] 嵌入 Affiliate 链接
- [ ] 插入 AdSense 代码

### 阶段 6：数据分析
- [ ] 设置监控仪表盘
- [ ] 制定迭代计划

---

## 文件结构

```
/root/xalternatives/
├── PROJECT_PLAN.md        ← 本文件
├── README.md              ← 项目说明
├── TODO.md                ← 每日待办
└── notes/                 ← 笔记
    ├── affiliate_programs.md
    ├── seo_keywords.md
    └── content_templates.md
```

---

**最后更新**：2025-05-22
**下次更新**：完成域名选择后
