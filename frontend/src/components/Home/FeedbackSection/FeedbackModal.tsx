"use client";

import { useState, FormEvent } from "react";
import "./FeedbackModal.css";

interface Feedback {
  id: number;
  name: string;
  stars: number;
  comment: string;
}

interface Props {
  onClose: () => void;
  onSubmit: (feedback: Feedback) => void;
}

export default function FeedbackModal({ onClose, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !comment) {
      alert("Please enter your name and comment.");
      return;
    }

    onSubmit({
      id: Date.now(),
      name,
      stars,
      comment,
    });

    setName("");
    setComment("");
    setStars(5);
  };

  return (
    <div className="feedback-modal__overlay">
      <div className="feedback-modal__content">
        <button className="feedback-modal__close-btn" onClick={onClose}>
          ×
        </button>

        <h2 className="feedback-modal_title2">Submit Your Review</h2>

        <form onSubmit={handleSubmit}>
          <div className="feedback-modal__field">
            <label>Your Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="feedback-modal__field">
            <label>Stars</label>
            <select
              value={stars}
              onChange={(e) => setStars(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} ★
                </option>
              ))}
            </select>
          </div>

          <div className="feedback-modal__field">
            <label>Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="feedback-modal__submit-btn"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}