import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Calendar, User, Clock } from "lucide-react";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  // Mock post find
  const post = {
    title: params.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    author: "Grand Editorial Board",
    date: "May 15, 2026",
    readTime: "6 min read",
    image: "/images/about_legacy.jpg",
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-12 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-amber-500 mb-8 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to blog
        </Link>

        {/* Post Title */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-6">
            <span className="flex items-center"><User className="h-4 w-4 mr-1 text-amber-500" /> By {post.author}</span>
            <span className="flex items-center"><Calendar className="h-4 w-4 mr-1 text-amber-500" /> {post.date}</span>
            <span className="flex items-center"><Clock className="h-4 w-4 mr-1 text-amber-500" /> {post.readTime}</span>
          </div>
        </div>

        {/* Article content mockup */}
        <article className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-slate-100">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>

          <p className="font-semibold text-lg text-slate-800 dark:text-slate-150">
            Welcome to the luxury lifestyle pages. Today we delve into topics that matter to our premium travelers.
          </p>

          <p>
            Whether it&apos;s finding the quietest coastal beaches, or enjoying premium wellness and massage therapy under an open sky, luxury is a deeply personal state of mind. At Grand Hotel, our sole focus is to curate these experiences so that you can simply arrive and immerse yourself completely.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">Bespoke Concierge Curation</h3>
          <p>
            A high-end stay goes far beyond pristine sheets and designer furniture. It encompasses the memories made through culinary excellence, high-end private cruises, and localized secrets that standard brochures never detail.
          </p>

          <blockquote className="border-l-4 border-amber-500 pl-4 py-2 italic text-slate-500 bg-slate-50 dark:bg-slate-950 rounded-r-lg">
            &ldquo;We do not merely sell room bookings; we provide access to custom premium relaxation and peace.&rdquo;
          </blockquote>

          <p>
            In the coming weeks, we will expand this magazine to feature recipe notes from our Michelin chefs, exclusive interviews with wellness somatic therapists, and guidebooks to local historical treasures.
          </p>
        </article>

      </div>
    </div>
  );
}
