import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { BlogPost, BlogPostInput } from '@/types/blog';

const COLLECTION_NAME = 'blog-posts';

// Generate SEO-friendly slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Calculate reading time based on content
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Create a new blog post
export async function createBlogPost(postData: BlogPostInput): Promise<string> {
  const slug = generateSlug(postData.title);
  const readTime = calculateReadTime(postData.content);
  
  const blogPost: Omit<BlogPost, 'id'> = {
    ...postData,
    slug,
    readTime,
    publishedAt: new Date(),
    updatedAt: new Date(),
    isPublished: postData.isPublished ?? false,
  };

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...blogPost,
    publishedAt: Timestamp.fromDate(blogPost.publishedAt),
    updatedAt: Timestamp.fromDate(blogPost.updatedAt),
  });

  return docRef.id;
}

// Get all published blog posts
export async function getBlogPosts(limitCount?: number): Promise<BlogPost[]> {
  let q = query(
    collection(db, COLLECTION_NAME),
    where('isPublished', '==', true),
    orderBy('publishedAt', 'desc')
  );

  if (limitCount) {
    q = query(q, limit(limitCount));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    publishedAt: doc.data().publishedAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  } as BlogPost));
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('slug', '==', slug),
    where('isPublished', '==', true)
  );

  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
    publishedAt: doc.data().publishedAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  } as BlogPost;
}

// Get blog posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('tags', 'array-contains', tag),
    where('isPublished', '==', true),
    orderBy('publishedAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    publishedAt: doc.data().publishedAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  } as BlogPost));
}

// Update a blog post
export async function updateBlogPost(id: string, updates: Partial<BlogPostInput>): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  
  const updateData: Record<string, any> = {
    ...updates,
    updatedAt: Timestamp.fromDate(new Date()),
  };

  // Regenerate slug if title is updated
  if (updates.title) {
    updateData.slug = generateSlug(updates.title);
  }

  // Recalculate read time if content is updated
  if (updates.content) {
    updateData.readTime = calculateReadTime(updates.content);
  }

  await updateDoc(docRef, updateData);
}

// Delete a blog post
export async function deleteBlogPost(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const querySnapshot = await getDocs(
    query(collection(db, COLLECTION_NAME), where('isPublished', '==', true))
  );
  
  const allTags = new Set<string>();
  querySnapshot.docs.forEach(doc => {
    const tags = doc.data().tags || [];
    tags.forEach((tag: string) => allTags.add(tag));
  });

  return Array.from(allTags).sort();
}
