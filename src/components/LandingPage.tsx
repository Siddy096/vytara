import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, AlertCircle, Users, Brain, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import logoImage from 'figma:asset/3356ef9e7b4ecad1a9839c039785983e296f414d.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Props = {
  onLogin: () => void;
  onGetStarted: () => void;
};

export function LandingPage({ onLogin, onGetStarted }: Props) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    { 
      title: 'Single Medical Vault', 
      icon: FileText, 
      color: '#309898',
      description: 'Store all medical documents securely'
    },
    { 
      title: 'Emergency Medical Information Form', 
      icon: AlertCircle, 
      color: '#FF8000',
      description: 'Quick access to critical health data'
    },
    { 
      title: 'Multi-profile', 
      icon: Users, 
      color: '#309898',
      description: 'Manage family members health records'
    },
    { 
      title: 'AI Medical Summarizer', 
      icon: Brain, 
      color: '#FF8000',
      description: 'Intelligent health insights'
    },
    { 
      title: 'Emergency SOS', 
      icon: Phone, 
      color: '#309898',
      description: 'One-tap emergency assistance'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#309898]/5 via-white to-[#FF8000]/5">
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo and Name */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          >
            <img src={logoImage} alt="Vytara Logo" className="w-16 h-16 sm:w-20 sm:h-20" />
            <span className="text-[#309898] text-xl sm:text-2xl">Vytara</span>
          </motion.div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <motion.button
              whileHover={{ scale: 1.1, color: '#FF8000' }}
              onClick={() => scrollToSection('about-us')}
              className="text-gray-700 hover:text-[#FF8000] transition-colors"
            >
              About Us
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, color: '#FF8000' }}
              onClick={() => scrollToSection('our-features')}
              className="text-gray-700 hover:text-[#FF8000] transition-colors"
            >
              Our Features
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, color: '#FF8000' }}
              onClick={() => scrollToSection('contact-us')}
              className="text-gray-700 hover:text-[#FF8000] transition-colors"
            >
              Contact Us
            </motion.button>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogin}
              className="px-3 py-2 sm:px-6 text-sm sm:text-base text-[#309898] border-2 border-[#309898] rounded-full hover:bg-[#309898] hover:text-white transition-all"
            >
              Log In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-3 py-2 sm:px-6 text-sm sm:text-base bg-gradient-to-r from-[#309898] to-[#FF8000] text-white rounded-full shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Hero Image Container */}
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80"
                alt="Healthcare"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#309898]/40 to-[#FF8000]/40" />
            </div>

            {/* Logo Circle on Border */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute left-1/2 -translate-x-1/2 -bottom-20 w-56 h-56 bg-white rounded-full shadow-2xl border-8 border-white flex items-center justify-center"
            >
              <img src={logoImage} alt="Vytara Logo" className="w-40 h-40" />
            </motion.div>
          </motion.div>

          {/* Title and Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-24"
          >
            <h1 className="text-[#309898] mb-4 text-5xl md:text-6xl font-black">Vytara</h1>
            <p className="text-gray-600 italic text-xl">
              "Make your health shine with us"
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center mt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-8 h-8 text-[#FF8000]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[#FF8000] mb-6 text-4xl md:text-5xl font-extrabold">About Us</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Vytara is your trusted companion in managing healthcare information. We believe that everyone deserves easy access to their medical records and health data.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our platform brings together cutting-edge technology and user-friendly design to create a comprehensive health management solution that puts you in control.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From storing medical documents to emergency access, Vytara ensures your health information is always at your fingertips when you need it most.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="mt-8 px-8 py-3 bg-[#309898] text-white rounded-full hover:bg-[#309898]/90 transition-all shadow-lg"
              >
                Join Us Today
              </motion.button>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 rounded-3xl overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80"
                alt="Healthcare Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#309898]/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Features Section */}
      <section id="our-features" className="py-20 px-6 bg-gradient-to-br from-[#309898]/5 to-[#FF8000]/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-[#309898] mb-20 text-4xl md:text-5xl font-extrabold"
          >
            Our Features
          </motion.h2>

          {/* Animated Curved Path - Desktop */}
          <div className="hidden sm:block relative h-[600px]">
            {/* SVG Curved Line */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 0,300 Q 250,100 500,300 T 1000,300"
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#309898" />
                  <stop offset="50%" stopColor="#FF8000" />
                  <stop offset="100%" stopColor="#309898" />
                </linearGradient>
              </defs>
            </svg>

            {/* Feature Pills */}
            {features.map((feature, index) => {
              const Icon = feature.icon;
              // Calculate positions along the curve
              const positions = [
                { x: '5%', y: '50%' },
                { x: '20%', y: '20%' },
                { x: '40%', y: '50%' },
                { x: '60%', y: '20%' },
                { x: '80%', y: '50%' },
              ];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.2 }}
                  onHoverStart={() => setHoveredFeature(index)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  className="absolute"
                  style={{
                    left: positions[index].x,
                    top: positions[index].y,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="relative px-6 py-4 rounded-full shadow-xl cursor-pointer transition-all duration-300"
                    style={{ backgroundColor: feature.color }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-white flex-shrink-0" />
                      <span className="text-white whitespace-nowrap">
                        {feature.title}
                      </span>
                    </div>

                    {/* Hover Tooltip */}
                    {hoveredFeature === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-white rounded-lg shadow-lg whitespace-nowrap z-10"
                      >
                        <p className="text-sm text-gray-700">{feature.description}</p>
                        <div
                          className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Animated Vertical Path - Mobile */}
          <div className="sm:hidden relative h-[1000px]">
            {/* SVG Vertical Curved Line */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 300 1000"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 150,0 Q 100,200 150,400 T 150,800 Q 100,900 150,1000"
                stroke="url(#gradient-vertical)"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradient-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#309898" />
                  <stop offset="50%" stopColor="#FF8000" />
                  <stop offset="100%" stopColor="#309898" />
                </linearGradient>
              </defs>
            </svg>

            {/* Feature Pills - Vertical Layout Alternating */}
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isBlue = feature.color === '#309898';
              
              // Positions alternating left (blue) and right (orange)
              const positions = [
                { x: '20%', y: '10%', align: 'left' },   // Blue - left
                { x: '60%', y: '25%', align: 'right' },  // Orange - right
                { x: '20%', y: '45%', align: 'left' },   // Blue - left
                { x: '60%', y: '62.5%', align: 'right' }, // Orange - right
                { x: '20%', y: '80%', align: 'left' },   // Blue - left
              ];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isBlue ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="absolute"
                  style={{
                    left: positions[index].x,
                    top: positions[index].y,
                    transform: positions[index].align === 'left' ? 'translate(0, -50%)' : 'translate(-100%, -50%)',
                  }}
                >
                  <div
                    className="relative px-3 py-2 rounded-full shadow-xl cursor-pointer transition-all duration-300"
                    style={{ backgroundColor: feature.color }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-white flex-shrink-0" />
                      <span className="text-white text-xs whitespace-nowrap">
                        {feature.title}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Feature Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <p className="text-gray-700 text-lg mb-8">
              Experience healthcare management like never before with our innovative features designed for you and your family.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-8 py-3 bg-gradient-to-r from-[#309898] to-[#FF8000] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Us / Footer Section */}
      <section id="contact-us" className="py-20 px-6 bg-gradient-to-br from-[#309898] to-[#FF8000] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-4 text-4xl md:text-5xl font-extrabold">Contact Us</h2>
            <p className="text-white/90 text-lg">
              Have questions? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
            >
              <Mail className="w-12 h-12 mx-auto mb-4" />
              <h4 className="text-white mb-2">Email</h4>
              <p className="text-white/90">support@vytara.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
            >
              <Phone className="w-12 h-12 mx-auto mb-4" />
              <h4 className="text-white mb-2">Phone</h4>
              <p className="text-white/90">+1 (555) 123-4567</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
            >
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h4 className="text-white mb-2">Address</h4>
              <p className="text-white/90">123 Healthcare Ave, Medical City, MC 12345</p>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-white/20 pt-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src={logoImage} alt="Vytara Logo" className="w-20 h-20" />
              <span className="text-white text-xl">Vytara</span>
            </div>
            <p className="text-white/80 text-sm italic mb-4">
              "Make your health shine with us"
            </p>
            <p className="text-white/60 text-sm">
              © 2024 Vytara. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}