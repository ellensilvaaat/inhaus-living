"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./Intro.css";

type IntroLine = {
  id: string;
  text: string;
  accent?: boolean;
};

const LINES: IntroLine[] = [
  {
    id: "line-1",
    text: "You changed.",
  },
  {
    id: "line-2",
    text: "Your routines became faster.",
  },
  {
    id: "line-3",
    text: "Your priorities became clearer.",
  },
  {
    id: "line-4",
    text: "But your home stayed behind.",
    accent: true,
  },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function segmentReveal(progress: number, start: number, end: number) {
  const local = (progress - start) / (end - start);
  return clamp(local);
}

export default function Intro() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const passed = clamp((-rect.top) / Math.max(totalScrollable, 1));
      setProgress(passed);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      setMouse({ x, y });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });

    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;

      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;

      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_progress;

      float circle(vec2 uv, vec2 center, float radius, float blur) {
        float d = distance(uv, center);
        return smoothstep(radius + blur, radius - blur, d);
      }

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        vec2 uv = v_uv;
        vec2 mouse = u_mouse;

        vec3 base = vec3(0.02, 0.02, 0.03);

        vec2 driftA = vec2(
          0.22 + sin(u_time * 0.17) * 0.04,
          0.30 + cos(u_time * 0.13) * 0.05
        );

        vec2 driftB = vec2(
          0.78 + cos(u_time * 0.11) * 0.05,
          0.68 + sin(u_time * 0.09) * 0.04
        );

        vec2 mouseGlow = mix(vec2(0.5, 0.42), mouse, 0.55);

        float glowA = circle(uv, driftA, 0.24, 0.22);
        float glowB = circle(uv, driftB, 0.20, 0.24);
        float glowMouse = circle(uv, mouseGlow, 0.16 + (u_progress * 0.03), 0.22);

        vec3 orange = vec3(0.9647, 0.4862, 0.0431);
        vec3 warm = vec3(1.0, 0.78, 0.54);
        vec3 softWhite = vec3(0.96, 0.94, 0.90);

        vec3 color = base;
        color += orange * glowA * 0.34;
        color += warm * glowB * 0.22;
        color += softWhite * glowMouse * 0.14;
        color += orange * glowMouse * 0.18;

        float vignette = smoothstep(1.22, 0.18, distance(uv, vec2(0.5)));
        color *= vignette;

        float grain = (noise(uv * u_resolution.xy * 0.25 + u_time * 0.2) - 0.5) * 0.035;
        color += grain;

        float bottomLift = smoothstep(1.0, 0.22, uv.y);
        color += orange * bottomLift * 0.03 * u_progress;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const progressLocation = gl.getUniformLocation(program, "u_progress");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();

    const render = (now: number) => {
      const time = (now - start) * 0.001;

      resize();

      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseLocation, mouse.x, 1 - mouse.y);
      gl.uniform1f(timeLocation, time);
      gl.uniform1f(progressLocation, progress);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      raf = window.requestAnimationFrame(render);
    };

    raf = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [mouse.x, mouse.y, progress]);

  const lineReveals = useMemo(() => {
    return [
      segmentReveal(progress, 0.06, 0.18),
      segmentReveal(progress, 0.22, 0.36),
      segmentReveal(progress, 0.40, 0.54),
      segmentReveal(progress, 0.58, 0.74),
    ];
  }, [progress]);

  const paragraphReveal = segmentReveal(progress, 0.72, 0.9);
  const stageDim = 1 - segmentReveal(progress, 0.86, 1.0) * 0.35;
  const bridgeReveal = segmentReveal(progress, 0.84, 1.0);

  return (
    <section ref={sectionRef} className="intro-cinematic" id="storytelling">
      <div className="intro-cinematic__sticky">
        <canvas ref={canvasRef} className="intro-cinematic__webgl" />

        <div className="intro-cinematic__noise" />
        <div className="intro-cinematic__top-fade" />
        <div className="intro-cinematic__bottom-fade" />

        <div
          className="intro-cinematic__content"
          style={{
            opacity: stageDim,
            transform: `translate3d(0, ${progress * -20}px, 0)`,
          }}
        >
          <div className="intro-cinematic__label-wrap">
            <span className="intro-cinematic__label-line" />
            <p className="intro-cinematic__label">The quiet realization</p>
          </div>

          <div className="intro-cinematic__headline">
            {LINES.map((line, index) => {
              const reveal = lineReveals[index];

              return (
                <div
                  key={line.id}
                  className={`intro-cinematic__headline-row ${
                    line.accent ? "is-accent" : ""
                  }`}
                  style={
                    {
                      "--reveal": reveal,
                      "--opacity": 0.18 + reveal * 0.82,
                    } as React.CSSProperties
                  }
                >
                  <span className="intro-cinematic__headline-mask">
                    <span className="intro-cinematic__headline-text">
                      {line.text}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className="intro-cinematic__body"
            style={
              {
                "--body-reveal": paragraphReveal,
              } as React.CSSProperties
            }
          >
            <p>
              There is a moment when the misalignment becomes impossible to ignore.
              Not dramatic. Not loud. Just clear. The way you live has moved forward,
              but the space around you still belongs to another time.
            </p>
          </div>
        </div>

        <div
          className="intro-cinematic__bridge"
          style={{
            opacity: bridgeReveal,
            transform: `translate3d(0, ${24 - bridgeReveal * 24}px, 0)`,
          }}
        >
          <span className="intro-cinematic__bridge-line" />
          <p>The tension builds before the transformation begins.</p>
        </div>

        <div
          className="intro-cinematic__progress"
          aria-hidden="true"
        >
          <span
            className="intro-cinematic__progress-fill"
            style={{ transform: `scaleY(${Math.max(progress, 0.03)})` }}
          />
        </div>
      </div>
    </section>
  );
}