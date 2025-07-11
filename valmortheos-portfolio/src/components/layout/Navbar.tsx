'use client'; // Karena kita akan menggunakan useState

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // Menggunakan react-icons untuk ikon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { href: "/#about", label: "Tentang Saya" },
    { href: "/#projects", label: "Proyek" },
    { href: "/#skills", label: "Keahlian" },
    { href: "/#contact", label: "Kontak" },
  ];

  return (
    <nav className="bg-brand-black bg-opacity-70 backdrop-blur-md text-brand-white p-4 sticky top-0 z-50 border-b border-glass-edge">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-brand-blue hover:opacity-80 transition-opacity">
          Valmortheos
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-brand-blue transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 p-4 bg-brand-black bg-opacity-90 rounded-md border border-glass-edge">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block text-center py-2 hover:text-brand-blue transition-colors"
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
