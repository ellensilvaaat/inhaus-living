"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import "./FeedbackSectionStatic.css";
import ReviewViewModal from "@/components/Home/FeedbackSection/ReviewViewModal";
import reviewsLocal from "@/content/reviews/reviews.cleaned.json";

interface Review {
  id?: number;
  name: string;
  text?: string;
  rating?: string;
  stars?: number;
  created_at?: string;
  date?: string;
}

function normalizeStars(review: Review) {
  if (review.stars) return review.stars;

  if (review.rating) {
    const match = review.rating.match(/\d/);
    return match ? Number(match[0]) : 0;
  }

  return 0;
}

function getShortText(text: string, max = 160) {
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, max) + "…";
}

function parseRelativeDate(str?: string) {
  if (!str) return new Date(0);

  const now = new Date();

  const match = str.match(
    /(\d+)\s+(second|minute|hour|day|week|month|year)s?\s+ago/i
  );

  if (match) {
    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    const multiplier: Record<string, number> = {
      second: 1000,
      minute: 60 * 1000,
      hour: 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      year: 365 * 24 * 60 * 60 * 1000,
    };

    return new Date(now.getTime() - value * (multiplier[unit] || 0));
  }

  const parsed = Date.parse(str);
  return isNaN(parsed) ? new Date(0) : new Date(parsed);
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function FeedbackSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewReview, setViewReview] = useState<Review | null>(null);
  const [sortOrder, setSortOrder] = useState("recent");
  const [feedbacks, setFeedbacks] = useState<Review[]>([]);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_BASE}/api/feedbacks`;

  // 🔥 Fetch backend feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(BACKEND_URL);
        const data = await res.json();
        if (data.success) setFeedbacks(data.feedbacks);
      } catch (err) {
        console.error(
          "❌ Error loading feedbacks (Server might be sleeping):",
          err
        );
      }
    };

    const timer = setTimeout(fetchFeedbacks, 500);
    return () => clearTimeout(timer);
  }, [BACKEND_URL]);


  // 🔥 Combine backend + local JSON
  const sortedReviews = useMemo(() => {
    const combined: Review[] = [...feedbacks, ...(reviewsLocal as Review[])];

    return combined.sort((a, b) => {
      const dateA = parseRelativeDate(a.created_at || a.date);
      const dateB = parseRelativeDate(b.created_at || b.date);

      return sortOrder === "recent"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });
  }, [sortOrder, feedbacks]);

  const scrollLeft = () => {
    trackRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    trackRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  // ✅ Scroll-driven premium parallax (CSS var --scroll on section)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;

        // progress = 0 when section bottom above viewport top
        // progress = 1 when section top below viewport bottom
        const total = rect.height + vh;
        const traveled = vh - rect.top;
        const progress = clamp01(traveled / total);

        el.style.setProperty("--scroll", String(progress));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // ✅ Scroll reveal / stagger
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduceMotion) {
      root.querySelectorAll("[data-reveal]").forEach((node) => {
        (node as HTMLElement).classList.add("is-inview");
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add("is-inview");
            io.unobserve(target);
          }
        }
      },
      { threshold: 0.12 }
    );

    root.querySelectorAll("[data-reveal]").forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [sortedReviews.length]);

  return (
    <section className="feedback-section" ref={sectionRef}>
      <div className="feedback-shell">
        <header className="feedback-header">
          <div className="feedback-header__copy">
            <h2 className="feedback-title" data-reveal>
              What people say
            </h2>

            <p className="feedback-subtitle" data-reveal>
              Discover what our clients say about their experience with Inhaus
              Living.
            </p>
          </div>

          <div className="feedback-filter" data-reveal>
            <label htmlFor="feedback-sort" className="sr-only">
              Sort reviews
            </label>

            <select
              id="feedback-sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="recent">Most recent</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </header>

        <div className="feedback-carousel" data-reveal>
          <button
            className="feedback-arrow feedback-arrow--left"
            onClick={scrollLeft}
            aria-label="Scroll left"
            type="button"
          >
            <span aria-hidden>‹</span>
          </button>

          <div className="feedback-track" ref={trackRef} role="list">
            {sortedReviews.map((f, index) => {
              const stars = normalizeStars(f);
              const fullText = f.text ?? "";

              return (
                <article
                  key={f.id ?? `${f.name}-${index}`}
                  className="feedback-card"
                  role="listitem"
                  tabIndex={0}
                  data-reveal
                  style={{ ["--i" as any]: index }}
                  onClick={() => setViewReview(f)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setViewReview(f);
                    }
                  }}
                  aria-label={`Review by ${f.name}`}
                >
                  <div className="feedback-card__top">
                    <h3 className="feedback-card__name">{f.name}</h3>

                    <div
                      className="feedback-card__stars"
                      aria-label={`${stars} stars`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < stars ? "star star--on" : "star star--off"
                          }
                          aria-hidden
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="feedback-card__comment">
                    {getShortText(fullText)}
                  </p>

                  <div className="feedback-card__hint" aria-hidden>
                    Tap to expand
                  </div>

                </article>
              );
            })}
          </div>

          <button
            className="feedback-arrow feedback-arrow--right"
            onClick={scrollRight}
            aria-label="Scroll right"
            type="button"
          >
            <span aria-hidden>›</span>
          </button>
        </div>

        <div className="feedback-cta" data-reveal>
        </div>

        {viewReview && (
          <ReviewViewModal
            review={viewReview}
            onClose={() => setViewReview(null)}
          />
        )}
      </div>
    </section>
  );
}