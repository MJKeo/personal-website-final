import { useEffect, useRef } from 'react';
import './ParticleField.css';

/**
 * ParticleField — a generic, decorative canvas layer of free-floating particles
 * that drift gently, scatter away from the cursor, and are pulled *toward* it
 * (gravity) while the pointer is held down.
 *
 * Purely presentational and non-interactive (`pointer-events: none`). Drop it in
 * as an absolutely-positioned first child of any `position: relative` container
 * to layer it *behind* that container's content; the field fills and is clipped
 * to its parent, so particles stay within whatever region you size the parent to.
 *
 * @param {object} props
 * @param {'off'|'circle'|'square'|'star'|'image'} [props.shape='off']
 *        Which particle to render. `off` renders nothing and stops the animation.
 * @param {string} [props.imageSrc]    Image URL used when `shape === 'image'`.
 * @param {number} [props.imageScale=2.6]  Size multiplier for image particles
 *        (images read smaller than solid shapes, so they're scaled up).
 * @param {number} [props.count=70]    Minimum particle count (floor); the actual
 *        count scales up with the field's area — see `areaPerParticle`.
 * @param {number} [props.areaPerParticle=18500]  Target px² of field area per
 *        particle. Lower = denser. The seeded count is the larger of this and
 *        `count`.
 * @param {string} [props.color]       Fill color; defaults to the CSS
 *        `--particle-color` custom property, so it themes itself.
 * @param {number} [props.minSize=6]   Smallest particle size in px.
 * @param {number} [props.maxSize=18]  Largest particle size in px.
 * @param {number} [props.repelRadius=120]    Hover scatter radius in px.
 * @param {number} [props.repelStrength=1.1]  Hover scatter strength.
 * @param {number} [props.gravityRadius=420]   Pull-in radius while pressed, in px.
 * @param {number} [props.gravityStrength=0.7] Pull-in strength while pressed.
 * @param {string} [props.className='']
 */
function ParticleField({
  shape = 'off',
  imageSrc,
  imageScale = 2.6,
  count = 70,
  areaPerParticle = 18500,
  color,
  minSize = 6,
  maxSize = 18,
  repelRadius = 120,
  repelStrength = 1.1,
  gravityRadius = 420,
  gravityStrength = 0.7,
  className = '',
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false, pressed: false });
  const sizeRef = useRef({ w: 0, h: 0 });
  const shapeRef = useRef(shape);
  const colorRef = useRef(color);
  const imageRef = useRef(null);
  const reducedRef = useRef(false);

  // --- one-time setup: sizing, particle seeding, pointer + resize listeners ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    const rand = (min, max) => min + Math.random() * (max - min);

    // Resolve the fill color through CSS so it tracks the theme (incl. dark mode):
    // canvas inherits `color` from --particle-color, and computed `color` is
    // always a fully-resolved rgb() string.
    const readColor = () => color || getComputedStyle(canvas).color || '#4c6f3d';

    const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    const colorMQ = window.matchMedia('(prefers-color-scheme: dark)');
    reducedRef.current = reduceMQ.matches;

    function seed() {
      const { w, h } = sizeRef.current;
      const moving = !reducedRef.current;
      const target = Math.max(count, Math.round((w * h) / areaPerParticle));
      particlesRef.current = Array.from({ length: target }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = moving ? rand(0.12, 0.5) : 0;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          size: rand(minSize, maxSize),
          bvx: Math.cos(angle) * speed, // gentle base drift the particle eases back to
          bvy: Math.sin(angle) * speed,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: Math.random() * Math.PI * 2,
          vrot: moving ? rand(-0.01, 0.01) : 0,
          alpha: rand(0.25, 0.7),
        };
      });
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const prevW = sizeRef.current.w;
      const dpr = window.devicePixelRatio || 1;
      sizeRef.current = { w: rect.width, h: rect.height };
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      colorRef.current = readColor();
      // (Re)seed on first real measurement; keep particles across later resizes.
      if (particlesRef.current.length === 0 || (prevW === 0 && rect.width > 0)) seed();
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function onMove(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const p = pointerRef.current;
      p.x = x;
      p.y = y;
      p.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    }
    const onMouseMove = (e) => onMove(e.clientX, e.clientY);
    const onTouchMove = (e) => e.touches[0] && onMove(e.touches[0].clientX, e.touches[0].clientY);
    const onDown = () => { pointerRef.current.pressed = true; };
    const onUp = () => { pointerRef.current.pressed = false; };
    const onTouchStart = (e) => {
      pointerRef.current.pressed = true;
      if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => {
      const p = pointerRef.current;
      p.pressed = false;
      p.active = false;
    };
    const onLeave = () => { pointerRef.current.active = false; };
    const onBlur = () => {
      const p = pointerRef.current;
      p.active = false;
      p.pressed = false;
    };
    const onReduce = () => { reducedRef.current = reduceMQ.matches; seed(); };
    const onColor = () => { colorRef.current = readColor(); };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('mouseout', onLeave, { passive: true });
    window.addEventListener('blur', onBlur);
    reduceMQ.addEventListener?.('change', onReduce);
    colorMQ.addEventListener?.('change', onColor);

    return () => {
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('blur', onBlur);
      reduceMQ.removeEventListener?.('change', onReduce);
      colorMQ.removeEventListener?.('change', onColor);
      cancelAnimationFrame(rafRef.current);
    };
  }, [count, areaPerParticle, minSize, maxSize, color]);

  // --- animation: runs only while a shape is selected (idle when 'off') -------
  useEffect(() => {
    shapeRef.current = shape;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    if (shape === 'image' && imageSrc) {
      const img = new Image();
      img.onload = () => { imageRef.current = img; };
      img.src = imageSrc;
    }

    if (shape === 'off') {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return undefined;
    }

    function draw(p) {
      const s = p.size;
      switch (shapeRef.current) {
        case 'square':
          ctx.fillRect(-s / 2, -s / 2, s, s);
          break;
        case 'star':
          drawStar(ctx, s / 2);
          ctx.fill();
          break;
        case 'image': {
          if (!imageRef.current) break;
          const is = s * imageScale;
          ctx.drawImage(imageRef.current, -is / 2, -is / 2, is, is);
          break;
        }
        case 'circle':
        default:
          ctx.beginPath();
          ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
          ctx.fill();
      }
    }

    function frame() {
      const { w, h } = sizeRef.current;
      const ptr = pointerRef.current;
      const isImage = shapeRef.current === 'image';
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = colorRef.current;

      for (const p of particlesRef.current) {
        if (ptr.active) {
          const dx = p.x - ptr.x;
          const dy = p.y - ptr.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          if (ptr.pressed) {
            // hold to pull particles toward the cursor (gravity)
            if (dist < gravityRadius) {
              const force = (1 - dist / gravityRadius) * gravityStrength;
              p.vx -= (dx / dist) * force;
              p.vy -= (dy / dist) * force;
            }
          } else if (dist < repelRadius) {
            // hover to push particles away
            const force = (1 - dist / repelRadius) * repelStrength;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }
        // ease velocity back toward the gentle base drift after any cursor push
        p.vx += (p.bvx - p.vx) * 0.03;
        p.vy += (p.bvy - p.vy) * 0.03;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;

        // wrap around the edges with a margin so particles re-enter smoothly
        const m = p.size;
        if (p.x < -m) p.x = w + m;
        else if (p.x > w + m) p.x = -m;
        if (p.y < -m) p.y = h + m;
        else if (p.y > h + m) p.y = -m;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = isImage ? Math.min(1, p.alpha + 0.3) : p.alpha;
        draw(p);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(frame);
    }

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [shape, imageSrc, imageScale, repelRadius, repelStrength, gravityRadius, gravityStrength]);

  return (
    <div className={`particle-field${className ? ` ${className}` : ''}`} aria-hidden="true">
      <canvas ref={canvasRef} className="particle-field__canvas" />
    </div>
  );
}

/** Trace a five-point star centered at the origin, `outer` = outer radius. */
function drawStar(ctx, outer) {
  const inner = outer * 0.45;
  const spikes = 5;
  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i += 1) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / spikes) * i - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

export default ParticleField;
