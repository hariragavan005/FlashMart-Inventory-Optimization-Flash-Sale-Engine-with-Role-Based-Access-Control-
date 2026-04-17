import { FaTshirt, FaUserTie, FaUserSecret, FaBriefcase, FaShoePrints, FaClock, FaHatCowboy } from 'react-icons/fa';

export const categories = [
  { id: 't-shirt', name: 'T-Shirt', icon: FaTshirt },
  { id: 'jacket', name: 'Jacket', icon: FaUserSecret },
  { id: 'shirt', name: 'Shirt', icon: FaUserTie },
  { id: 'jeans', name: 'Jeans', icon: FaShoePrints },
  { id: 'bag', name: 'Bag', icon: FaBriefcase },
  { id: 'shoes', name: 'Shoes', icon: FaShoePrints },
  { id: 'watches', name: 'Watches', icon: FaClock },
  { id: 'cap', name: 'Cap', icon: FaHatCowboy }
];

export const products = [
  // Flash Sales
  { 
    id: 1, 
    name: "EliteShield Performance Men's Jackets", 
    price: 4999, 
    originalPrice: 7999, 
    discount: 37, 
    stock: 9, 
    category: 'jacket',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&auto=format', 
    rating: 4.7, 
    reviews: 128,
    isFlashSale: true,
    description: "Built for endurance and style, the EliteShield Performance Jacket offers superior weather protection without compromising on comfort. Features integrated thermal lining and water-resistant shell."
  },
  { 
    id: 2, 
    name: "Gentlemen's Summer Gray Hat - Premium Blend", 
    price: 499, 
    originalPrice: 999, 
    discount: 50, 
    stock: 9, 
    category: 'cap',
    image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=400&auto=format', 
    rating: 4.5, 
    reviews: 89,
    isFlashSale: true,
    description: "Stay cool and sophisticated this summer. Our premium gray hat is crafted from a breathable wool blend, perfect for both casual outings and outdoor events."
  },
  { 
    id: 3, 
    name: "OptiZoom Camera Shoulder Bag", 
    price: 2499, 
    originalPrice: 4299, 
    discount: 42, 
    stock: 5, 
    category: 'bag',
    image: 'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?w=400&auto=format', 
    rating: 4.8, 
    reviews: 203,
    isFlashSale: true,
    description: "Protection for your gear, style for your journey. The OptiZoom features customizable compartments and reinforced padding for up to 2 DSLR bodies and 3 lenses."
  },
  { 
    id: 4, 
    name: "Cloudy Chic - Grey Peep Toe Heeled Sandals", 
    price: 1899, 
    originalPrice: 2999, 
    discount: 37, 
    stock: 5, 
    category: 'shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&auto=format', 
    rating: 4.6, 
    reviews: 156,
    isFlashSale: true,
    description: "Elevate your evening look with Cloudy Chic. These peep-toe sandals feature a cushioned sole for all-night comfort and an elegant suede finish."
  },
  // Normal Products (Today For You etc)
  { 
    id: 5, 
    name: "Urban Classic Leather Messenger Bag", 
    price: 3499, 
    category: 'bag',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format', 
    rating: 4.9, 
    reviews: 320,
    isFlashSale: false,
    description: "Vintage-inspired with modern utility. This leather messenger bag is perfect for your 15-inch laptop and daily essentials."
  },
  { 
    id: 6, 
    name: "Midnight Stealth Chronograph Watch", 
    price: 5999, 
    category: 'watches',
    image: 'https://images.unsplash.com/photo-1524592091214-8c97af7c4a31?w=400&auto=format', 
    rating: 4.5, 
    reviews: 45,
    isFlashSale: false,
    description: "A statement of precision. The Midnight Stealth features a scratch-resistant sapphire crystal and Japanese quartz movement."
  },
  { 
    id: 7, 
    name: "PureWhite Minimalist Cotton Tee", 
    price: 799, 
    category: 't-shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format', 
    rating: 4.2, 
    reviews: 512,
    isFlashSale: false,
    description: "The ultimate basic. 100% organic cotton, preshrunk for a perfect fit after every wash."
  },
  { 
    id: 8, 
    name: "SkyLine Aviation Sunglasses - Gold", 
    price: 1299, 
    category: 'cap', // fallout for accessories
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&auto=format', 
    rating: 4.7, 
    reviews: 18,
    isFlashSale: false,
    description: "Polarized lenses with a premium titanium frame. Designed for clarity and durability."
  },
  { 
    id: 9, 
    name: "Heritage Denim Jacket - Indigo", 
    price: 2999, 
    category: 'jacket',
    image: 'https://images.unsplash.com/photo-1551537482-f20300fc4ea1?w=400&auto=format', 
    rating: 4.8, 
    reviews: 92,
    isFlashSale: false,
    description: "A timeless classic. Rugged denim that breaks in beautifully over time."
  },
  // Extra items for "Shoes" to test "Load More"
  { 
    id: 10, 
    name: "SwiftRunner Pro Running Shoes", 
    price: 3999, 
    category: 'shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c274d?w=400&auto=format', 
    rating: 4.9, 
    reviews: 1200,
    isFlashSale: false,
    description: "Dynamic cushioning and ultra-breathable mesh for your fastest runs yet."
  },
  { 
    id: 11, 
    name: "Classic All-Star Canvas Sneakers", 
    price: 1499, 
    category: 'shoes',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format', 
    rating: 4.4, 
    reviews: 800,
    isFlashSale: false,
    description: "The shoes that started it all. Versatile, durable, and always in style."
  },
  { 
    id: 12, 
    name: "Peak Performance Hiking Boots", 
    price: 4999, 
    category: 'shoes',
    image: 'https://images.unsplash.com/photo-1520639889410-d65c36fbe9a3?w=400&auto=format', 
    rating: 4.7, 
    reviews: 230,
    isFlashSale: false,
    description: "Waterproof protection and high-traction soles for challenging terrains."
  },
  { 
    id: 13, 
    name: "Desert Trekker Suede Boots", 
    price: 3499, 
    category: 'shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format', 
    rating: 4.6, 
    reviews: 88,
    isFlashSale: false,
    description: "Sophisticated suede with a natural crepe sole. The perfect smart-casual choice."
  },
  { 
    id: 14, 
    name: "ComfyHome Memory Foam Slippers", 
    price: 299, 
    category: 'shoes',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format', 
    rating: 4.3, 
    reviews: 210,
    isFlashSale: false,
    description: "Cloud-like comfort for your indoor relaxation. Features anti-slip rubber soles."
  }
];
