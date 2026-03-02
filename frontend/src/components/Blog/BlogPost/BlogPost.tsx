"use client";

import {
  useState,
  useEffect,
  useMemo,
} from "react";
import ReactMarkdown from "react-markdown";
import "./BlogPost.css";
import CommentsSection from "../CommentsSection/CommentsSection";
import postsMeta from "@/content/posts/postsMeta.json";

interface Props {
  slug: string;
  content: string;
}

interface Comment {
  id?: string | number;
  name: string;
  text: string;
  created_at?: string;
  date?: string;
}

export default function BlogPost({
  slug,
  content,
}: Props) {
  const [comments, setComments] =
    useState<Comment[]>([]);

  const BACKEND_URL =
    "https://website-inhaus.onrender.com/api/comments";

  const postMeta = postsMeta.find(
    (p) => p.slug === slug
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  // 🔥 Fetch seguro (não quebra a página se API cair)
  useEffect(() => {
    if (!slug) return;

    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/${slug}`,
          {
            method: "GET",
            headers: {
              "Content-Type":
                "application/json",
            },
          }
        );

        if (!res.ok) {
          console.warn(
            "Comments API error:",
            res.status
          );
          return;
        }

        const data = await res.json();

        if (
          data?.success &&
          Array.isArray(data.comments)
        ) {
          setComments(data.comments);
        }
      } catch (err) {
        console.warn(
          "Comments API unreachable:",
          err
        );
      }
    };

    fetchComments();
  }, [slug]);

  // 🔥 Limpeza do markdown
  const cleanedContent = useMemo(() => {
    return content
      .replace(
        /\*\*\[Home\][\s\S]*?\n/g,
        ""
      )
      .replace(
        /^- \[.*?\]\(#.*?\)\n/gm,
        ""
      )
      .replace(
        /\[([^\]]+)\]\([^)]+\)/g,
        "$1"
      );
  }, [content]);

  if (!postMeta)
    return (
      <div className="blog-post__notfound">
        Article not found.
      </div>
    );

  return (
    <section className="blog-post">
      <div
        className="blog-post__hero"
        style={{
          backgroundImage: `url(${postMeta.heroImage}?tr=w-1600,q-85,f-webp)`,
        }}
      >
        <div className="blog-post__overlay" />
        <h1 className="blog-post__title">
          {postMeta.title}
        </h1>
      </div>

      <div className="blog-post__container">
        <p className="blog-post__date">
          {postMeta.date}
        </p>

        <div className="blog-post__content">
          <ReactMarkdown
            components={{
              strong: ({
                children,
              }) => (
                <strong
                  style={{
                    color:
                      "var(--color-accent)",
                    fontWeight: 700,
                  }}
                >
                  {children}
                </strong>
              ),
              a: () => null,
            }}
          >
            {cleanedContent}
          </ReactMarkdown>
        </div>

        <CommentsSection
          comments={comments}
          postSlug={slug}
          setComments={setComments}
        />
      </div>
    </section>
  );
}