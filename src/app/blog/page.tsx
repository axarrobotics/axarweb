'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { getBlogPosts, getAllTags } from '@/lib/blog';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [blogPosts, allTags] = await Promise.all([
          getBlogPosts(),
          getAllTags()
        ]);
        setPosts(blogPosts);
        setTags(allTags);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading blog posts...</div>
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
            <Link href="/blog" className="text-white font-semibold">Blog</Link>
            <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          </div>
        </nav>
      </header>

      {/* Blog Header */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Axar Robotics
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {" "}Blog
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Insights, updates, and stories from the future of pet technology and AI robotics.
          </p>
        </div>

        {/* Tag Filter */}
        {tags.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === '' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                All Posts
              </button>
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-white mb-4">No Blog Posts Yet</h2>
            <p className="text-gray-300">
              We&apos;re working on exciting content about AI robotics and pet technology. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <article key={post.id} className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-300">
                {post.featuredImage && (
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Image 
                      src={post.featuredImage} 
                      alt={post.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-blue-400 text-sm font-medium">{post.author}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400 text-sm">
                      {post.publishedAt.toLocaleDateString()}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400 text-sm">{post.readTime} min read</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Read More 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
