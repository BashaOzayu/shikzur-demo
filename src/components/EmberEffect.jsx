import { useEffect, useRef } from "react";

export default function EmberEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let embers = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function createEmber() {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 20,
        size: Math.random() * 3 + 1,
        speedY: -(Math.random() * 2.5 + 1),
        speedX: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.8 + 0.2,
        flicker: Math.random() * 0.05 + 0.01,
        hue: Math.floor(Math.random() * 30 + 10),
        life: 1,
        decay: Math.random() * 0.004 + 0.002,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.05 + 0.02,
      };
    }

    // Seed with lots of embers
    for (let i = 0; i < 120; i++) {
      const e = createEmber();
      e.y = Math.random() * canvas.height;
      e.life = Math.random();
      embers.push(e);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new embers
      if (embers.length < 200) {
        for (let i = 0; i < 3; i++) {
          embers.push(createEmber());
        }
      }

      embers.forEach((e, index) => {
        e.life -= e.decay;
        e.y += e.speedY;
        e.wobble += e.wobbleSpeed;
        e.x += e.speedX + Math.sin(e.wobble) * 0.4;
        e.opacity = e.life * 0.9;

        if (e.life <= 0 || e.y < -10) {
          embers[index] = createEmber();
          return;
        }

        // Glow effect
        const gradient = ctx.createRadialGradient(
          e.x,
          e.y,
          0,
          e.x,
          e.y,
          e.size * 3
        );
        gradient.addColorStop(0, `hsla(${e.hue}, 100%, 75%, ${e.opacity})`);
        gradient.addColorStop(
          0.4,
          `hsla(${e.hue}, 100%, 55%, ${e.opacity * 0.6})`
        );
        gradient.addColorStop(1, `hsla(${e.hue}, 100%, 40%, 0)`);

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(40, 100%, 90%, ${e.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
}
