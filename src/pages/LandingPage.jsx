// import  from 'react';
import { Link } from 'react-router-dom';
import { Server, Shield, Clock, Users, ChevronRight, BarChart } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <Server className="h-8 w-8 text-blue-500" />,
      title: "Server Monitoring",
      description: "Real-time monitoring of all your server resources and performance metrics."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Automated Backups",
      description: "Schedule and manage backups with smart retention policies and instant recovery."
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      title: "Uptime Tracking",
      description: "99.9% uptime monitoring with instant alerts when issues are detected."
    },
    {
      icon: <BarChart className="h-8 w-8 text-blue-500" />,
      title: "Performance Analytics",
      description: "Comprehensive analytics dashboard to track server health and performance."
    }
  ];

  const testimonials = [
    {
      quote: "This server management tool has streamlined our entire infrastructure. We've reduced downtime by 87%.",
      author: "Sarah J., CTO at TechCorp"
    },
    {
      quote: "The automated backup system alone has saved our team countless hours and prevented several potential disasters.",
      author: "Michael L., System Administrator"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-16 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Enterprise Server Management Made Simple</h1>
              <p className="text-xl mb-8 text-blue-100">Powerful monitoring, backup, and management tools for your critical infrastructure.</p>
              <div className="flex space-x-4">
                <Link to="/register">
                  <button className="bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-md">
                    Start Free Trial
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors">
                    Log In
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                    <Server className="text-white h-12 w-12 mb-2" />
                    <div className="h-2 bg-blue-300 rounded-full w-3/4"></div>
                    <div className="h-2 mt-2 bg-blue-300 rounded-full w-1/2"></div>
                  </div>
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                    <Shield className="text-white h-12 w-12 mb-2" />
                    <div className="h-2 bg-green-300 rounded-full w-full"></div>
                    <div className="h-2 mt-2 bg-green-300 rounded-full w-2/3"></div>
                  </div>
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                    <Clock className="text-white h-12 w-12 mb-2" />
                    <div className="h-2 bg-yellow-300 rounded-full w-5/6"></div>
                    <div className="h-2 mt-2 bg-yellow-300 rounded-full w-1/3"></div>
                  </div>
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                    <BarChart className="text-white h-12 w-12 mb-2" />
                    <div className="h-2 bg-purple-300 rounded-full w-2/3"></div>
                    <div className="h-2 mt-2 bg-purple-300 rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Powerful Management Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-gray-600 font-semibold">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-50">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to take control of your servers?</h2>
          <p className="text-xl mb-8 text-gray-600">Join thousands of businesses that trust our platform for their critical infrastructure.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center w-full sm:w-auto">
                Start Free 30-Day Trial <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <Link to="/demo">
              <button className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center w-full sm:w-auto">
                Request Demo
              </button>
            </Link>
          </div>
          <p className="mt-6 text-gray-500 text-sm">No credit card required. Cancel anytime.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ServerManage</h3>
              <p className="text-gray-400">Enterprise-grade server management platform for businesses of all sizes.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link to="/enterprise" className="hover:text-white transition-colors">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/guides" className="hover:text-white transition-colors">Guides</Link></li>
                <li><Link to="/api" className="hover:text-white transition-colors">API</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/legal" className="hover:text-white transition-colors">Legal</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 ServerManage. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;