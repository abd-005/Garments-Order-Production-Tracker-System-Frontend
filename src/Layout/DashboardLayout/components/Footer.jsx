import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-8">
      <div className="w-full bg-primary/70 border-t text-slate-200">
        <div className="max-w-screen-2xl mx-auto px-4 py-4 text-center text-sm">
          Copyright © {new Date().getFullYear()} TailorFlow Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
