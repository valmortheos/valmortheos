const Footer = () => {
  return (
    <footer className="bg-brand-black bg-opacity-30 backdrop-blur-sm text-brand-white p-8 text-center border-t border-glass-edge mt-12">
      <p className="text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Valmortheos. Dibuat dengan <span className="text-brand-blue">❤</span> dan Next.js.
      </p>
    </footer>
  );
};

export default Footer;
