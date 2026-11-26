import { useState } from 'react';
import { Header } from './components/Header/Header';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { BookingSection } from './sections/BookingSection/BookingSection';
import { Footer } from './sections/Footer/Footer';
import { HeroSection } from './sections/HeroSection/HeroSection';
import { MenuSection } from './sections/MenuSection/MenuSection';
import { SpaceSection } from './sections/SpaceSection/SpaceSection';

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <main>
        <HeroSection />
        <SpaceSection />
        <MenuSection />
        <BookingSection />
      </main>
      <Footer />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
