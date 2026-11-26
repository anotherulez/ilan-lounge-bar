import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { FontPresetBar, type FontPreset } from './components/FontPresetBar/FontPresetBar';
import { Header } from './components/Header/Header';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { BookingSection } from './sections/BookingSection/BookingSection';
import { CategoriesSection } from './sections/CategoriesSection/CategoriesSection';
import { ChronicleSection } from './sections/ChronicleSection/ChronicleSection';
import { FeatureHighlightSection } from './sections/FeatureHighlightSection/FeatureHighlightSection';
import { Footer } from './sections/Footer/Footer';
import { HeroSection } from './sections/HeroSection/HeroSection';
import { MenuSection } from './sections/MenuSection/MenuSection';
import { ReviewsSection } from './sections/ReviewsSection/ReviewsSection';
import { StorySection } from './sections/StorySection/StorySection';

function getInitialFontPreset(): FontPreset {
  const params = new URLSearchParams(window.location.search);
  return params.get('fonts') === 'editorial' ? 'editorial' : 'fig';
}

export function App() {
  const [fontPreset, setFontPreset] = useState<FontPreset>(getInitialFontPreset);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-font-preset', fontPreset);
  }, [fontPreset]);

  return (
    <MotionConfig reducedMotion="user">
      <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <main>
        <HeroSection />
        <CategoriesSection />
        <StorySection />
        <FeatureHighlightSection />
        <MenuSection />
        <ReviewsSection />
        <ChronicleSection />
        <BookingSection />
      </main>
      <Footer />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <FontPresetBar preset={fontPreset} onChange={setFontPreset} />
    </MotionConfig>
  );
}
