"use client";

import { useEffect, useRef } from "react";

type Props = {
  speed?: number;
  color?: string;
};

export function Silk({ speed = 1.4, color = "#8f0f1a" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const glContext = canvas.getContext("webgl");
    if (!glContext) {
      console.warn("WebGL not supported");
      return;
    }
    const gl: WebGLRenderingContext = glContext;

    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    // ---------- resize ----------
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // ---------- mouse ----------
    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouse);

    // ---------- shaders ----------
    const vertex = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const rgb = hexToRgb(color);

    const fragment = `
      precision mediump float;

      uniform float u_time;
      uniform vec2 u_res;
      uniform vec2 u_mouse;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_res.xy;
        uv -= 0.5;

        // mouse parallax
        uv.x += (u_mouse.x - 0.5) * 0.25;
        uv.y += (u_mouse.y - 0.5) * 0.25;

        // luxury silk waves
        float wave =
          sin(uv.x * 14.0 + u_time * ${speed.toFixed(1)}) *
          cos(uv.y * 14.0 + u_time * ${speed.toFixed(1)});

        float wave2 =
          sin(uv.x * 6.0 - u_time * ${speed.toFixed(1)} * 0.7) *
          cos(uv.y * 6.0 - u_time * ${speed.toFixed(1)} * 0.7);

        float glow = smoothstep(0.45, -0.45, length(uv + wave * 0.09));

        vec3 base = vec3(${rgb.join(",")}) / 255.0;

        // depth lighting
        vec3 col = base;
        col += glow * 0.65;
        col += wave2 * 0.08;

        // cinematic vignette
        float vignette = smoothstep(0.9, 0.2, length(uv));
        col *= vignette;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compile(type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vs = compile(gl.VERTEX_SHADER, vertex);
    const fs = compile(gl.FRAGMENT_SHADER, fragment);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc = gl.getUniformLocation(program, "u_res");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");

    let rafId = 0;

    const render = () => {
      time += 0.016;

      if (timeLoc) gl.uniform1f(timeLoc, time);
      if (resLoc) gl.uniform2f(resLoc, canvas.width, canvas.height);
      if (mouseLoc) gl.uniform2f(mouseLoc, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [speed, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}