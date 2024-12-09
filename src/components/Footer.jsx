import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">HW</h3>
          <p className="text-sm text-gray-400">© 2024 Tüm Hakları Saklıdır.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#facebook" className="text-gray-400 hover:text-white transition">Facebook</a>
          <a href="#twitter" className="text-gray-400 hover:text-white transition">Twitter</a>
          <a href="#instagram" className="text-gray-400 hover:text-white transition">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
