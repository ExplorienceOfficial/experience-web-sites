'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom cursor — a crisp dot with a lagging ring, blended with
 * mix-blend-difference so it inverts against whatever is behind it (dark base
 * or a bright cosmic blob) for a futuristic, always-visible pointer.
 * Disabled on touch devices.
 */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      setHover(Boolean(el?.closest('a, button, [data-cursor], input, [role="button"]')));
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', dn, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    document.addEventListener('pointerleave', leave);
    document.addEventListener('pointerenter', enter);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', dn);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('pointerleave', leave);
      document.removeEventListener('pointerenter', enter);
    };
  }, [x, y]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[150] hidden md:block"
      style={{ opacity: visible ? 1 : 0, mixBlendMode: 'difference' }}
    >
      {/* Dot */}
      <motion.div className="fixed left-0 top-0" style={{ x, y }}>
        <motion.div
          className="rounded-full bg-white"
          animate={{ scale: down ? 0.6 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            width: 6,
            height: 6,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div className="fixed left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="rounded-full border border-white"
          animate={{
            width: hover ? 52 : 28,
            height: hover ? 52 : 28,
            opacity: hover ? 1 : 0.7,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          style={{ translateX: '-50%', translateY: '-50%' }}
        />
      </motion.div>
    </div>
  );
}
