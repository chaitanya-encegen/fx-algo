import React, { useEffect, useRef } from 'react';
import '../components/CustomCursor.css';
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";

const DOTS_AMOUNT = 20;
const SINE_DOTS = Math.floor(DOTS_AMOUNT * 0.3);
const DOT_WIDTH = 26;
const IDLE_TIMEOUT = 150;

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const requestRef = useRef();
  const dotsRef = useRef([]);
  const idleRef = useRef(false);
  const timeoutIdRef = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });
  const lastFrame = useRef(0);

  // Dot class as per the script
  class Dot {
    constructor(index = 0) {
      this.index = index;
      this.anglespeed = 0.05;
      this.x = 0;
      this.y = 0;
      this.scale = 1 - 0.05 * index;
      this.range = DOT_WIDTH / 2 - (DOT_WIDTH / 2) * this.scale + 2;
      this.limit = DOT_WIDTH * 0.75 * this.scale;
      this.element = document.createElement("span");
      this.element.className = "CursorDot";
      this.element.style.background = "#f1d60d";
      this.element.style.position = "absolute";
      this.element.style.width = "26px";
      this.element.style.height = "26px";
      this.element.style.borderRadius = "20px";
      this.element.style.transformOrigin = "center center";
      this.element.style.transform = `scale(${this.scale})`;

      cursorRef.current.appendChild(this.element);
    }

    lock() {
      this.lockX = this.x;
      this.lockY = this.y;
      this.angleX = Math.PI * 2 * Math.random();
      this.angleY = Math.PI * 2 * Math.random();
    }

    draw(delta) {
      if (!idleRef.current || this.index <= SINE_DOTS) {
        this.element.style.transform = `translate(${this.x}px,${this.y}px) scale(${this.scale})`;
      } else {
        this.angleX += this.anglespeed;
        this.angleY += this.anglespeed;
        this.y = this.lockY + Math.sin(this.angleY) * this.range;
        this.x = this.lockX + Math.sin(this.angleX) * this.range;
        this.element.style.transform = `translate(${this.x}px,${this.y}px) scale(${this.scale})`;
      }
    }
  }

  // Idle cursor animation
  const startIdleTimer = () => {
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(goInactive, IDLE_TIMEOUT);
    idleRef.current = false;
  };

  const resetIdleTimer = () => {
    clearTimeout(timeoutIdRef.current);
    startIdleTimer();
  };

  const goInactive = () => {
    idleRef.current = true;
    for (let dot of dotsRef.current) dot.lock();
  };

  // Move
  const onMouseMove = (event) => {
    mousePosition.current.x = event.clientX - DOT_WIDTH / 2;
    mousePosition.current.y = event.clientY - DOT_WIDTH / 2;
    resetIdleTimer();
  };

  const onTouchMove = (event) => {
    mousePosition.current.x = event.touches[0].clientX - DOT_WIDTH / 2;
    mousePosition.current.y = event.touches[0].clientY - DOT_WIDTH / 2;
    resetIdleTimer();
  };

  // Cursor movement animation
  const render = (timestamp) => {
    const delta = timestamp - lastFrame.current;
    positionCursor(delta);
    lastFrame.current = timestamp;
    requestRef.current = requestAnimationFrame(render);
  };

  const positionCursor = (delta) => {
    let x = mousePosition.current.x;
    let y = mousePosition.current.y;
    dotsRef.current.forEach((dot, index, arr) => {
      let nextDot = arr[index + 1] || arr[0];
      dot.x = x;
      dot.y = y;
      dot.draw(delta);
      if (!idleRef.current || index <= SINE_DOTS) {
        const dx = (nextDot.x - dot.x) * 0.35;
        const dy = (nextDot.y - dot.y) * 0.35;
        x += dx;
        y += dy;
      }
    });
  };

  // Setup dots and listeners on mount
  useEffect(() => {
    const cursor = cursorRef.current;
    document.body.style.cursor = 'none';

    // SVG goo filter
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("style", "display:none;");
    svg.innerHTML = `
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
      </filter>
    `;
    document.body.appendChild(svg);

    // Build dots
    dotsRef.current = [];
    for (let i = 0; i < DOTS_AMOUNT; i++) dotsRef.current.push(new Dot(i));

    // Mouse listeners
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);

    lastFrame.current = performance.now();
    render(lastFrame.current);

    // Idle at start
    startIdleTimer();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      document.body.style.cursor = '';
      if (svg) svg.remove();
      if (cursor) {
        while (cursor.firstChild) cursor.removeChild(cursor.firstChild);
      }
      cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line
  }, []);

  // The container div uses the gooey SVG filter. The dots are appended programmatically.
  return (
    <div
      id="cursor"
      ref={cursorRef}
      className="CustomCursor"
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        display: 'block',
        borderRadius: 0,
        top: 0,
        left: 0,
        zIndex: 1000,
        width: 0,
        height: 0,
        filter: "url(#goo)",
        WebkitFilter: "url(#goo)"
      }}
    ></div>
  );
};

export default CustomCursor;