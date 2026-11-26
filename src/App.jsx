
import React, { useState, useEffect, useRef } from "react";

const ITEMS = [
  {
    name: "Cozy",
    it: "Knitwear",
    tag: "ALL SEASON",
    desc: "Soft, warm, and endlessly huggable. Layers made for slow mornings.",
    color: "#c9a77c",
    img: `${import.meta.env.BASE_URL}crazy.png`
  },
  {
    name: "The White",
    it: "Vow",
    tag: "BRIDAL",
    desc: "A capsule of lace and light. The moment you've always imagined.",
    color: "#e8e2d8",
    img: `${import.meta.env.BASE_URL}white.png`
  },
  {
    name: "Active",
    it: "Edit",
    tag: "PERFORMANCE",
    desc: "Performance pieces built to move with you. Wear them well.",
    color: "#3d5a80",
    img: `${import.meta.env.BASE_URL}active.png`
  },
  {
    name: "Evening",
    it: "Gown",
    tag: "EVENING",
    desc: "Flowing silhouettes and rich velvet. Entrance-worthy, every time.",
    color: "#1f5a3a",
    img: `${import.meta.env.BASE_URL}green.png`
  },
  {
    name: "Street",
    it: "Layers",
    tag: "URBAN",
    desc: "Easy denim and confident lines for the street ahead.",
    color: "#6f93b8",
    img: `${import.meta.env.BASE_URL}strret.png`
  }
];

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Inter:wght@400;500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.lumiere {
  --bg: #ecebe7;
  --ink: #2b2d2a;
  --card: #3a3c39;
  --cardtxt: #f4f2ee;
  --gap: 130px;
  --char-h: 56dvh;
  --char-max: 520px;
  --char-top: 48%;
  --card-w: 230px;
  --card-pad: 25px 22px;
  --card-title: 27px;
  --card-text: 11px;
  --nav-fs: 11px;
  --nav-pad: 10px 17px;
  --head-fs: 18px;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background: var(--bg);
  color: var(--ink);
  font-family: Inter, sans-serif;
  touch-action: pan-y;
}

.lumiere-header {
  position: absolute;
  top: max(25px, env(safe-area-inset-top));
  left: 30px;
  z-index: 100;
  font-family: "Cormorant Garamond", serif;
  letter-spacing: .2em;
  font-size: var(--head-fs);
}

.lumiere-stage {
  position: absolute;
  inset: 0;
}

.lumiere-glow {
  position: absolute;
  left: 50%;
  top: var(--char-top);
  width: 46vmin;
  height: 46vmin;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,.65), transparent 70%);
  filter: blur(10px);
}

.lumiere-chars {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.lumiere-char {
  position: absolute;
  left: 50%;
  top: var(--char-top);
  height: var(--char-h);
  max-height: var(--char-max);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition:
    transform .8s cubic-bezier(.22,.9,.3,1),
    opacity .6s,
    filter .6s;
  will-change: transform;
}

.lumiere-char img,
.lumiere-char svg {
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  filter: drop-shadow(0 18px 18px rgba(0,0,0,.16));
  pointer-events: none;
  -webkit-user-drag: none;
  user-select: none;
}

.lumiere-card {
  position: absolute;
  right: 5%;
  top: var(--char-top);
  width: var(--card-w);
  padding: var(--card-pad);
  border-radius: 19px;
  background: var(--card);
  color: var(--cardtxt);
  box-shadow: 0 20px 40px rgba(0,0,0,.18);
  text-align: center;
  z-index: 30;
  transform: translateY(-50%);
  transition: opacity .4s;
}

.lumiere-card.out {
  opacity: 0;
}

.lumiere-card small {
  display: block;
  font-size: 9px;
  letter-spacing: .3em;
  opacity: .55;
  margin-bottom: 14px;
}

.lumiere-card h2 {
  margin-bottom: 12px;
  font: 500 var(--card-title)/1.1 "Cormorant Garamond", serif;
}

.lumiere-card h2 em {
  display: block;
}

.lumiere-card p {
  font-size: var(--card-text);
  line-height: 1.8;
  opacity: .75;
}

.lumiere-nav {
  position: absolute;
  bottom: max(25px, env(safe-area-inset-bottom));
  left: 0;
  right: 0;
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 12px;
  z-index: 100;
}

.lumiere-nav button {
  border: 0;
  background: #fff;
  color: #555;
  font: 500 var(--nav-fs) Inter, sans-serif;
  padding: var(--nav-pad);
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
  opacity: .65;
  transition: .3s;
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;
}

.lumiere-nav button.on {
  opacity: 1;
  transform: translateY(-3px);
  box-shadow: 0 5px 14px rgba(0,0,0,.15);
}

.lumiere-dust i {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: #999;
  opacity: .4;
}

/* EXTRA LARGE SCREEN */

@media (min-width: 1600px) {
  .lumiere {
    --gap: 165px;
    --char-max: 680px;
    --card-w: 270px;
    --card-pad: 30px 26px;
    --card-title: 32px;
    --card-text: 12.5px;
    --nav-fs: 12.5px;
    --nav-pad: 12px 22px;
    --head-fs: 21px;
  }

  .lumiere-header {
    left: 48px;
    top: 34px;
  }

  .lumiere-card {
    right: 7%;
  }
}

/* SMALL LAPTOP */

@media (max-width: 1200px) {
  .lumiere {
    --gap: 105px;
    --card-w: 215px;
    --card-pad: 22px 18px;
    --card-title: 25px;
  }

  .lumiere-card {
    right: 3%;
  }
}

/* TABLET LANDSCAPE */

@media (max-width: 1000px) {
  .lumiere {
    --gap: 80px;
    --char-h: 46dvh;
    --card-w: 188px;
    --card-pad: 18px 14px;
    --card-title: 22px;
    --card-text: 10.5px;
    --nav-fs: 10.5px;
    --nav-pad: 9px 14px;
  }

  .lumiere-card {
    right: 2%;
  }

  .lumiere-header {
    left: 24px;
  }
}

/* TABLET AND MOBILE */

@media (max-width: 768px) {
  .lumiere {
    --gap: clamp(100px, 28vw, 165px);
    --char-top: 50%;
    --char-h: 34dvh;
    --char-max: 280px;
    --card-w: min(320px, 88vw);
    --card-pad: 19px 20px;
    --card-title: 25px;
    --card-text: 11px;
    --nav-fs: 10px;
    --nav-pad: 9px 13px;
    position: relative;
    inset: auto;
    width: 100%;
    height: auto;
    min-height: 100dvh;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: max(65px, calc(env(safe-area-inset-top) + 45px));
    padding-bottom: 20px;
    touch-action: pan-y;
  }

  .lumiere-header {
    position: absolute;
    top: max(18px, env(safe-area-inset-top));
    left: 20px;
    font-size: 16px;
  }

  .lumiere-stage {
    position: relative;
    inset: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }

  .lumiere-glow {
    top: 50%;
    width: 65vmin;
    height: 65vmin;
  }

  .lumiere-chars {
    position: relative;
    inset: auto;
    width: 100%;
    height: clamp(230px, 36dvh, 310px);
    flex-shrink: 0;
  }

  .lumiere-char {
    top: 50%;
    height: var(--char-h);
  }

  .lumiere-card {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    transform: none;
    width: var(--card-w);
    margin: 35px auto 0;
    padding: var(--card-pad);
    flex-shrink: 0;
  }

  .lumiere-nav {
    position: relative;
    left: auto;
    right: auto;
    bottom: auto;
    transform: none;
    width: 100%;
    max-width: 520px;
    margin: 22px auto 0;
    padding: 0 12px;
    gap: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-shrink: 0;
  }

  .lumiere-nav button {
    font-size: var(--nav-fs);
    padding: var(--nav-pad);
  }
}

/* SMALL MOBILE */

@media (max-width: 480px) {
  .lumiere {
    --gap: clamp(95px, 27vw, 125px);
    --char-h: 29dvh;
    --char-max: 230px;
    --card-w: 88vw;
    --card-pad: 16px 16px;
    --card-title: 23px;
    --card-text: 10.5px;
    --nav-fs: 9px;
    --nav-pad: 8px 10px;
    padding-top: max(60px, calc(env(safe-area-inset-top) + 42px));
    padding-bottom: 18px;
  }

  .lumiere-header {
    left: 16px;
  }

  .lumiere-chars {
    height: 32dvh;
    min-height: 210px;
  }

  .lumiere-glow {
    width: 70vmin;
    height: 70vmin;
  }

  .lumiere-card {
    margin-top: 45px;
    border-radius: 16px;
  }

  .lumiere-card small {
    margin-bottom: 9px;
  }

  .lumiere-card h2 {
    margin-bottom: 8px;
  }

  .lumiere-card p {
    line-height: 1.6;
  }

  .lumiere-nav {
    margin-top: 20px;
    padding: 0 8px;
    gap: 7px;
  }
}

/* VERY SMALL PHONES */

@media (max-width: 360px) {
  .lumiere {
    --gap: 95px;
    --char-h: 26dvh;
    --char-max: 195px;
    --card-w: 90vw;
    --card-title: 21px;
    --card-text: 10px;
    --nav-fs: 8.5px;
    --nav-pad: 7px 9px;
  }

  .lumiere-chars {
    height: 29dvh;
    min-height: 195px;
  }

  .lumiere-card {
    margin-top: 45px;
  }

  .lumiere-nav {
    gap: 6px;
    margin-top: 17px;
  }
}

/* PHONE LANDSCAPE */

@media (max-height: 520px) and (orientation: landscape) {
  .lumiere {
    --gap: 90px;
    --char-top: 50%;
    --char-h: 62dvh;
    --char-max: 280px;
    --card-w: 190px;
    --card-pad: 12px;
    --card-title: 19px;
    --card-text: 9px;
    --nav-fs: 9px;
    --nav-pad: 6px 10px;
    --head-fs: 14px;
  }

  .lumiere-header {
    top: 10px;
    left: 15px;
  }

  .lumiere-glow {
    width: 60vmin;
    height: 60vmin;
  }

  .lumiere-card {
    top: 50%;
    left: auto;
    right: 3%;
    transform: translateY(-50%);
  }

  .lumiere-card small {
    margin-bottom: 5px;
  }

  .lumiere-card h2 {
    margin-bottom: 5px;
  }

  .lumiere-card p {
    line-height: 1.4;
  }

  .lumiere-nav {
    bottom: 6px;
  }
}

/* HOVER */

@media (hover: hover) {
  .lumiere-nav button:hover {
    opacity: 1;
    transform: translateY(-3px);
    box-shadow: 0 5px 14px rgba(0,0,0,.15);
  }
}

/* REDUCED MOTION */

@media (prefers-reduced-motion: reduce) {
  .lumiere-char,
  .lumiere-card,
  .lumiere-nav button {
    transition-duration: .01s;
  }
}

/* DARK MODE */

@media (prefers-color-scheme: dark) {
  .lumiere {
    --bg: #1c1d1b;
    --ink: #eee;
    --card: #e9e7e2;
    --cardtxt: #222;
  }

  .lumiere-glow {
    background: radial-gradient(circle, rgba(255,255,255,.12), transparent 70%);
  }

  .lumiere-nav button {
    background: #2c2e2b;
    color: #ddd;
  }
}
`;

function Figure({ color }) {
  return (
    <svg viewBox="0 0 100 240" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="28" r="20" fill="#f1cfb0" />
      <path d="M30 24q20-26 40 0v8H30z" fill="#6b4630" />
      <path d="M34 54h32l16 150H18z" fill={color} />
      <rect x="38" y="200" width="9" height="34" rx="4" fill="#d9b898" />
      <rect x="53" y="200" width="9" height="34" rx="4" fill="#d9b898" />
    </svg>
  );
}

export default function App() {
  const [cur, setCur] = useState(0);
  const [busy, setBusy] = useState(false);
  const [cardOut, setCardOut] = useState(false);

  const timer = useRef(null);
  const touchStart = useRef(null);

  const [dust] = useState(() =>
    Array.from({ length: 28 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100
    }))
  );

  const go = (index) => {
    if (index === cur || busy) return;

    clearTimeout(timer.current);
    setBusy(true);
    setCardOut(true);
    setCur(index);

    timer.current = setTimeout(() => {
      setCardOut(false);
      setBusy(false);
    }, 420);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        go((cur + 1) % ITEMS.length);
      }

      if (e.key === "ArrowLeft") {
        go((cur - 1 + ITEMS.length) % ITEMS.length);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [cur, busy]);

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  const current = ITEMS[cur];
  const half = Math.floor(ITEMS.length / 2);

  return (
    <>
      <style>{styles}</style>

      <main
        className="lumiere"
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStart.current === null) return;

          const dx = e.changedTouches[0].clientX - touchStart.current;

          if (Math.abs(dx) > 50) {
            go(
              (cur + (dx < 0 ? 1 : -1) + ITEMS.length) % ITEMS.length
            );
          }

          touchStart.current = null;
        }}
      >
        <header className="lumiere-header">
          LUMIÈRE
        </header>

        <div className="lumiere-dust">
          {dust.map((p, i) => (
            <i
              key={i}
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`
              }}
            />
          ))}
        </div>

        <section className="lumiere-stage">
          <div className="lumiere-glow" />

          <div className="lumiere-chars">
            {ITEMS.map((item, i) => {
              const offset =
                ((i - cur + ITEMS.length + half) % ITEMS.length) - half;

              const distance = Math.abs(offset);

              const scale =
                distance === 0 ? 1 :
                distance === 1 ? 0.48 : 0.36;

              return (
                <div
                  key={item.name}
                  className="lumiere-char"
                  onClick={() => go(i)}
                  style={{
                    transform: `translate(-50%, -50%) translateX(calc(var(--gap) * ${offset})) scale(${scale})`,
                    opacity:
                      distance === 0 ? 1 :
                      distance === 1 ? 0.9 : 0.6,
                    zIndex: 10 - distance
                  }}
                >
                  {item.img ? (
                    <img
                      src={item.img}
                      alt={`${item.name} ${item.it}`}
                      draggable="false"
                    />
                  ) : (
                    <Figure color={item.color} />
                  )}
                </div>
              );
            })}
          </div>

          <div className={`lumiere-card ${cardOut ? "out" : ""}`}>
            <small>{current.tag}</small>

            <h2>
              {current.name}
              <em>{current.it}</em>
            </h2>

            <p>{current.desc}</p>
          </div>
        </section>

        <nav className="lumiere-nav">
          {ITEMS.map((item, i) => (
            <button
              key={item.name}
              className={cur === i ? "on" : ""}
              onClick={() => go(i)}
            >
              {item.name} {item.it}
            </button>
          ))}
        </nav>
      </main>
    </>
  );
}
