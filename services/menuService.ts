import { MenuItem, MOCK_MENU_ITEMS, Category } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

// Simulate a database delay for better UX demonstration
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MenuService {
  private items: MenuItem[] = [...MOCK_MENU_ITEMS];

  async getMenuItems(): Promise<MenuItem[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .order('category', { ascending: true });
        
        if (error) throw error;
        if (data) return data as MenuItem[];
      } catch (err) {
        console.warn('Failed to fetch from Supabase, falling back to mock data:', err);
      }
    }
    
    // Fallback or Mock Mode
    await delay(600); 
    return this.items;
  }

  async addMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
    
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('menu_items')
        .insert([item])
        .select()
        .single();
      
      if (!error && data) return data;
    }

    // Mock Mode
    await delay(400);
    this.items.push(newItem);
    return newItem;
  }

  async updateMenuItem(item: MenuItem): Promise<MenuItem> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('menu_items')
        .update(item)
        .eq('id', item.id)
        .select()
        .single();
        
      if (!error && data) return data;
    }

    // Mock Mode
    await delay(300);
    this.items = this.items.map(i => i.id === item.id ? item : i);
    return item;
  }

  async deleteMenuItem(id: string): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('menu_items').delete().eq('id', id);
      return;
    }

    // Mock Mode
    await delay(300);
    this.items = this.items.filter(i => i.id !== id);
  }

  async uploadImage(file: File): Promise<string> {
    if (isSupabaseConfigured() && supabase) {
       const fileExt = file.name.split('.').pop();
       const fileName = `${Math.random()}.${fileExt}`;
       const filePath = `${fileName}`;

       const { error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(filePath, file);

       if (uploadError) {
         throw uploadError;
       }

       const { data } = supabase.storage.from('menu-images').getPublicUrl(filePath);
       return data.publicUrl;
    }

    // Mock Mode: just return a placeholder for the demo
    await delay(1000);
    return URL.createObjectURL(file);
  }
}

export const menuService = new MenuService();