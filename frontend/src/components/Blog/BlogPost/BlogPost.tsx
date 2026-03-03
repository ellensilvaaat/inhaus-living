"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

/* ================= TEXT EXTRACTOR (FIX DEFINITIVO) ================= */

function extractText(node: any): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node?.props?.children) return extractText(node.props.children);
  return "";
}

/* ================= HELPERS ================= */

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/`/g, "")
    .replace(/&/g, "and")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function cleanHeading(text: string) {
  return text
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/`/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .trim();
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

export default function BlogPost({ slug, content }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("");
  const [heroOffset, setHeroOffset] = useState(0);

  const articleRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const BACKEND_URL =
    "https://website-inhaus.onrender.com/api/comments";

  const postMeta = (postsMeta as any[]).find(
    (p) => p.slug === slug
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  /* ================= FETCH COMMENTS ================= */

  useEffect(() => {
    if (!slug) return;

    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/${slug}`
        );

        if (!res.ok) return;

        const data = await res.json();
        if (
          data?.success &&
          Array.isArray(data.comments)
        ) {
          setComments(data.comments);
        }
      } catch {
        console.warn("Comments API unreachable");
      }
    };

    fetchComments();
  }, [slug]);

  /* ================= CLEAN MARKDOWN ================= */

  const cleanedContent = useMemo(() => {
    return content
      .replace(/\*\*\[Home\][\s\S]*?\n/g, "")
      .replace(/^- \[.*?\]\(#.*?\)\n/gm, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  }, [content]);

  /* ================= TOC ================= */

  const toc = useMemo<TocItem[]>(() => {
    const lines = cleanedContent.split("\n");
    const items: TocItem[] = [];

    for (const line of lines) {
      const h2 = line.match(/^##\s+(.+)$/);
      const h3 = line.match(/^###\s+(.+)$/);

      if (h2) {
        const text = cleanHeading(h2[1]);
        items.push({
          id: slugify(text),
          text,
          level: 2,
        });
      } else if (h3) {
        const text = cleanHeading(h3[1]);
        items.push({
          id: slugify(text),
          text,
          level: 3,
        });
      }
    }

    return items;
  }, [cleanedContent]);

  /* ================= SCROLL PROGRESS + PARALLAX ================= */

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop =
        window.scrollY || doc.scrollTop;
      const scrollHeight =
        doc.scrollHeight -
        window.innerHeight;

      const pct =
        scrollHeight > 0
          ? (scrollTop / scrollHeight) *
            100
          : 0;

      setProgress(
        Math.min(100, Math.max(0, pct))
      );

      setHeroOffset(
        Math.min(140, scrollTop * 0.18)
      );
    };

    onScroll();
    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  /* ================= ACTIVE TOC ================= */

  useEffect(() => {
    if (!toc.length) return;

    const headings = toc
      .map((t) =>
        document.getElementById(t.id)
      )
      .filter(Boolean) as HTMLElement[];

    if (!headings.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) =>
            a.boundingClientRect.top >
            b.boundingClientRect.top
              ? 1
              : -1
          )[0];

        if (visible?.target?.id)
          setActiveId(
            visible.target.id
          );
      },
      {
        rootMargin:
          "-18% 0px -70% 0px",
        threshold: 0.01,
      }
    );

    headings.forEach((h) =>
      io.observe(h)
    );

    return () => io.disconnect();
  }, [toc]);

  const onTocClick = (id: string) => {
    const el =
      document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!postMeta) {
    return (
      <div className="blog-post__notfound">
        Article not found.
      </div>
    );
  }

  return (
    <section className="blog-post">
      <div className="blog-post__progress">
        <div
          className="blog-post__progressBar"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div
        ref={heroRef}
        className="blog-post__hero"
        style={{
          backgroundImage: `url(${postMeta.heroImage}?tr=w-2200,q-86,f-webp)`,
          transform: `translate3d(0, ${-heroOffset}px, 0)`,
        }}
      >
        <div className="blog-post__overlay" />

        <div className="blog-post__heroCard">
          <div className="blog-post__kicker">
            Inhaus Living Journal
          </div>

          <h1 className="blog-post__title">
            {postMeta.title}
          </h1>

          <div className="blog-post__metaRow">
            <span className="blog-post__date">
              {formatDate(postMeta.date)}
            </span>

            <span className="blog-post__dot">
              •
            </span>

            <span className="blog-post__readtime">
              {Math.max(
                3,
                Math.round(
                  cleanedContent.split(
                    /\s+/
                  ).length / 220
                )
              )}{" "}
              min read
            </span>
          </div>
        </div>

        <div className="blog-post__heroBottomFade" />
      </div>

      <div className="blog-post__shell">
        <div className="blog-post__grid">

          <article
            ref={articleRef}
            className="blog-post__container"
          >
            <div className="blog-post__content">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => {
                    const text = cleanHeading(
                      extractText(children)
                    );

                    return (
                      <h2
                        id={slugify(text)}
                        className="blog-post__h2"
                      >
                        {children}
                      </h2>
                    );
                  },

                  h3: ({ children }) => {
                    const text = cleanHeading(
                      extractText(children)
                    );

                    return (
                      <h3
                        id={slugify(text)}
                        className="blog-post__h3"
                      >
                        {children}
                      </h3>
                    );
                  },

                  p: ({ children }) => (
                    <p className="blog-post__p">
                      {children}
                    </p>
                  ),

                  strong: ({ children }) => (
                    <strong className="blog-post__strong">
                      {children}
                    </strong>
                  ),

                  a: () => null,
                }}
              >
                {cleanedContent}
              </ReactMarkdown>
            </div>

            <div className="blog-post__commentsWrap">
              <CommentsSection
                comments={comments}
                postSlug={slug}
                setComments={setComments}
              />
            </div>
          </article>
           <aside className="blog-post__aside">
            <div className="blog-post__asideCard">
              <div className="blog-post__asideTitle">
                On this page
              </div>

              <nav className="blog-post__toc">
                {toc.map((item) => (
                  <button
                    key={item.id}
                    className={[
                      "blog-post__tocItem",
                      item.level === 3
                        ? "is-h3"
                        : "",
                      activeId ===
                      item.id
                        ? "is-active"
                        : "",
                    ].join(" ")}
                    onClick={() =>
                      onTocClick(item.id)
                    }
                    type="button"
                  >
                    <span className="blog-post__tocBullet" />
                    <span className="blog-post__tocText">
                      {item.text}
                    </span>
                  </button>
                ))}
              </nav>

              <div className="blog-post__asideCta">
                <div className="blog-post__asideCtaTitle">
                  Ready to start your project?
                </div>

                <a
                  className="blog-post__asideCtaBtn"
                  href="/contact"
                >
                  Book a consultation
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}