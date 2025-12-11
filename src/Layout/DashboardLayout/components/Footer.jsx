import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-8">
      <div className="w-full bg-secondary/80 border-t border-secondary/20 text-primary/70">
        <div className="max-w-screen-2xl mx-auto px-4 py-4 text-center text-sm">
          Copyright © {new Date().getFullYear()} TailorFlow Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
