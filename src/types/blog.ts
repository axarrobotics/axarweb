export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  tags: string[];
  featuredImage?: string;
  isPublished: boolean;
  readTime: number; // in minutes
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogPostInput {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  featuredImage?: string;
  isPublished?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}
