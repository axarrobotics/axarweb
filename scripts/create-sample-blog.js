/**
 * Sample blog post creation script for Axar Robotics
 * Usage: node scripts/create-sample-blog.js
 */

async function createSampleBlogPost() {
  try {
    const samplePost = {
      title: "The Future of AI-Powered Pet Robotics: How Axar is Revolutionizing Dog Training",
      content: `Artificial Intelligence has transformed countless industries, and now it's time for pet care to experience the same revolution. At Axar Robotics, we're pioneering the next generation of multimodal AI robots specifically designed to understand, entertain, and train our four-legged companions.

## Understanding Multimodal AI

Our robots don't just see or hear – they perceive the world through multiple sensory channels simultaneously. This includes:

- **Computer Vision**: Advanced image recognition to understand dog body language and facial expressions
- **Audio Processing**: Real-time analysis of barks, whines, and other vocalizations
- **Motion Detection**: Tracking movement patterns to assess energy levels and behavior
- **Environmental Awareness**: Understanding the context of interactions

## Personalized Training Programs

Every dog is unique, and our AI recognizes this fundamental truth. The system learns each dog's:

- Learning pace and preferences
- Behavioral triggers and motivations  
- Physical capabilities and limitations
- Social interaction patterns

## The Science Behind the Technology

Our research team has spent years studying canine psychology and behavior. We've partnered with veterinarians, animal behaviorists, and dog trainers to ensure our AI truly understands what makes dogs tick.

The result? A robot companion that can adapt its training methods in real-time, providing personalized experiences that grow with your pet.

## Looking Forward

This is just the beginning. As we continue to refine our technology, we're exploring new ways to enhance the human-pet bond through intelligent robotics. Stay tuned for more updates on our journey to revolutionize pet care.`,
      excerpt: "Discover how Axar Robotics is using cutting-edge multimodal AI to create the world's first truly intelligent pet training robot. Learn about the science behind our technology and what makes our approach revolutionary.",
      author: "Dr. Sarah Chen",
      tags: ["AI", "Robotics", "Pet Technology", "Machine Learning", "Innovation"],
      isPublished: true,
      seoTitle: "AI Pet Robotics: The Future of Dog Training | Axar Robotics",
      seoDescription: "Learn how Axar Robotics' multimodal AI technology is revolutionizing pet training with intelligent robots that understand and adapt to your dog's unique personality."
    };

    const response = await fetch('http://localhost:3001/api/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(samplePost),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Sample blog post created successfully!');
      console.log(`📝 Post ID: ${result.id}`);
      console.log('🌐 You can view it at: http://localhost:3001/blog');
    } else {
      console.error('❌ Error:', result.error);
    }

  } catch (error) {
    console.error('❌ Failed to create sample blog post:', error.message);
  }
}

// Run the script
createSampleBlogPost();
