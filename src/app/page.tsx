'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
      } else {
        console.error('Subscription failed:', data.error);
        // You could add error state handling here
      }
    } catch (error) {
      console.error('Network error:', error);
      // You could add error state handling here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            Axar<span className="text-blue-400">Robotics</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            The Future of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {" "}Pet Technology
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Revolutionary multimodal AI robot designed from the ground up to entertain and train your dogs. 
            Experience intelligent companionship that adapts to your pet&apos;s unique personality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Learn More
            </button>
            <button className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Intelligent Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Interaction</h3>
              <p className="text-gray-300">Advanced multimodal AI that understands and responds to your dog&apos;s behavior patterns.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="text-4xl mb-4">🎾</div>
              <h3 className="text-xl font-semibold text-white mb-4">Interactive Training</h3>
              <p className="text-gray-300">Personalized training programs that adapt to your dog&apos;s learning style and progress.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-white mb-4">Smart Monitoring</h3>
              <p className="text-gray-300">Real-time health and activity monitoring with insights delivered to your mobile device.</p>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-6">
              Be the first to know when Axar Robotics launches. Get exclusive updates and early access.
            </p>
            {!isSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:border-blue-400"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="text-green-400 font-semibold">
                ✓ Thank you for subscribing! We&apos;ll keep you updated.
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold text-white mb-4">
                Axar<span className="text-blue-400">Robotics</span>
              </div>
              <p className="text-gray-300 mb-4">
                Revolutionizing pet care through advanced AI robotics. 
                Designed to entertain, train, and care for your beloved dogs.
              </p>
              <div className="flex space-x-4">
                <a href="https://twitter.com/axarrobotics" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://facebook.com/axarrobotics" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/axarrobotics" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.205-1.533l1.714-1.714c.39.586 1.07.977 1.849.977 1.225 0 2.217-.992 2.217-2.217 0-.779-.391-1.459-.977-1.849l1.714-1.714c.937.757 1.533 1.908 1.533 3.205 0 2.27-1.84 4.11-4.11 4.11l-.735-.165zm7.424-2.956c-.757.937-1.908 1.533-3.205 1.533-2.27 0-4.11-1.84-4.11-4.11 0-1.297.596-2.448 1.533-3.205l1.714 1.714c-.586.39-.977 1.07-.977 1.849 0 1.225.992 2.217 2.217 2.217.779 0 1.459-.391 1.849-.977l1.714 1.714-.735.165z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/axarrobotics" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#press" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="mailto:contact@axarrobotics.com" className="hover:text-white transition-colors">
                    contact@axarrobotics.com
                  </a>
                </li>
                <li><a href="#support" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Axar Robotics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
