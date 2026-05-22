"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error || "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
        form.reset();
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-white mb-4">Contact Us</h1>
      <p className="text-gray-400 mb-8">
        Have a suggestion for a tool we should cover? Want to partner with us?
        Fill out the form below and we&apos;ll get back to you within 48 hours.
      </p>

      {status === "success" ? (
        <div className="bg-green-900/20 border border-green-600/30 rounded-xl p-6 text-center">
          <p className="text-green-400 font-semibold text-lg mb-2">Message sent!</p>
          <p className="text-gray-400 text-sm">We&apos;ll get back to you within 48 hours.</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 text-blue-400 hover:text-blue-300 text-sm underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {status === "error" && errorMsg && (
            <div className="bg-red-900/20 border border-red-600/30 rounded-lg px-4 py-3 text-red-400 text-sm">
              {errorMsg}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input
              name="name"
              type="text"
              required
              minLength={2}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              minLength={10}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="How can we help?"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors w-full"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
