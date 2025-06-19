import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react'; // Using ShieldCheck as a placeholder logo

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="py-4 px-6 border-b bg-background">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span>SecureApp</span>
        </Link>
        {/* Minimal header, no navigation links as per description for auth pages */}
      </div>
    </header>
  );
};

export default Header;