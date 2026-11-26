import { useRef, useState } from 'react';
import { BookingModal } from './components/BookingModal/BookingModal';
import { Header } from './components/Header/Header';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { BookingSection, type BookingZone } from './sections/BookingSection/BookingSection';
import { Footer } from './sections/Footer/Footer';
import { HeroSection } from './sections/HeroSection/HeroSection';
import { MapSection } from './sections/MapSection/MapSection';
import { MenuSection } from './sections/MenuSection/MenuSection';
import { NewsSection } from './sections/NewsSection/NewsSection';
import { ReviewsSection } from './sections/ReviewsSection/ReviewsSection';
import { SpaceSection } from './sections/SpaceSection/SpaceSection';

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [pendingZone, setPendingZone] = useState<BookingZone>('Основной зал');
  const [selectedZone, setSelectedZone] = useState<BookingZone>('Основной зал');
  const bookingNameRef = useRef<HTMLInputElement>(null);

  function openBookingModal(preferredZone: BookingZone = 'Основной зал') {
    setPendingZone(preferredZone);
    setBookingModalOpen(true);
  }

  function handleChooseOnSite() {
    setSelectedZone(pendingZone);
    setBookingModalOpen(false);
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => {
      bookingNameRef.current?.focus({ preventScroll: true });
    }, 360);
  }

  return (
    <>
      <Header
        mobileMenuOpen={mobileMenuOpen}
        onOpenMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        onOpenBookingModal={() => openBookingModal('Основной зал')}
      />
      <main>
        <HeroSection onOpenBookingModal={() => openBookingModal('Основной зал')} />
        <SpaceSection onReserveVip={() => openBookingModal('Закрытый VIP')} />
        <MenuSection />
        <NewsSection />
        <ReviewsSection />
        <MapSection />
        <BookingSection
          selectedZone={selectedZone}
          onZoneChange={setSelectedZone}
          nameInputRef={bookingNameRef}
        />
      </main>
      <Footer />
      <BookingModal
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onChooseOnSite={handleChooseOnSite}
      />
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenBookingModal={() => openBookingModal('Основной зал')}
      />
    </>
  );
}
