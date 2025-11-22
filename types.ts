export enum Category {
  BBQ = 'BBQ',
  KARAHI = 'Karahi',
  SPECIALS = 'Specials',
  BEVERAGES = 'Beverages'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  available: boolean;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  address: string;
  hours: string;
  email: string;
}

export const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Chicken Tikka',
    description: 'Juicy chicken leg or breast piece, marinated in traditional spices and grilled to perfection over charcoal.',
    price: 450,
    category: Category.BBQ,
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '2',
    name: 'Behari Boti',
    description: 'Tender beef chunks marinated in papaya and special spices, melted in your mouth.',
    price: 600,
    category: Category.BBQ,
    imageUrl: 'https://images.unsplash.com/photo-1603360946369-dc9bb6f54262?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '3',
    name: 'Seekh Kebabs',
    description: 'Minced beef mixed with ginger, garlic, and coriander, skewered and grilled.',
    price: 350,
    category: Category.BBQ,
    imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '4',
    name: 'Mutton Karahi',
    description: 'Fresh mutton cooked in a wok with tomatoes, green chilies, and black pepper.',
    price: 2200,
    category: Category.KARAHI,
    imageUrl: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '5',
    name: 'Chicken White Karahi',
    description: 'Creamy and mild chicken curry cooked with yogurt, cream, and white pepper.',
    price: 1800,
    category: Category.KARAHI,
    imageUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '6',
    name: 'Chef Special Platter',
    description: 'A combination of Malai Boti, Seekh Kebabs, and Fish Tikka.',
    price: 3500,
    category: Category.SPECIALS,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76690b609aa?auto=format&fit=crop&q=80&w=800',
    available: true
  }
];