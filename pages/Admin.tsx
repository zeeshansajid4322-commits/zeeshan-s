import React, { useState, useEffect } from 'react';
import { menuService } from '../services/menuService';
import { MenuItem, Category } from '../types';
import { Plus, Edit, Trash2, X, Save, Image as ImageIcon, Loader2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Simple mock auth for demo purposes
const MOCK_USER = 'admin';
const MOCK_PASS = 'admin';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Dashboard state
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    category: Category.BBQ,
    price: 0,
    description: '',
    available: true,
    imageUrl: ''
  });

  // Load items on mount if auth (or mock auth session)
  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
      fetchItems();
    }
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await menuService.getMenuItems();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === MOCK_USER && password === MOCK_PASS) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_session', 'true');
      fetchItems();
    } else {
      alert('Invalid credentials. Try admin/admin');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_session');
    setUsername('');
    setPassword('');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: Category.BBQ,
      price: 0,
      description: '',
      available: true,
      imageUrl: ''
    });
    setEditingItem(null);
  };

  const openModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        // Show loading state for image...
        const url = await menuService.uploadImage(file);
        setFormData(prev => ({ ...prev, imageUrl: url }));
      } catch (error) {
        alert("Error uploading image");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.price || !formData.category) return;

    // Use placeholder image if none uploaded
    const finalData = {
        ...formData,
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
    };

    setLoading(true);
    try {
      if (editingItem) {
        await menuService.updateMenuItem(finalData as MenuItem);
      } else {
        await menuService.addMenuItem(finalData as Omit<MenuItem, 'id'>);
      }
      await fetchItems();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setLoading(true);
      try {
        await menuService.deleteMenuItem(id);
        await fetchItems();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="admin"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-orange-600 text-white py-2 rounded-lg font-bold hover:bg-orange-700 transition-colors"
            >
              Login
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
                (Demo: admin / admin)
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-600 flex items-center gap-2 text-sm font-medium"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Menu Items ({items.length})</h2>
            <button 
                onClick={() => openModal()}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-700 shadow-sm"
            >
                <Plus size={20} /> Add Item
            </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Image</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Name</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Category</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Price</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Status</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading && items.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-orange-600 font-medium">PKR {item.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {item.available ? 'Available' : 'Sold Out'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => openModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={24} />
                </button>
                
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                    {editingItem ? 'Edit Item' : 'New Menu Item'}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dish Name</label>
                        <input 
                            required
                            type="text" 
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select 
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                            >
                                {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (PKR)</label>
                            <input 
                                required
                                type="number" 
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea 
                            required
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>

                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                         <div className="flex gap-2">
                             <input 
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                placeholder="https://..."
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                             />
                             <div className="relative">
                                 <input 
                                    type="file" 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                 />
                                 <button type="button" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg border border-gray-300 h-full">
                                    <ImageIcon size={20} className="text-gray-600" />
                                 </button>
                             </div>
                         </div>
                         {formData.imageUrl && (
                             <img src={formData.imageUrl} alt="Preview" className="h-20 w-20 object-cover mt-2 rounded-lg border" />
                         )}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <input 
                            type="checkbox" 
                            id="available"
                            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                            checked={formData.available}
                            onChange={(e) => setFormData({...formData, available: e.target.checked})}
                        />
                        <label htmlFor="available" className="text-sm font-medium text-gray-700">Item is available</label>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="flex-1 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 flex justify-center items-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            Save Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Admin;