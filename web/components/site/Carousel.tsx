"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import type { Img } from "@/lib/site";

export function Carousel({ images, id }: { images: Img[]; id: string }) {
  const [ref, api] = useEmblaCarousel({ loop: images.length > 2, align: "start", dragFree: false, skipSnaps: false });
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!api) return;
    const on = () => setI(api.selectedScrollSnap());
    api.on("select", on);
    on();
    return () => {
      api.off("select", on);
    };
  }, [api]);
  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);
  if (!images.length) return null;
  return (
    <div className="carousel group relative" aria-roledescription="karuzela" id={id}>
      <div ref={ref} className="overflow-hidden">
        <div className="flex touch-pan-y gap-4">
          {images.map((im, k) => (
            <figure key={im.src + k} className="min-w-0 shrink-0 basis-[85%] sm:basis-[62%] lg:basis-[46%]">
              <div className="aspect-[4/3] overflow-hidden bg-line">
                <img src={im.src} alt={im.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.01]" />
              </div>
              <figcaption className="mt-2 flex gap-3 text-xs text-muted">
                <span className="runner text-accent">{String(k + 1).padStart(2, "0")}</span>
                <span>{im.alt}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1">
          {images.map((_, k) => (
            <button key={k} type="button" aria-label={`Slajd ${k + 1}`} onClick={() => api?.scrollTo(k)} className={`h-px w-6 transition-colors ${k === i ? "bg-accent" : "bg-line"}`} />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={prev} aria-label="Poprzedni" className="h-10 w-10 border border-line transition-colors hover:border-accent hover:text-accent">←</button>
          <button type="button" onClick={next} aria-label="Następny" className="h-10 w-10 border border-line transition-colors hover:border-accent hover:text-accent">→</button>
        </div>
      </div>
    </div>
  );
}
