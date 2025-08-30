export async function generateBlogContent(prompt: string): Promise<string> {
  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.X_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        model: 'grok-beta',
        stream: false,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`XAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating content with XAI:', error);
    throw new Error('Failed to generate content');
  }
}

export async function generateBlogPost(topic: string, targetAudience: string, tone: string = 'friendly and informative'): Promise<{
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
}> {
  const prompt = `
Write a comprehensive blog post for Axar Robotics, a company that creates multimodal AI robots for dogs. The blog should be about: "${topic}" targeting "${targetAudience}".

The tone should be ${tone}, and the content should be engaging, informative, and helpful. Include practical tips and advice.

Please structure your response as a JSON object with the following format:
{
  "title": "An engaging title for the blog post",
  "content": "The full blog content in markdown format with proper headings, lists, and formatting. Should be 800-1200 words.",
  "excerpt": "A compelling 2-3 sentence summary of the blog post",
  "tags": ["array", "of", "relevant", "tags"],
  "seoTitle": "SEO-optimized title (60 characters or less)",
  "seoDescription": "SEO meta description (150-160 characters)"
}

Make sure the content is well-structured with:
- An engaging introduction
- Clear headings and subheadings
- Practical tips and actionable advice
- A conclusion that ties back to Axar Robotics' mission
- Natural mentions of how AI technology can help with dog training and care

The content should be informative and valuable even for people who don't yet own an Axar robot, but subtly highlight how AI technology is revolutionizing pet care.

IMPORTANT: Return ONLY the JSON object, no other text before or after.
`;

  try {
    const response = await generateBlogContent(prompt);
    
    // Clean up the response to extract JSON
    let cleanedResponse = response.trim();
    
    // Remove any markdown code block formatting
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    // Try to find JSON in the response
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from XAI');
    }
    
    const blogData = JSON.parse(jsonMatch[0]);
    return blogData;
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw new Error('Failed to generate blog post');
  }
}
