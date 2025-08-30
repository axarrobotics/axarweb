import { NextRequest, NextResponse } from 'next/server';
import { generateBlogPost } from '@/lib/gemini';
import { createBlogPost } from '@/lib/blog';

export async function POST(request: NextRequest) {
  try {
    const { topic, targetAudience, author, tone } = await request.json();

    if (!topic || !targetAudience || !author) {
      return NextResponse.json(
        { error: 'Topic, target audience, and author are required' },
        { status: 400 }
      );
    }

    // Generate blog content using Gemini
    const blogData = await generateBlogPost(topic, targetAudience, tone);

    // Create the blog post in Firebase
    const postId = await createBlogPost({
      title: blogData.title,
      content: blogData.content,
      excerpt: blogData.excerpt,
      author: author,
      tags: blogData.tags,
      isPublished: true,
      seoTitle: blogData.seoTitle,
      seoDescription: blogData.seoDescription,
    });

    return NextResponse.json({
      message: 'Blog post generated and created successfully',
      postId,
      blogData
    });

  } catch (error) {
    console.error('Error generating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog post' },
      { status: 500 }
    );
  }
}
