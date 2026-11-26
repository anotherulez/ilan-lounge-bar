import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header/Header';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { OrderCart } from './components/OrderCart/OrderCart';
import { ScrollProgress } from './components/ScrollProgress/ScrollProgress';
import { ScrollVelocityStrip } from './components/ScrollVelocityStrip/ScrollVelocityStrip';
import { CartProvider } from './context/CartContext';
import { BookingSection } from './sections/BookingSection/BookingSection';
import { ChronicleSection } from './sections/ChronicleSection/ChronicleSection';
import { FeatureHighlightSection } from './sections/FeatureHighlightSection/FeatureHighlightSection';
import { Footer } from './sections/Footer/Footer';
import { GallerySection } from './sections/GallerySection/GallerySection';
import { HeroSection } from './sections/HeroSection/HeroSection';
import { MenuSection } from './sections/MenuSection/MenuSection';
import { StorySection } from './sections/StorySection/StorySection';

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleApplyCartToBooking() {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <ScrollProgress />
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main>
          <HeroSection />
          <ScrollVelocityStrip text="8 МАРТА 31 • ДО 04:00 • КУХНЯ НОЧЬЮ • VIP С PS5 • БЕЗ ПАФОСА" />
          <StorySection />
          <GallerySection />
          <FeatureHighlightSection />
          <MenuSection />
          <ChronicleSection />
          <BookingSection />
        </main>
        <Footer />
        <OrderCart onApplyToBooking={handleApplyCartToBooking} />
        <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </CartProvider>
    </MotionConfig>
  );
}
