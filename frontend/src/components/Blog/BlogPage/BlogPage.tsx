"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import "./BlogPage.css";
import postsMeta from "@/content/posts/postsMeta.json";

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentComments, setRecentComments] = useState<any[]>([]);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchRecentComments = async () => {
      try {
        const res = await fetch(
          "https://website-inhaus.onrender.com/api/comments"
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.comments)) {
          setRecentComments(data.comments.slice(0, 5));
        }
      } catch (err) {
        console.error("Error loading recent comments:", err);
      }
    };

    fetchRecentComments();
  }, []);

  const sortedPosts = useMemo(() => {
    return [...postsMeta].sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );
  }, []);

  const filteredPosts = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return sortedPosts.filter((p) =>
      p.title.toLowerCase().includes(q)
    );
  }, [searchTerm, sortedPosts]);

  const totalPages = Math.ceil(
    filteredPosts.length / postsPerPage
  );

  const startIndex =
    (currentPage - 1) * postsPerPage;

  const currentPosts =
    filteredPosts.slice(
      startIndex,
      startIndex + postsPerPage
    );

  return (
    <section className="blog-page">
      <div className="blog-page__header">
        <h1 className="blog-page__title">
          Inhaus Living Journal
        </h1>
        <p className="blog-page__subtitle">
          Design insights, renovation expertise and refined living inspiration.
        </p>
      </div>

      <div className="blog-page__container">
        <motion.div
          className="blog-page__grid"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {currentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card"
            >
              <div className="blog-card__image-wrapper">
                <img
                  src={`${post.heroImage}?tr=w-900,q-85,f-webp`}
                  alt={post.title}
                  className="blog-card__image"
                  loading="lazy"
                />
                <div className="blog-card__image-overlay" />
              </div>

              <div className="blog-card__text">
                <span className="blog-card__date">
                  {new Date(post.date).toLocaleDateString("en-AU", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>

                <h3 className="blog-card__title">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </motion.div>

        <aside className="blog-page__sidebar">
          <div className="sidebar__search">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="sidebar__block">
            <h3>Recent Posts</h3>
            <ul>
              {sortedPosts.slice(0, 5).map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar__block">
            <h3>Recent Comments</h3>
            {recentComments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul>
                {recentComments.map((c, i) => (
                  <li key={c.id || i}>
                    <strong>{c.name}</strong>
                    <p>
                      {c.text?.length > 70
                        ? `${c.text.slice(0, 70)}…`
                        : c.text}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      {totalPages > 1 && (
        <div className="blog-page__pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`page-btn ${
                currentPage === i + 1 ? "active" : ""
              }`}
              onClick={() =>
                setCurrentPage(i + 1)
              }
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}