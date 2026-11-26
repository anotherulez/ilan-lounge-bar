import { VENUE } from './data/venue';

export function App() {
  return (
    <main style={{ padding: '48px 24px', maxWidth: '960px', margin: '0 auto' }}>
      <h1>{VENUE.brand} {VENUE.subtitle}</h1>
      <p>{VENUE.address} · {VENUE.city}</p>
    </main>
  );
}
