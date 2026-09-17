'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useExperience } from '@/lib/store';

const OBSIDIAN = '#0d0e12';

/* -------------------------------------------------------------------------- */
/*  Resize controller — drives canvas size explicitly from the window.        */
/* -------------------------------------------------------------------------- */

function ResizeController() {
  const setSize = useThree((s) => s.setSize);
  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w > 0 && h > 0) setSize(w, h);
    };
    apply();
    const ids = [60, 180, 400, 900].map((t) => window.setTimeout(apply, t));
    window.addEventListener('resize', apply);
    window.addEventListener('orientationchange', apply);
    return () => {
      ids.forEach((id) => window.clearTimeout(id));
      window.removeEventListener('resize', apply);
      window.removeEventListener('orientationchange', apply);
    };
  }, [setSize]);
  return null;
}

/* -------------------------------------------------------------------------- */
/*  Fluid graphite backdrop — monochromatic metaballs on obsidian, grain      */
/* -------------------------------------------------------------------------- */

const BACKDROP_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const BACKDROP_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uPointerVel;
  uniform float uScroll;
  uniform float uScrollVel;
  uniform int uOctaves;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 6; i++) {
      if (i >= uOctaves) break;
      v += a * noise(p);
      p = p * 2.02 + 11.3;
      a *= 0.5;
    }
    return v;
  }
  mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
  float metaball(vec2 p, vec2 c, float r) {
    float d = length(p - c);
    return r / (d * d + 0.02);
  }
  // Cosmic Energy trio — start / middle / end of the palette.
  vec3 cosmicColor(float ph) {
    ph = fract(ph);
    vec3 c1 = vec3(0.541, 0.169, 0.886); // #8A2BE2
    vec3 c2 = vec3(0.000, 1.000, 1.000); // #00FFFF
    vec3 c3 = vec3(1.000, 0.388, 0.278); // #FF6347
    float x = ph * 3.0;
    if (x < 1.0) return mix(c1, c2, smoothstep(0.0, 1.0, x));
    if (x < 2.0) return mix(c2, c3, smoothstep(0.0, 1.0, x - 1.0));
    return mix(c3, c1, smoothstep(0.0, 1.0, x - 2.0));
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 p = vUv - 0.5;
    p.x *= aspect;

    // cursor position in the same aspect-corrected space
    vec2 mp = vec2(uPointer.x * 0.5 * aspect, uPointer.y * 0.5);

    float t = uTime * 0.05;

    // scroll rotates + expands the whole field, with parallax toward the cursor
    vec2 fp = p + uPointer * 0.08;
    fp = rot(uScroll * 0.5 + uScrollVel * 0.6) * fp;
    fp *= (1.0 - uScroll * 0.10 + uScrollVel * 0.05);

    // --- interactive liquid distortion around the cursor ---
    vec2 toM = fp - mp;
    float dM = length(toM);
    float infl = exp(-dM * dM * 4.5);                       // strength near cursor
    vec2 dir = dM > 0.0001 ? toM / dM : vec2(0.0);
    // ripple rings, pushed outward and energised by how fast the mouse moves
    float ripple = sin(dM * 20.0 - uTime * 4.0) * infl * (0.02 + uPointerVel * 0.16);
    fp += dir * ripple;

    // fluid domain warp (extra turbulence near the cursor)
    vec2 q = vec2(fbm(fp * 1.1 + t), fbm(fp * 1.1 - t + 5.2));
    fp += (q - 0.5) * (0.55 + infl * 0.30);

    // monochromatic drifting blobs + a prominent one under the cursor
    float field = 0.0;
    field += metaball(fp, vec2(sin(t * 1.0) * 0.45, cos(t * 0.8) * 0.30), 0.046);
    field += metaball(fp, vec2(cos(t * 0.7 + 1.0) * 0.52, sin(t * 1.2) * 0.36), 0.042);
    field += metaball(fp, vec2(sin(t * 0.5 + 2.4) * 0.36, cos(t * 0.6 + 1.6) * 0.44), 0.038);
    field += metaball(fp, mp, 0.058 + uPointerVel * 0.06);

    float m = smoothstep(0.62, 3.1, field);

    // Cosmic colour flows across space + time so different regions glow with
    // different palette hues, softly cycling (slow = premium, not neon-childish).
    vec3 cosmic = cosmicColor(uTime * 0.055 + fp.x * 0.22 + fp.y * 0.14);
    cosmic = mix(cosmic, vec3(dot(cosmic, vec3(0.333))), 0.20); // gently desaturate

    vec3 base = vec3(0.051, 0.055, 0.071); // obsidian #0d0e12
    vec3 col = base;
    col = mix(col, cosmic * 0.42, smoothstep(0.0, 0.5, m));                 // coloured haze
    col = mix(col, cosmic * 0.85, smoothstep(0.45, 0.88, m));               // blob body
    col = mix(col, mix(cosmic, vec3(1.0), 0.55), smoothstep(0.9, 1.0, m));  // bright cores

    // faint coloured wash + a soft rim of light around the cursor
    col += cosmic * 0.04 * fbm(p * 2.0 - t);
    col += cosmic * infl * 0.12;

    // vignette keeps edges deep
    float vig = smoothstep(1.35, 0.30, length(p));
    col *= mix(0.5, 1.0, vig);

    // film grain / stardust to defeat banding, matte frosted finish
    float g = hash(vUv * uResolution.xy + fract(uTime)) * 0.05;
    col += g - 0.025;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const _dir = new THREE.Vector3();
const _pos = new THREE.Vector3();
const _prev = new THREE.Vector2();

function Backdrop({ octaves }: { octaves: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const pointer = useRef(new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));
  const pvel = useRef(0);
  const vel = useRef(0);
  const firstMove = useRef(true);

  // The canvas is pointer-events-none (so it never blocks the UI), which means
  // r3f's own pointer never updates. Track the cursor from the window instead.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
      // Snap to the cursor on the very first movement so the light appears
      // right under the pointer instead of drifting in from the centre.
      if (firstMove.current) {
        pointer.current.copy(target.current);
        firstMove.current = false;
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPointerVel: { value: 0 },
      uScroll: { value: 0 },
      uScrollVel: { value: 0 },
      uOctaves: { value: octaves },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state) => {
    const mesh = meshRef.current;
    const mat = matRef.current;
    if (!mesh || !mat) return;

    const cam = state.camera as THREE.PerspectiveCamera;
    const dist = 12;
    _dir.set(0, 0, -1).applyQuaternion(cam.quaternion);
    _pos.copy(cam.position).addScaledVector(_dir, dist);
    mesh.position.copy(_pos);
    mesh.quaternion.copy(cam.quaternion);

    const h = 2 * Math.tan((cam.fov * Math.PI) / 360) * dist;
    const w = h * (state.size.width / state.size.height);
    mesh.scale.set(w * 1.25, h * 1.25, 1);

    // damped cursor tracking (smooth lerp) + how fast it is moving
    _prev.copy(pointer.current);
    pointer.current.x += (target.current.x - pointer.current.x) * 0.10;
    pointer.current.y += (target.current.y - pointer.current.y) * 0.10;
    const moved = pointer.current.distanceTo(_prev);
    pvel.current += (Math.min(moved * 9.0, 1.0) - pvel.current) * 0.12;

    // scroll velocity, normalised + eased so it settles gracefully
    const storeVel = useExperience.getState().velocity || 0;
    const targetVel = Math.max(-1, Math.min(1, storeVel * 0.008));
    vel.current += (targetVel - vel.current) * 0.08;

    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uResolution.value.set(state.size.width, state.size.height);
    mat.uniforms.uPointer.value.copy(pointer.current);
    mat.uniforms.uPointerVel.value = pvel.current;
    mat.uniforms.uScroll.value = useExperience.getState().progress;
    mat.uniforms.uScrollVel.value = vel.current;
  });

  return (
    <mesh ref={meshRef} renderOrder={-1} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={BACKDROP_VERT}
        fragmentShader={BACKDROP_FRAG}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  Fine silver dust — monochromatic depth motes                              */
/* -------------------------------------------------------------------------- */

const PARTICLE_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aRandom;
  attribute float aScale;
  varying float vFade;

  void main() {
    vec3 pos = position;
    float t = uTime;

    pos.x += sin(t * 0.14 + pos.z * 0.12 + aRandom * 6.2831) * 0.7;
    pos.y += cos(t * 0.11 + pos.x * 0.10 + aRandom * 6.2831) * 0.55;

    float travel = t * 0.8 + uScroll * 22.0;
    float z = mod(pos.z + travel, 48.0) - 42.0;
    pos.z = z;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float dist = -mv.z;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / max(dist, 0.1));
    vFade = smoothstep(54.0, 28.0, dist) * smoothstep(1.5, 9.0, dist);
  }
`;

const PARTICLE_FRAG = /* glsl */ `
  varying float vFade;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    vec3 silver = vec3(0.80, 0.84, 0.90);
    gl_FragColor = vec4(silver, alpha * vFade * 0.4);
  }
`;

function ParticleField({ count }: { count: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, randoms, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 48;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 2] = Math.random() * -48;
      randoms[i] = Math.random();
      scales[i] = 0.4 + Math.random() * 1.1;
    }
    return { positions, randoms, scales };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uSize: { value: 24 },
      uPixelRatio: {
        value: Math.min(
          typeof window !== 'undefined' ? window.devicePixelRatio : 1,
          2
        ),
      },
    }),
    []
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    matRef.current.uniforms.uScroll.value = useExperience.getState().progress;
  });

  return (
    <points frustumCulled={false} renderOrder={1}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={PARTICLE_VERT}
        fragmentShader={PARTICLE_FRAG}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*  Camera rig — very gentle drift for particle parallax                      */
/* -------------------------------------------------------------------------- */

function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    const scroll = useExperience.getState().progress;
    const tx = state.pointer.x * 0.6;
    const ty = state.pointer.y * 0.4 + scroll * 1.0;
    camera.position.x += (tx - camera.position.x) * 0.025;
    camera.position.y += (ty - camera.position.y) * 0.025;
    camera.position.z = 14 - scroll * 3.0;
    camera.lookAt(0, 0, -14);
  });
  return null;
}

/* -------------------------------------------------------------------------- */
/*  Scene                                                                      */
/* -------------------------------------------------------------------------- */

export default function NovaScene() {
  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
    []
  );
  const prefersReduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      dpr={[1, isMobile ? 1.15 : 1.4]}
      camera={{ position: [0, 0, 14], fov: 45, near: 0.1, far: 120 }}
      frameloop={prefersReduced ? 'demand' : 'always'}
      onCreated={(state) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (w > 0 && h > 0) state.setSize(w, h);
      }}
    >
      <color attach="background" args={[OBSIDIAN]} />
      <ResizeController />

      <Suspense fallback={null}>
        <Backdrop octaves={isMobile ? 3 : 4} />
        <ParticleField count={isMobile ? 900 : 1800} />
        <CameraRig />
        {!isMobile && (
          <EffectComposer>
            <Bloom
              intensity={0.22}
              luminanceThreshold={0.72}
              luminanceSmoothing={0.5}
              mipmapBlur
              radius={0.55}
            />
            <Vignette offset={0.3} darkness={0.7} />
          </EffectComposer>
        )}
        <Preload all />
      </Suspense>

      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
