'use client';

import { useState } from 'react';
import Header from './Header';
import LanguageModal from './LanguageModal';

export default function MainLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [languageModalOpen, setLanguageModalOpen] = useState(false);

  return (
    <>
      <Header onGlobeClick={() => setLanguageModalOpen(true)} />
      <main className="min-h-screen bg-white">{children}</main>
      <LanguageModal
        isOpen={languageModalOpen}
        onClose={() => setLanguageModalOpen(false)}
      />
    </>
  );
}
