import React, { useEffect, useState } from 'react';
import { MenuItem, Category } from '../types';
import { menuService } from '../services/menuService';
import MenuCard from '../components/MenuCard';
import { Loader2, X } from 'lucide-react';

const Menu: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const data = await menuService.getMenuItems();
        setItems(data);
      } catch (error) {
        console.error("Failed to load menu", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const categories = ['All', ...Object.values(Category)];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Menu</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our wide range of mouth-watering dishes, from spicy Karahis to smoky BBQ.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        
        {/* Category Filter */}
        <div className="bg-white p-2 rounded-xl shadow-lg flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-2 mb-10 border border-gray-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as Category | 'All')}
              className={`px-6 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-orange-600 animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading delicious items...</p>
          </div>
        ) : (
          <>
            {filteredItems.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No items found in this category yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                    <MenuCard key={item.id} item={item} onClick={setSelectedItem} />
                ))}
                </div>
            )}
          </>
        )}
      </div>

      {/* Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative animate-scale-in">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>
            
            <div className="relative h-64 sm:h-80">
                <img 
                    src={selectedItem.imageUrl} 
                    alt={selectedItem.name} 
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wide rounded-full mb-2">
                        {selectedItem.category}
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-gray-900">{selectedItem.name}</h2>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">PKR {selectedItem.price}</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {selectedItem.description}
              </p>

              <div className="border-t pt-6 flex justify-end">
                <button 
                    onClick={() => setSelectedItem(null)} // In a real app, this might add to cart
                    className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                    Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;