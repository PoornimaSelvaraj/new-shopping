
import React, { useEffect, useState } from "react";

const MODELS = [
  { id: "black", image: `${import.meta.env.BASE_URL}blackdress.png` },
  { id: "cream", image: `${import.meta.env.BASE_URL}creamdress.png` },
  { id: "blue", image: `${import.meta.env.BASE_URL}bluedress.png` },
  { id: "cream-2", image: `${import.meta.env.BASE_URL}creamdress.png` },
];

const COLLECTIONS = [
  {
    title: "AUTUMN WINTER",
    description:
      "Elevate your everyday style with our latest collection. Discover the perfect blend of modern fashion and timeless elegance.",
    products: [
      {
        name: "LEATHER TOTE BAG",
        price: "$145.00",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop",
      },
      {
        name: "PREMIUM COSMETICS SET",
        price: "$99.00",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop",
      },
      {
        name: "GOLD CHAIN NECKLACE",
        price: "$120.00",
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&auto=format&fit=crop",
      },
    ],
  },
  {
    title: "WINTER COLLECTION",
    description:
      "Stay ahead of the trend with our premium winter collection. Find styles that make every moment special.",
    products: [
      {
        name: "DESIGNER TOTE BAG",
        price: "$160.00",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&auto=format&fit=crop",
      },
      {
        name: "EVENING GOWN",
        price: "$180.00",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop",
      },
      {
        name: "CLASSIC HEELS",
        price: "$110.00",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop",
      },
    ],
  },
  {
    title: "SPRING SUMMER",
    description:
      "Picture-perfect and effortlessly stylish. Discover fresh designs made for your everyday moments.",
    products: [
      {
        name: "RUFFLED ROSETTE TOP",
        price: "$75.00",
        image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=500&auto=format&fit=crop",
      },
      {
        name: "SNAPSHOT CAMERA BAG",
        price: "$145.00",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop",
      },
      {
        name: "CHARM NECKLACE",
        price: "$65.00",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop",
      },
    ],
  },
];

const POSITIONS = [
  "model-front",
  "model-back-1",
  "model-back-2",
  "model-ghost",
];

export default function App() {
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [paused]);

  const step = tick % COLLECTIONS.length;
  const collection = COLLECTIONS[step];

  const goToCollection = (index) => {
    setTick(
      (t) =>
        t +
        ((index - (t % COLLECTIONS.length) + COLLECTIONS.length) %
          COLLECTIONS.length)
    );
    setPaused(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          width: 100%;
          min-height: 100%;
          scroll-behavior: smooth;
        }

        body {
          width: 100%;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          background: #c69a70;
        }

        #root {
          width: 100%;
          min-height: 100vh;
        }

        .page {
          width: 100%;
          min-height: 100vh;
          background: #c69a70;
          overflow: hidden;
        }

        .hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 210px;
          width: 100%;
          min-height: 100vh;
          background: #f9fafb;
        }

        .stage {
          position: relative;
          min-width: 0;
          height: 100vh;
          min-height: 570px;
          overflow: hidden;
          background: linear-gradient(110deg, #fbfcfd, #edf2f6);
        }

        .stage-content {
          position: absolute;
          top: 75px;
          left: 5%;
          width: 290px;
          max-width: 42%;
          z-index: 8;
        }

        .stage-content h1 {
          font-size: clamp(25px, 3vw, 42px);
          font-weight: 400;
          letter-spacing: 3px;
          color: #92969c;
          line-height: 1.2;
        }

        .stage-content p {
          margin-top: 12px;
          font-size: 11px;
          line-height: 1.8;
          color: #999da2;
          max-width: 260px;
        }

        .models {
          position: absolute;
          inset: 0;
        }

        .bg-model {
          position: absolute;
          bottom: 0;
          width: 30%;
          height: 78%;
          object-fit: contain;
          object-position: bottom center;
          transition:
            right 1.1s ease-in-out,
            height 1.1s ease-in-out,
            opacity 1.1s ease-in-out,
            filter 1.1s ease-in-out;
          will-change: right, height, filter, opacity;
          pointer-events: none;
          user-select: none;
        }

        .model-front {
          right: 3%;
          height: 83%;
          z-index: 4;
          opacity: 1;
          filter: none;
        }

        .model-back-1 {
          right: 23%;
          height: 75%;
          z-index: 3;
          opacity: .9;
          filter: blur(.5px);
        }

        .model-back-2 {
          right: 43%;
          height: 66%;
          z-index: 2;
          opacity: .68;
          filter: blur(1.5px);
        }

        .model-ghost {
          right: 63%;
          height: 58%;
          z-index: 1;
          opacity: .28;
          filter: blur(2.5px);
        }

        .bg-model.entering {
          transition: none;
          animation: modelEnter 1.1s ease-out;
        }

        @keyframes modelEnter {
          from {
            opacity: 0;
            transform: translateX(60px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .stage-controls {
          position: absolute;
          bottom: 25px;
          left: 5%;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pause-button {
          width: 35px;
          height: 35px;
          border: 1px solid #a5a9ad;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          color: #555;
        }

        .stage-controls span {
          font-size: 10px;
          letter-spacing: 2px;
          color: #777;
        }

        .sidebar {
          width: 100%;
          min-height: 100vh;
          background: white;
          padding: 30px 15px;
          border-left: 1px solid #eee;
        }

        .side-title {
          font-size: 10px;
          letter-spacing: 2px;
          color: #a19a94;
          margin-bottom: 25px;
        }

        .product {
          padding: 15px 0 20px;
          border-bottom: 1px solid #eee;
        }

        .product-image {
          width: 100%;
          height: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background: #f7f5f2;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .4s ease;
        }

        .product:hover .product-image img {
          transform: scale(1.07);
        }

        .product h3 {
          margin-top: 10px;
          font-size: 9px;
          font-weight: 600;
          color: #555;
          letter-spacing: .5px;
        }

        .product p {
          margin-top: 6px;
          font-size: 10px;
          color: #aaa;
        }

        .collection-footer {
          width: 100%;
          min-height: 75px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 18px;
          padding: 20px 10px;
          flex-wrap: wrap;
        }

        .collection-dot {
          width: 9px;
          height: 9px;
          flex-shrink: 0;
          border: none;
          border-radius: 50%;
          background: #e5c9ad;
          cursor: pointer;
          transition: .3s;
        }

        .collection-dot.active {
          background: #fff;
          transform: scale(1.5);
        }

        .collection-label {
          color: white;
          font-size: 11px;
          letter-spacing: 3px;
          margin-left: 8px;
        }

        @media (min-width: 1400px) {
          .hero {
            grid-template-columns: minmax(0, 1fr) 250px;
          }

          .stage-content {
            top: 100px;
          }

          .bg-model {
            width: 29%;
          }

          .model-front {
            height: 88%;
          }

          .model-back-1 {
            height: 78%;
          }

          .model-back-2 {
            height: 68%;
          }

          .model-ghost {
            height: 60%;
          }

          .sidebar {
            padding: 35px 18px;
          }

          .product-image {
            height: 180px;
          }
        }

        @media (max-width: 1100px) {
          .hero {
            grid-template-columns: minmax(0, 1fr) 180px;
          }

          .stage-content {
            left: 4%;
            max-width: 38%;
          }

          .bg-model {
            width: 33%;
          }

          .model-front {
            right: 1%;
          }

          .model-back-1 {
            right: 22%;
          }

          .model-back-2 {
            right: 43%;
          }

          .model-ghost {
            right: 64%;
          }

          .product-image {
            height: 120px;
          }
        }

        @media (max-width: 768px) {
          .hero {
            grid-template-columns: minmax(0, 1fr) 155px;
            min-height: 100vh;
          }

          .stage {
            height: 100vh;
            min-height: 550px;
          }

          .stage-content {
            top: 65px;
            left: 20px;
            width: 230px;
            max-width: 40%;
          }

          .stage-content h1 {
            font-size: 27px;
          }

          .stage-content p {
            font-size: 9px;
          }

          .bg-model {
            width: 37%;
          }

          .model-front {
            right: 0;
            height: 77%;
          }

          .model-back-1 {
            right: 20%;
            height: 69%;
          }

          .model-back-2 {
            right: 40%;
            height: 60%;
          }

          .model-ghost {
            right: 60%;
            height: 53%;
          }

          .sidebar {
            padding: 20px 10px;
          }

          .product-image {
            height: 100px;
          }
        }

        @media (max-width: 600px) {
          .hero {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          .stage {
            width: 100%;
            height: 85vh;
            min-height: 480px;
            max-height: 700px;
          }

          .stage-content {
            top: 35px;
            left: 18px;
            width: 210px;
            max-width: 55%;
          }

          .stage-content h1 {
            font-size: 25px;
            letter-spacing: 2px;
          }

          .stage-content p {
            max-width: 190px;
            font-size: 9px;
          }

          .bg-model {
            width: 43%;
            height: 70%;
          }

          .model-front {
            right: 0;
            height: 76%;
          }

          .model-back-1 {
            right: 19%;
            height: 66%;
          }

          .model-back-2 {
            right: 38%;
            height: 57%;
          }

          .model-ghost {
            right: 57%;
            height: 49%;
          }

          .stage-controls {
            left: 15px;
            bottom: 15px;
            gap: 8px;
          }

          .stage-controls span {
            font-size: 8px;
            letter-spacing: 1px;
          }

          .sidebar {
            min-height: auto;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
            padding: 22px 12px;
            border-left: none;
            border-top: 1px solid #eee;
          }

          .side-title {
            grid-column: 1 / -1;
            margin-bottom: 0;
          }

          .product {
            min-width: 0;
            padding: 0 0 12px;
          }

          .product-image {
            height: 115px;
          }

          .product h3 {
            font-size: 8px;
            line-height: 1.5;
          }

          .product p {
            font-size: 9px;
          }

          .collection-footer {
            gap: 14px;
            padding: 20px 5px;
          }

          .collection-label {
            font-size: 9px;
            letter-spacing: 2px;
          }
        }

        @media (max-width: 380px) {
          .stage {
            height: 75vh;
            min-height: 430px;
          }

          .stage-content {
            top: 25px;
            left: 12px;
            max-width: 58%;
          }

          .stage-content h1 {
            font-size: 21px;
          }

          .stage-content p {
            font-size: 8px;
          }

          .bg-model {
            width: 46%;
          }

          .model-front {
            height: 73%;
          }

          .model-back-1 {
            right: 19%;
            height: 64%;
          }

          .model-back-2 {
            right: 38%;
            height: 55%;
          }

          .model-ghost {
            right: 57%;
            height: 47%;
          }

          .product-image {
            height: 90px;
          }

          .product h3 {
            font-size: 7px;
          }

          .collection-footer {
            gap: 11px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bg-model,
          .bg-model.entering {
            transition: none;
            animation: none;
          }
        }
      `}</style>

      <main className="page">
        <section className="hero">
          <div className="stage">
            <div className="stage-content">
              <h1>{collection.title}</h1>
              <p>{collection.description}</p>
            </div>

            <div className="models">
              {POSITIONS.map((_, index) => {
                const model = MODELS[index];
                const slot = (index + tick) % POSITIONS.length;
                const entering = slot === 0 && tick > 0;

                return (
                  <img
                    key={`${model.id}-${index}`}
                    src={model.image}
                    alt={`${model.id} dress model`}
                    className={`bg-model ${POSITIONS[slot]} ${
                      entering ? "entering" : ""
                    }`}
                    draggable="false"
                  />
                );
              })}
            </div>

            <div className="stage-controls">
              <button
                className="pause-button"
                onClick={() => setPaused((prev) => !prev)}
                aria-label={paused ? "Play animation" : "Pause animation"}
              >
                {paused ? "▶" : "Ⅱ"}
              </button>

              <span>
                {paused ? "ANIMATION PAUSED" : "NEW SEASON COLLECTION"}
              </span>
            </div>
          </div>

          <aside className="sidebar">
            <div className="side-title">FEATURED ITEMS</div>

            {collection.products.map((product) => (
              <div className="product" key={product.name}>
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                </div>

                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            ))}
          </aside>
        </section>

        <div className="collection-footer">
          {COLLECTIONS.map((item, index) => (
            <button
              key={item.title}
              className={`collection-dot ${
                step === index ? "active" : ""
              }`}
              onClick={() => goToCollection(index)}
              aria-label={`Show ${item.title}`}
            />
          ))}

          <span className="collection-label">{collection.title}</span>
        </div>
      </main>
    </>
  );
}
