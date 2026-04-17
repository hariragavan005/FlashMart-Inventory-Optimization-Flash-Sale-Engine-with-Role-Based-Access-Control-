import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const categories = ['Fashion', 'Mobiles', 'Beauty', 'Electronics', 'Home', 'Appliances', 'Toys&Baby', 'Food & Health'];
  const quickLinks = ['About Us', 'Contact', 'FAQs', 'Privacy Policy', 'Terms of Service', 'Shipping Info'];
  
  return (
    <footer className="bg-premium-dark text-white/80 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-3xl animate-float">✨</div>
              <h2 className="text-2xl font-display font-bold gradient-text">FlashMart</h2>
            </div>
            <p className="text-sm mb-4">Redefining everyday style with premium quality products at unbeatable prices.</p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -3, scale: 1.1 }}
                  href="#"
                  className="bg-white/10 p-2 rounded-full hover:bg-premium-gold transition-colors duration-300"
                >
                  <Icon className="text-white" />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-4 text-premium-gold">Shop by Category</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat, index) => (
                <motion.a
                  key={index}
                  whileHover={{ x: 5 }}
                  href="#"
                  className="text-sm hover:text-premium-gold transition-colors"
                >
                  {cat}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-4 text-premium-gold">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  whileHover={{ x: 5 }}
                  href="#"
                  className="block text-sm hover:text-premium-gold transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-4 text-premium-gold">Newsletter</h3>
            <p className="text-sm mb-3">Get 10% off your first order! Subscribe for exclusive deals.</p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-premium-gold focus:outline-none text-white"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="premium-button w-full"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 text-center text-sm">
          <p>Made with <FaHeart className="inline text-premium-coral animate-pulse" /> by FlashMart Team © 2024 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;