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

export default function FeedbackSection() {
  const [viewReview, setViewReview] = useState<Review | null>(null);
  const [sortOrder, setSortOrder] = useState("recent");
  const [feedbacks, setFeedbacks] = useState<Review[]>([]);
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
        console.error("Error loading feedbacks:", err);
      }
    };

    fetchFeedbacks();
  }, [BACKEND_URL]);

  // 🔥 Combine backend + local JSON
  const sortedReviews = useMemo(() => {
    const combined: Review[] = [
      ...feedbacks,
      ...(reviewsLocal as Review[]),
    ];

    return combined.sort((a, b) => {
      const dateA = parseRelativeDate(a.created_at || a.date);
      const dateB = parseRelativeDate(b.created_at || b.date);

      return sortOrder === "recent"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });
  }, [sortOrder, feedbacks]);

  const scrollLeft = () => {
    trackRef.current?.scrollBy({ left: -360, behavior: "smooth" });
  };

  const scrollRight = () => {
    trackRef.current?.scrollBy({ left: 360, behavior: "smooth" });
  };

  return (
    <section className="feedback-section">
      <h2 className="feedback-section__title">
        Trusted by Homeowners Across Australia
      </h2>

      <p className="feedback-section__subtitle">
        Discover what our clients say about their renovation experience with Inhaus Living.
      </p>

      <div className="feedback-section__filter">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="recent">Most recent</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <div className="feedback-section__carousel">
        <button
          className="feedback-section__arrow feedback-section__arrow--left"
          onClick={scrollLeft}
        >
          ‹
        </button>

        <div className="feedback-section__track" ref={trackRef}>
          {sortedReviews.map((f, index) => {
            const stars = normalizeStars(f);
            const fullText = f.text ?? "";

            return (
              <div
                key={f.id ?? `${f.name}-${index}`}
                className="feedback-card"
                onClick={() => setViewReview(f)}
              >
                <h3 className="feedback-card__name">{f.name}</h3>

                <div className="feedback-card__stars">
                  {Array.from({ length: stars }).map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>

                <p className="feedback-card__comment">
                  {getShortText(fullText)}
                </p>
              </div>
            );
          })}
        </div>

        <button
          className="feedback-section__arrow feedback-section__arrow--right"
          onClick={scrollRight}
        >
          ›
        </button>
      </div>

      {viewReview && (
        <ReviewViewModal
          review={viewReview}
          onClose={() => setViewReview(null)}
        />
      )}
    </section>
  );
}