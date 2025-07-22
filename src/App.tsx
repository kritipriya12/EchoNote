import React from 'react';
import { Calendar, Mail, Heart, Shield, Bell, Edit3, Tag, Archive, ChevronRight, Star, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showDashboard, setShowDashboard] = React.useState(false);

  if (showDashboard) {
    return <Dashboard onClose={() => setShowDashboard(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 rounded-b-2xl">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Mail className="text-white" size={18} />
              </div>
              <span className="text-lg font-bold text-gray-800">EchoNote</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">Home</a>
              <a href="#how-it-works" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">How It Works</a>
              <a href="#features" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">Features</a>
              <a href="#testimonials" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">Reviews</a>
              <button className="bg-purple-600 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} className="text-gray-600" /> : <Menu size={24} className="text-gray-600" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium py-2">Home</a>
                <a href="#how-it-works" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium py-2">How It Works</a>
                <a href="#features" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium py-2">Features</a>
                <a href="#testimonials" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium py-2">Reviews</a>
                <button className="bg-purple-600 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-4">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden pt-16">
        <div className="container mx-auto px-6 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Dear Future
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Me</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              Write today. Receive tomorrow.
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Connect with your future self through heartfelt letters. Set a date, share your dreams, 
              and rediscover your thoughts when the time is right.
            </p>
            <button 
             onClick={() => setShowDashboard(true)}
              className="bg-purple-600 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
              Start Writing
              <Edit3 size={20} />
            </button>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 opacity-20 animate-float">
            <Mail size={40} className="text-purple-300" />
          </div>
          <div className="absolute top-40 right-20 opacity-30 animate-float-delayed">
            <Heart size={32} className="text-pink-300" />
          </div>
          <div className="absolute bottom-20 left-20 opacity-25 animate-float">
            <Calendar size={36} className="text-blue-300" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to connect with your future self
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Edit3 size={40} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Create a Letter</h3>
              <p className="text-gray-600 leading-relaxed">
                Pick a future date using our beautiful calendar, write your thoughts, dreams, or goals, 
                and save your letter securely in our system.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Bell size={40} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get Notified</h3>
              <p className="text-gray-600 leading-relaxed">
                On your selected date, receive a gentle notification via email or push. 
                It's time to reconnect with your past thoughts and dreams.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Archive size={40} className="text-pink-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">View & Reflect</h3>
              <p className="text-gray-600 leading-relaxed">
                Access your letters in "My Letters" dashboard, tag them with emotions like Hope or Love, 
                and revisit your journey anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Beautiful Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create meaningful connections with your future self
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature Cards */}
            <div className="bg-white/40 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <Calendar className="text-purple-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Calendar Date Picker</h3>
              <p className="text-gray-600">Choose any future date with our intuitive calendar interface</p>
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <Edit3 className="text-blue-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Rich Text Editor</h3>
              <p className="text-gray-600">Express yourself fully with formatting, emojis, and style options</p>
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <Bell className="text-pink-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Smart Notifications</h3>
              <p className="text-gray-600">Get notified via email or push when your letter arrives</p>
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <Tag className="text-green-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Letter Tags</h3>
              <p className="text-gray-600">Organize with emotional tags like Hope, Love, Goals, and Reminders</p>
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <Shield className="text-indigo-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Private & Secure</h3>
              <p className="text-gray-600">Your letters are encrypted and stored with bank-level security</p>
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <Archive className="text-teal-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">My Letters Dashboard</h3>
              <p className="text-gray-600">View, organize, and manage all your letters in one beautiful place</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">See It In Action</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the beautiful interface designed for reflection and connection
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Writing Interface Mockup */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
                <h3 className="text-white font-semibold text-lg">Write Your Letter</h3>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <label className="text-gray-600 text-sm font-medium block mb-2">Delivery Date</label>
                  <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
                    <Calendar className="text-purple-500" size={20} />
                    <span className="text-gray-700">December 25, 2025</span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="text-gray-600 text-sm font-medium block mb-2">Your Letter</label>
                  <div className="bg-gray-50 p-4 rounded-2xl min-h-32">
                    <p className="text-gray-500 italic">Dear Future Me, I hope you remember...</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">Hope</span>
                  <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">Love</span>
                </div>
              </div>
            </div>

            {/* My Letters Dashboard Mockup */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6">
                <h3 className="text-white font-semibold text-lg">My Letters</h3>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Letter from 2024</h4>
                      <p className="text-gray-500 text-sm">Delivered today</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">Goal</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Birthday Letter</h4>
                      <p className="text-gray-500 text-sm">Arriving in 30 days</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs">Love</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">New Year Wishes</h4>
                      <p className="text-gray-500 text-sm">Arriving in 365 days</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">Hope</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">What People Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from people who connected with their future selves
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/40 backdrop-blur-sm p-8 rounded-3xl shadow-lg text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">
                "I opened a letter from my past self and cried. It reminded me of dreams I had forgotten. 
                Thank you, EchoNote."
              </p>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full mx-auto mb-3"></div>
              <p className="font-semibold text-gray-800">Sarah M.</p>
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-8 rounded-3xl shadow-lg text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">
                "A beautiful way to hold onto yourself through time. Every letter feels like a gift 
                from the person I used to be."
              </p>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-300 to-teal-300 rounded-full mx-auto mb-3"></div>
              <p className="font-semibold text-gray-800">Michael R.</p>
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-8 rounded-3xl shadow-lg text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">
                "This app helped me through tough times. Writing to my future self became my therapy, 
                and receiving those letters was pure magic."
              </p>
              <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-orange-300 rounded-full mx-auto mb-3"></div>
              <p className="font-semibold text-gray-800">Emma L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Meet Your Future Self?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Start your journey of self-reflection and connection today. Your future self is waiting.
          </p>
          <button 
            className="bg-white text-purple-600 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
            Start Writing Letters
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">EchoNote</h3>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Connect with your future self through heartfelt letters. A beautiful way to reflect, 
                grow, and remember your journey through time.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 EchoNote. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Heart size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;