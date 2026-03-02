"use client";

import { useState } from "react";
import "./CommentsSection.css";

interface Comment {
  id?: string | number;
  name: string;
  text: string;
  created_at?: string;
  date?: string;
}

interface Props {
  comments: Comment[];
  postSlug: string;
  setComments: React.Dispatch<
    React.SetStateAction<Comment[]>
  >;
}

export default function CommentsSection({
  comments,
  postSlug,
  setComments,
}: Props) {
  const [showModal, setShowModal] =
    useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const BACKEND_URL =
    "https://website-inhaus.onrender.com/api/comments";

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!name || !text) return;

    try {
      const res = await fetch(
        BACKEND_URL,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            text,
            post_slug: postSlug,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setComments((prev) => [
          data.comment,
          ...prev,
        ]);
        setName("");
        setText("");
        setShowModal(false);
      }
    } catch (err) {
      console.error(
        "❌ Error saving comment:",
        err
      );
    }
  };

  return (
    <div className="comments-section">
      <h3 className="comments-section__title">
        Recent Comments
      </h3>

      {comments.length === 0 ? (
        <p className="comments-section__p">
          No comments yet.
        </p>
      ) : (
        <ul className="comments-section__list">
          {comments.map((c, idx) => (
            <li
              key={c.id || idx}
              className="comments-section__item"
            >
              <strong>{c.name}</strong>{" "}
              <span>
                (
                {new Date(
                  c.created_at ||
                    c.date ||
                    ""
                ).toLocaleDateString()}
                )
              </span>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
      )}

      <button
        className="comments-section__add-btn"
        onClick={() =>
          setShowModal(true)
        }
      >
        Add Comment
      </button>

      {showModal && (
        <div className="comments-section__modal-overlay">
          <div className="comments-section__modal">
            <h4>Add your comment</h4>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                required
              />

              <textarea
                placeholder="Your comment"
                value={text}
                onChange={(e) =>
                  setText(
                    e.target.value
                  )
                }
                required
              />

              <div className="comments-section__modal-actions">
                <button type="submit">
                  Submit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}