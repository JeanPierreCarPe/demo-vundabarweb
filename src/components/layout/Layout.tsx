import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollManager from './ScrollManager';

/** Shared shell for every page: Navbar + routed content + Footer. */
export default function Layout() {
  return (
    // `isolate` makes this the single stacking context for the page, so every decoration (z-index -10)
    // sits below all content of every section. `overflow-clip` only trims at the page edges,
    // so decorations can still bleed across the boundaries between sections.
    <div className="relative isolate min-h-screen overflow-clip bg-ink">
      <ScrollManager />
      <Navbar />
      <main>
        <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
