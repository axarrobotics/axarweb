'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { getBlogPostBySlug } from '@/lib/blog';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const blogPost = await getBlogPostBySlug(slug);
        if (blogPost) {
          setPost(blogPost);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading blog post...</div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <header className="container mx-auto px-6 py-8">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              Axar<span className="text-blue-400">Robotics</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
            </div>
          </nav>
        </header>
        
        <div className="container mx-auto px-6 py-16 text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
          <p className="text-gray-300 mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link 
            href="/blog"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            Axar<span className="text-blue-400">Robotics</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
            <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          </div>
        </nav>
      </header>

      {/* Blog Post Content */}
      <article className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-gray-400">›</span>
            <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
              Blog
            </Link>
            <span className="text-gray-400">›</span>
            <span className="text-white">{post.title}</span>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="aspect-video mb-8 rounded-xl overflow-hidden">
              <Image 
                src={post.featuredImage} 
                alt={post.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Post Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {post.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-white font-medium">{post.author}</div>
                  <div className="text-gray-400 text-sm">Author</div>
                </div>
              </div>
              
              <div className="text-gray-400">
                <div className="text-sm">Published</div>
                <div className="font-medium">{post.publishedAt.toLocaleDateString()}</div>
              </div>
              
              <div className="text-gray-400">
                <div className="text-sm">Read Time</div>
                <div className="font-medium">{post.readTime} min</div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Excerpt */}
            <div className="text-xl text-gray-300 leading-relaxed mb-8 p-6 bg-white/5 rounded-xl border-l-4 border-blue-400">
              {post.excerpt}
            </div>
          </header>

          {/* Post Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div 
              className="text-gray-300 leading-relaxed"
              style={{ whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
            />
          </div>

          {/* Post Footer */}
          <footer className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Share this post</h3>
                <div className="flex gap-3">
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <Link 
                href="/blog"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                ← Back to Blog
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
}
