async function generateFirstDogBlog() {
  try {
    console.log('🤖 Generating blog post using Gemini AI...');
    
    const response = await fetch('http://localhost:3002/api/generate-blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: 'A comprehensive guide for families considering getting their first dog',
        targetAudience: 'families with children who are thinking about adopting their first dog',
        author: 'Axar Robotics Team',
        tone: 'warm, helpful, and encouraging'
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Blog post generated successfully!');
      console.log(`📝 Title: ${data.blogData.title}`);
      console.log(`🔗 Post ID: ${data.postId}`);
      console.log(`📊 Tags: ${data.blogData.tags.join(', ')}`);
      console.log(`📄 Excerpt: ${data.blogData.excerpt}`);
      console.log('\n🌐 View your blog post at: http://localhost:3002/blog');
      
      // Generate slug for direct link
      const slug = data.blogData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      console.log(`🔗 Direct link: http://localhost:3002/blog/${slug}`);
    } else {
      console.error('❌ Error generating blog post:', data.error);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

generateFirstDogBlog();
