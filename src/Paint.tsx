import { Fragment, useEffect } from "react";
import React from "react";
import { AppState } from "./App";

export default function Paint(props: { state: AppState }) {
  const { state } = props;
  const paintRef = React.useRef<HTMLCanvasElement>(null);
  const paintToolRef = React.useRef<HTMLCanvasElement>(null);
  let paint: HTMLCanvasElement;
  let painttool: HTMLCanvasElement;
  let paintCtx: CanvasRenderingContext2D;
  let painttoolCtx: CanvasRenderingContext2D;
  const mouse = { x: 0, y: 0 };
  let head = { x: 0, y: 0 };

  useEffect(() => init());

  return (
    <Fragment>
      <canvas ref={paintRef} id="paint"></canvas>
      <canvas ref={paintToolRef} id="painttool"></canvas>
    </Fragment>
  );

  function init() {
    if (paint) return;
    if (paintRef.current) {
      paint = paintRef.current;
      paintCtx = paint.getContext("2d") as CanvasRenderingContext2D;
    }
    if (paintToolRef.current) {
      painttool = paintToolRef.current;
      painttoolCtx = painttool.getContext("2d") as CanvasRenderingContext2D;
    }
    loadPaint();
    clearPaint();
  }

  function clearPaint() {
    // console.log('clear paint')
    paintCtx.clearRect(0, 0, paint.width, paint.height);
    painttoolCtx.clearRect(0, 0, paint.width, paint.height);
  }

  function updateSize() {
    const size = paint.getBoundingClientRect();
    // console.log(`paint down ${size.width} ${size.height}`)
    paint.width = size.width;
    paint.height = size.height;
    painttool.width = size.width;
    painttool.height = size.height;
  }

  function loadPaint() {
    window.addEventListener("resize", updateSize, false);
    updateSize();
    painttool.addEventListener(
      "mousemove",
      function (e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    painttool.addEventListener(
      "mousedown",
      function (e) {
        head.x = e.pageX - this.offsetLeft;
        head.y = e.pageY - this.offsetTop;
        painttoolCtx.lineWidth = Math.max(10, (paint.width / 100) | 0);
        painttoolCtx.lineJoin = "round";
        painttoolCtx.lineCap = "round";
        painttoolCtx.strokeStyle = "#ffe135";
        if (state.paintTool === "pen") {
          painttoolCtx.beginPath();
          painttoolCtx.moveTo(mouse.x, mouse.y);
        }
        painttool.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    painttool.addEventListener(
      "mouseup",
      function () {
        // console.log(`paint up`)
        paintCtx.drawImage(painttool, 0, 0);
        painttoolCtx.clearRect(0, 0, painttool.width, painttool.height);
        painttool.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    function onPaint() {
      const ctx = painttoolCtx;
      ctx.clearRect(0, 0, painttool.width, painttool.height);
      ctx.save();
      if (state.paintTool === "arrow") {
        const p1 = mouse,
          p2 = head;
        const size = ctx.lineWidth * 2;
        // Rotate the context to point along the path
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        ctx.translate(p2.x, p2.y);
        ctx.rotate(Math.atan2(dy, dx));

        // line
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-len, 0);
        ctx.closePath();
        ctx.stroke();

        // arrowhead
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-size, -size);
        ctx.moveTo(0, 0);
        ctx.lineTo(-size, size);
        ctx.stroke();
      } else if (state.paintTool === "rect") {
        ctx.beginPath();
        ctx.rect(head.x, head.y, mouse.x - head.x, mouse.y - head.y);
        ctx.stroke();
      } else if (state.paintTool === "pen") {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      } else if (state.paintTool === "emoji") {
        const p1 = mouse,
          p2 = head;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.max(64, (Math.sqrt(dx * dx + dy * dy) * 0.9) | 0);
        ctx.translate(p2.x, p2.y);
        ctx.rotate(Math.atan2(dy, dx) - Math.PI / 2);

        ctx.font = `${len}px serif`;
        ctx.textAlign = "center";
        ctx.fillText(state.emoji || "", 0, 0);
      }
      ctx.restore();
    }
  }
}
