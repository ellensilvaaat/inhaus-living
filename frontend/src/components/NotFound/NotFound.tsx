"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        background: "#fff",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          fontSize: "12rem",
          margin: 0,
          fontWeight: 800,
          color: "#f5f5f5",
        }}
      >
        404
      </motion.h1>

      <h2
        style={{
          fontSize: "2.4rem",
          marginTop: "-3rem",
          color: "#111",
        }}
      >
        Page not found
      </h2>

      <p
        style={{
          fontSize: "1.6rem",
          color: "#666",
          maxWidth: "400px",
          margin: "1.5rem 0 2.5rem",
        }}
      >
        The space you are looking for doesn't exist
        or has been moved to a new location.
      </p>

      <Link
        href="/"
        style={{
          padding: "1.2rem 2.5rem",
          background: "#111",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "999px",
          fontWeight: "bold",
          display: "inline-block",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}