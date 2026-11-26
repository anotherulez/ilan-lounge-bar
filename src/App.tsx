import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header/Header';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { BookingSection } from './sections/BookingSection/BookingSection';
import { ChronicleSection } from './sections/ChronicleSection/ChronicleSection';
import { FeatureHighlightSection } from './sections/FeatureHighlightSection/FeatureHighlightSection';
import { Footer } from './sections/Footer/Footer';
import { GallerySection } from './sections/GallerySection/GallerySection';
import { HeroSection } from './sections/HeroSection/HeroSection';
import { MenuSection } from './sections/MenuSection/MenuSection';
import { ReviewsSection } from './sections/ReviewsSection/ReviewsSection';
import { StorySection } from './sections/StorySection/StorySection';

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <main>
        <HeroSection />
        <StorySection />
        <GallerySection />
        <FeatureHighlightSection />
        <MenuSection />
        <ReviewsSection />
        <ChronicleSection />
        <BookingSection />
      </main>
      <Footer />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </MotionConfig>
  );
}
