import React from 'react';
import { Phone, MapPin, Clock, Mail, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">Contact Us</h1>
        <p className="text-gray-400">We'd love to hear from you. Visit us or order online.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            
            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Visit Us</h3>
                <p className="text-gray-600 mt-1">123 Food Street, Phase 5<br/>DHA, Karachi, Pakistan</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Call Us</h3>
                <p className="text-gray-600 mt-1">+92 300 1234567</p>
                <p className="text-gray-500 text-sm mt-1">Available for delivery and takeaway</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">WhatsApp</h3>
                <p className="text-gray-600 mt-1">+92 333 7654321</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Opening Hours</h3>
                <div className="text-gray-600 mt-1 space-y-1">
                  <p className="flex justify-between w-48"><span>Mon - Thu:</span> <span>12 PM - 12 AM</span></p>
                  <p className="flex justify-between w-48 font-bold text-orange-600"><span>Fri - Sun:</span> <span>12 PM - 02 AM</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl shadow-lg p-2 h-96 lg:h-auto min-h-[400px] overflow-hidden">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d924244.0619641684!2d66.5949955172774!3d25.192146526892635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f4455504035!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1709999999999!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '1rem' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;