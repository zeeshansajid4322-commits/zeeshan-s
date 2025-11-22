import React from 'react';
import { MenuItem } from '../types';
import { Eye, DollarSign } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full cursor-pointer transform hover:-translate-y-1"
      onClick={() => onClick(item)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 backdrop-blur-sm">
            <Eye size={16} /> View Details
          </span>
        </div>
        {!item.available && (
             <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                 SOLD OUT
             </div>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                {item.name}
            </h3>
            </div>
            <p className="text-gray-500 text-sm line-clamp-2 mb-4">
            {item.description}
            </p>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <span className="text-lg font-bold text-orange-600 flex items-center">
            <span className="text-sm font-normal mr-1">PKR</span>
            {item.price.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400 font-medium px-2 py-1 bg-gray-100 rounded-full">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;