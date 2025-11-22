import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Clock, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & Social */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-orange-500">Zeeshan's Restaurant</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Serving the finest BBQ and Karahi in town. Experience authentic flavors made with passion and traditional recipes.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Info</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-orange-500 mt-0.5" />
                <span>123 Food Street, Phase 5, DHA, Karachi, Pakistan</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-orange-500" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock size={18} className="text-orange-500" />
                <span>Daily: 12:00 PM - 1:00 AM</span>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-lg overflow-hidden h-40 bg-gray-800 relative">
            <img 
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80&w=800" 
                alt="Map location" 
                className="w-full h-full object-cover opacity-50 hover:opacity-75 transition-opacity cursor-pointer"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-black/50 px-3 py-1 text-xs rounded text-white backdrop-blur-sm">View on Map</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Zeeshan's Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;