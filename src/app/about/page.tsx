export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-white mb-6">About BestAlt.org</h1>
      <div className="prose prose-invert prose-lg max-w-none space-y-4 text-gray-400">
        <p>
          <strong className="text-white">BestAlt.org</strong> helps you find the best
          alternatives to popular productivity, design, and automation tools.
        </p>
        <p>
          Every comparison is researched thoroughly: we look at pricing, features, pros & cons,
          and real user reviews — so you can make informed decisions without spending hours
          searching.
        </p>
        <h2 className="text-xl font-bold text-white mt-8 mb-3">Our Mission</h2>
        <p>
          We believe you shouldn&apos;t be locked into a single tool just because it&apos;s popular.
          There are often better, cheaper, or simpler alternatives — and our job is to find them
          for you.
        </p>
        <h2 className="text-xl font-bold text-white mt-8 mb-3">How We Make Money</h2>
        <p>
          Some links on this site are affiliate links. If you sign up through them, we may earn
          a small commission at no extra cost to you. This doesn&apos;t affect our reviews — we
          only recommend tools we genuinely believe in.
        </p>
        <h2 className="text-xl font-bold text-white mt-8 mb-3">Contact</h2>
        <p>
          Have feedback or want a specific tool covered?{" "}
          <a href="/contact" className="text-blue-400 hover:underline">Get in touch</a>.
        </p>
      </div>
    </div>
  );
}
