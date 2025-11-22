import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Utensils, Star } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76690b609aa?auto=format&fit=crop&q=80&w=1920" 
            alt="BBQ Grilling" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2 block">
              Est. 2023
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              Authentic <span className="text-orange-500">BBQ</span> & <br/> 
              Traditional <span className="text-orange-500">Karahi</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 font-light">
              Experience the true taste of Pakistani cuisine at Zeeshan's Restaurant. 
              Fresh ingredients, secret spices, and charcoal grilling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/menu">
                <button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-105">
                  View Full Menu <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/contact">
                <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-lg font-bold text-lg transition-all">
                  Book a Table
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Flame size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Live BBQ</h3>
              <p className="text-gray-600">
                Watch your food get grilled to perfection on our open charcoal pits. The smoky flavor you love.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Utensils size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fresh Karahi</h3>
              <p className="text-gray-600">
                Made to order in pure Desi Ghee or Oil, using fresh tomatoes and our secret spice blend.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                We source the finest meat and produce daily to ensure consistency and hygiene.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Image */}
      <section className="relative py-24">
         <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1920" alt="Food table" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gray-900/70" />
         </div>
         <div className="relative z-10 text-center text-white px-4">
             <h2 className="text-4xl font-serif font-bold mb-6">Hungry?</h2>
             <p className="text-xl mb-8 max-w-2xl mx-auto">Our chefs are ready to serve you the best dinner in the city.</p>
             <Link to="/menu">
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-orange-600/30 transition-all">
                    Browse Our Menu
                </button>
             </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;