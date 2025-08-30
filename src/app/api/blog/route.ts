import { NextRequest, NextResponse } from 'next/server';
import { createBlogPost, getBlogPosts } from '@/lib/blog';
import { BlogPostInput } from '@/types/blog';

// GET - Fetch all blog posts
export async function GET() {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const postData: BlogPostInput = await request.json();
    
    // Basic validation
    if (!postData.title || !postData.content || !postData.author) {
      return NextResponse.json(
        { error: 'Title, content, and author are required' },
        { status: 400 }
      );
    }

    const postId = await createBlogPost(postData);
    
    return NextResponse.json(
      { message: 'Blog post created successfully', id: postId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
