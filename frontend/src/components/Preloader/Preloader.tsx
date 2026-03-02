"use client";

import { useEffect, useState } from "react";
import "./Preloader.css";

interface Props {
  finishLoading: () => void;
}

export default function Preloader({
  finishLoading,
}: Props) {
  const [percentage, setPercentage] =
    useState(0);
  const [fadeOut, setFadeOut] =
    useState(false);

  const logoUrl =
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(2).svg?tr=w-300";

  const imagesToPreload = [
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/le-quan-fPVWpK85oLk-unsplash.jpg?tr=w-1920,f-webp,q-90",
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/macro-jr-jfw8TSvSMp0-unsplash.jpg?tr=w-1600,f-webp,q-80",
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg?tr=w-1600,f-webp,q-80",
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg?tr=w-1600,f-webp,q-80",
  ];

  useEffect(() => {
    const hasLoadedBefore =
      localStorage.getItem(
        "inhaus_preloader_done"
      );

    if (hasLoadedBefore) {
      finishLoading();
      return;
    }

    let isMounted = true;
    let imagesLoaded = false;

    // 🔥 1. Fake smooth progress até 90%
    const progressInterval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 90) return 90;
        return prev + 1;
      });
    }, 25); // velocidade da barra

    // 🔥 2. Carrega imagens em paralelo
    const preloadImages = async () => {
      await Promise.all(
        imagesToPreload.map(
          (src) =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.src = src;

              if (img.complete) {
                resolve();
              } else {
                img.onload = () => resolve();
                img.onerror = () => resolve();
              }
            })
        )
      );

      imagesLoaded = true;
    };

    preloadImages();

    // 🔥 3. Quando imagens carregarem → finalizar
    const checkCompletion = setInterval(() => {
      if (imagesLoaded) {
        clearInterval(progressInterval);
        clearInterval(checkCompletion);

        setPercentage(100);

        setTimeout(() => {
          setFadeOut(true);

          setTimeout(() => {
            if (!isMounted) return;

            document.body.classList.add(
              "site-loaded"
            );

            localStorage.setItem(
              "inhaus_preloader_done",
              "true"
            );

            finishLoading();
          }, 700);
        }, 400);
      }
    }, 100);

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
      clearInterval(checkCompletion);
    };
  }, [finishLoading]);

  return (
    <div
      className={`preloader ${
        fadeOut ? "preloader--fade" : ""
      }`}
    >
      <div className="preloader__content">
        <div className="preloader__logo-container">
          <img
            src={logoUrl}
            alt="Inhaus Logo"
            className="preloader__logo-img"
            loading="eager"
          />
        </div>

        <div className="preloader__bar-container">
          <div
            className="preloader__bar"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <div className="preloader__text">
          {percentage}%
        </div>
      </div>
    </div>
  );
}