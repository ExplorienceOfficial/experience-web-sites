import { setRequestLocale } from 'next-intl/server';
import CanvasWrapper from '@/components/canvas/CanvasWrapper';
import SmoothScroll from '@/components/SmoothScroll';
import Loader from '@/components/ui/Loader';
import Cursor from '@/components/ui/Cursor';
import Navbar from '@/components/ui/Navbar';
import SectionOne from '@/components/ui/SectionOne';
import SectionTwo from '@/components/ui/SectionTwo';
import Solutions from '@/components/ui/Solutions';
import About from '@/components/ui/About';
import Contact from '@/components/ui/Contact';
import Footer from '@/components/ui/Footer';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative w-full">
      {/* Opening cover */}
      <Loader />

      {/* Futuristic custom cursor (desktop) */}
      <Cursor />

      {/* Futuristic WebGL background — scroll & pointer reactive */}
      <CanvasWrapper />

      {/* Subtle scrim so white type always reads over the moving backdrop */}
      <div className="pointer-events-none fixed inset-0 z-[5] bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(6,6,10,0.55)_100%)]" />

      <div className="relative z-10">
        <Navbar />
        <SmoothScroll>
          <main>
            <SectionOne />
            {/* Scroll runway so the background drifts between sections */}
            <div className="h-[80vh]" aria-hidden />
            <SectionTwo />
            <Solutions />
            <About />
            <Contact />
            <Footer />
          </main>
        </SmoothScroll>
      </div>
    </div>
  );
}
