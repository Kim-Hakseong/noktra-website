"use client";

// v4 홈 — ORBIT: 시네마틱 WebGL 입자 양자화 홈.
// 히어로: 스캔 링(파비콘 확대판) + 입자 NOKTRA 워드마크 →
// 스크롤 시 입자가 흩어져 9개 제품 스크린샷으로 지그재그 재응집(블러→초점 크로스페이드) →
// 피날레에 링·워드마크 재등장(수미상관). 배경 유체 셰이더는 민트→오렌지로 이행.
// three.js는 CDN 동적 import(런타임 전용) — 패키지 의존성 추가 없음(CLAUDE.md 준수).
// data-motion=static이면 WebGL 없이 정적 폴백을 렌더한다.
import { useEffect, useRef, useState } from "react";
import LLink from "@/components/LLink";
import { useLang } from "@/lib/i18n";
import { PRODUCTS, STATUS_CLASS, STATUS_LABEL, verbLabel } from "@/lib/products";
import { KO_ONELINERS } from "@/lib/ko";
import { SITE } from "@/lib/site";
import { asset } from "@/lib/asset";
import { motionIsStatic } from "@/lib/motion";

const THREE_URL = "https://unpkg.com/three@0.160.0/build/three.module.js";

/* 스크롤 구간 배치 */
const HERO_END = 0.075;
const PROD_START = 0.1;
const PROD_END = 0.9;
const SEG = (PROD_END - PROD_START) / PRODUCTS.length;
const FINAL_START = 0.93;

const smooth01 = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function OrbitHome() {
  const { lang } = useLang();
  const t = (en: string, ko: string) => (lang === "ko" ? ko : en);
  const [isStatic, setIsStatic] = useState<boolean | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsStatic(motionIsStatic());
  }, []);

  useEffect(() => {
    if (isStatic !== false) return;
    const root = rootRef.current;
    if (!root) return;
    document.body.classList.add("ob-on");
    let disposed = false;
    let raf = 0;
    let cleanupFns: (() => void)[] = [];

    (async () => {
      // @ts-ignore — CDN ESM 런타임 import (번들 제외)
      const THREE: any = await import(/* webpackIgnore: true */ THREE_URL);
      if (disposed) return;

      const canvas = root.querySelector<HTMLCanvasElement>(".ob-webgl")!;
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#000000");
      scene.fog = new THREE.FogExp2("#000000", 0.008);
      const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
      camera.position.set(0, 0.15, 4.6);
      scene.add(camera);

      const shaderUniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(innerWidth, innerHeight) },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uScroll: { value: 0 },
        uDim: { value: 0 },
      };
      /* 배경 유체 셰이더 — 민트(상단) → 용융 오렌지(하단) */
      {
        const bgMesh = new THREE.Mesh(
          new THREE.PlaneGeometry(30, 30),
          new THREE.ShaderMaterial({
            depthWrite: false,
            depthTest: false,
            uniforms: shaderUniforms,
            vertexShader: `void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
            fragmentShader: `
              uniform float uTime; uniform vec2 uResolution; uniform vec2 uMouse; uniform float uScroll; uniform float uDim;
              void main() {
                vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
                float aspect = uResolution.x / uResolution.y;
                float time = uTime * 0.08; float scroll = uScroll;
                vec2 w = uv; float sd = scroll * 5.0;
                w.x += sin(uv.y * 2.5 + time * 0.2 + sd) * 0.35;
                w.y += cos(uv.x * 2.5 - time * 0.15 - sd * 0.8) * 0.35;
                w.x += sin(uv.y * 1.2 - time * 0.1 - sd * 1.5) * 0.25;
                w.y += cos(uv.x * 1.2 + time * 0.18 + sd * 1.2) * 0.25;
                w += vec2(scroll * 0.04, -scroll * 0.02) + vec2(uMouse.x * aspect * 0.05, uMouse.y * 0.05);
                float w1 = sin(dot(w, vec2(cos(0.6), sin(0.6))) * 2.4 + time);
                float w2 = cos(dot(w, vec2(cos(-0.7), sin(-0.7))) * 3.2 - time * 1.4 + w1 * 0.4);
                float w3 = sin(dot(w, vec2(cos(1.2), sin(1.2))) * 4.0 + time * 1.8 + w2 * 0.5);
                float wf = w1 * 0.50 + w2 * 0.35 + w3 * 0.15;
                float crest = pow(max(0.0, 1.0 - abs(wf - 0.1)), 2.5) * 0.5 + pow(max(0.0, 1.0 - abs(wf - 0.15)), 8.0) * 0.9;
                float tt = smoothstep(0.0, 1.0, scroll);
                vec3 colShadow = mix(vec3(0.0003, 0.0009, 0.0010), vec3(0.0012, 0.0005, 0.0002), tt);
                vec3 colWave1  = mix(vec3(0.010, 0.045, 0.050), vec3(0.095, 0.032, 0.010), tt);
                vec3 colWave2  = mix(vec3(0.005, 0.025, 0.030), vec3(0.055, 0.018, 0.005), tt);
                vec3 colCrest  = mix(vec3(0.10, 0.40, 0.44), vec3(0.50, 0.22, 0.08), tt);
                vec3 color = colShadow;
                color = mix(color, colWave2, smoothstep(-0.6, 0.2, wf));
                color = mix(color, colWave1, smoothstep(0.0, 0.8, wf));
                color += colCrest * crest * 1.4;
                color *= 1.0 - dot(uv, uv) * 0.12;
                color *= mix(1.0, 0.30, uDim);
                gl_FragColor = vec4(color, 1.0);
              }`,
          })
        );
        bgMesh.position.set(0, 0, -8.0);
        bgMesh.renderOrder = -10;
        camera.add(bgMesh);
      }

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
      renderer.setSize(innerWidth, innerHeight);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 2.0;

      /* ---- 히어로: 스캔 링 ---- */
      const heroGroup = new THREE.Group();
      heroGroup.position.set(0, 0.3, -2.2);
      scene.add(heroGroup);
      const ringMats: any[] = [];
      const mkR = (mat: any, mesh: any) => { mat.transparent = true; ringMats.push(mat); heroGroup.add(mesh); return mesh; };
      {
        const m1 = new THREE.MeshBasicMaterial({ color: "#2e6e77", opacity: 0.55 });
        mkR(m1, new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.008, 8, 200), m1));
        const m2 = new THREE.MeshBasicMaterial({ color: "#2e6e77", opacity: 0.3 });
        mkR(m2, new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.005, 8, 200), m2));
        const tg = new THREE.BoxGeometry(0.012, 0.09, 0.012);
        for (let i = 0; i < 72; i++) {
          const a = (i / 72) * Math.PI * 2;
          const long = i % 6 === 0;
          const m = new THREE.MeshBasicMaterial({ color: long ? "#5fd0c9" : "#2e6e77", opacity: long ? 0.8 : 0.4 });
          const tk = mkR(m, new THREE.Mesh(tg, m));
          tk.position.set(Math.cos(a) * 2.34, Math.sin(a) * 2.34, 0);
          tk.rotation.z = a + Math.PI / 2;
          tk.scale.y = long ? 1.6 : 1;
        }
      }
      const arcMat = new THREE.MeshBasicMaterial({ color: "#FF5C1F", opacity: 0.95, blending: THREE.AdditiveBlending });
      const arc = mkR(arcMat, new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.016, 8, 60, Math.PI * 0.35), arcMat));
      const arcGlowMat = new THREE.MeshBasicMaterial({ color: "#FF5C1F", opacity: 0.18, blending: THREE.AdditiveBlending });
      const arcGlow = mkR(arcGlowMat, new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.05, 8, 60, Math.PI * 0.35), arcGlowMat));
      const ringBaseOp = ringMats.map((m) => m.opacity);

      /* ---- 입자 시스템 ---- */
      const GW = 148, GH = 92;
      const N = GW * GH;
      const IMG_W = 3.35, IMG_H = 2.07;
      const X_OFF = 1.35;
      const wordPos = new Float32Array(N * 3);
      const wordCol = new Float32Array(N * 3);
      const cloudPos = new Float32Array(N * 3);
      const cloudCol = new Float32Array(N * 3);
      const imgPos = PRODUCTS.map(() => new Float32Array(N * 3));
      const imgCol = PRODUCTS.map(() => new Float32Array(N * 3));
      const imgReady = new Array(PRODUCTS.length).fill(false);
      const speed = new Float32Array(N);

      /* 워드마크 타깃 */
      {
        const wc = document.createElement("canvas");
        wc.width = 560; wc.height = 120;
        const wx = wc.getContext("2d")!;
        wx.fillStyle = "#fff";
        wx.font = "900 92px Arial, sans-serif";
        wx.textAlign = "center"; wx.textBaseline = "middle";
        (wx as any).letterSpacing = "6px";
        wx.fillText("NOKTRA", 280, 64);
        const wd = wx.getImageData(0, 0, 560, 120).data;
        const wordT: [number, number][] = [];
        for (let y = 0; y < 120; y += 2) for (let x = 0; x < 560; x += 2) {
          if (wd[(y * 560 + x) * 4 + 3] > 128) wordT.push([(x / 560 - 0.5) * 5.6, (0.5 - y / 120) * 1.2 + 0.3]);
        }
        for (let i = 0; i < N; i++) {
          const wt = wordT[i % wordT.length];
          wordPos[i * 3] = wt[0] + (Math.random() - 0.5) * 0.025;
          wordPos[i * 3 + 1] = wt[1] + (Math.random() - 0.5) * 0.025;
          wordPos[i * 3 + 2] = (Math.random() - 0.5) * 0.14;
          let cr: number, cg: number, cb: number;
          const acc = Math.random();
          if (acc < 0.08) { cr = 1.0; cg = 0.42; cb = 0.12; }
          else if (acc < 0.14) { cr = 0.19; cg = 0.75; cb = 0.79; }
          else { const v = 0.82 + Math.random() * 0.18; cr = v; cg = v * 0.97; cb = v * 0.92; }
          wordCol[i * 3] = cr; wordCol[i * 3 + 1] = cg; wordCol[i * 3 + 2] = cb;
          const cr2 = 2.4 + Math.random() * 2.0;
          const u = Math.random() * Math.PI * 2, v2 = Math.acos(2 * Math.random() - 1);
          cloudPos[i * 3] = Math.sin(v2) * Math.cos(u) * cr2;
          cloudPos[i * 3 + 1] = Math.cos(v2) * cr2 * 0.62;
          cloudPos[i * 3 + 2] = Math.sin(v2) * Math.sin(u) * cr2 * 0.7 - 0.5;
          const warm = Math.random() < 0.55;
          const dim = 0.1 + Math.random() * 0.22;
          cloudCol[i * 3] = warm ? dim * 2.6 : dim * 0.7;
          cloudCol[i * 3 + 1] = warm ? dim * 1.2 : dim * 2.0;
          cloudCol[i * 3 + 2] = warm ? dim * 0.4 : dim * 2.2;
          speed[i] = 0.05 + Math.random() * 0.07;
        }
      }

      /* 제품 스크린샷 → 입자 타깃 */
      PRODUCTS.forEach((p, pi) => {
        if (!p.image) return;
        const img = new Image();
        img.onload = () => {
          const c = document.createElement("canvas");
          c.width = GW; c.height = GH;
          const x = c.getContext("2d", { willReadFrequently: true })!;
          const sc = Math.max(GW / img.width, GH / img.height);
          x.drawImage(img, (GW - img.width * sc) / 2, (GH - img.height * sc) / 2, img.width * sc, img.height * sc);
          const d = x.getImageData(0, 0, GW, GH).data;
          const xo = pi % 2 === 0 ? X_OFF : -X_OFF;
          const pos = imgPos[pi], col = imgCol[pi];
          for (let gy = 0; gy < GH; gy++) for (let gx = 0; gx < GW; gx++) {
            const i = gy * GW + gx, di = (gy * GW + gx) * 4;
            pos[i * 3] = (gx / (GW - 1) - 0.5) * IMG_W + xo;
            pos[i * 3 + 1] = (0.5 - gy / (GH - 1)) * IMG_H + 0.15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
            col[i * 3] = Math.pow(d[di] / 255, 1.6);
            col[i * 3 + 1] = Math.pow(d[di + 1] / 255, 1.6) * 0.97;
            col[i * 3 + 2] = Math.pow(d[di + 2] / 255, 1.6) * 0.93;
          }
          imgReady[pi] = true;
        };
        img.src = asset(p.image);
      });

      const pGeo = new THREE.BufferGeometry();
      const curPos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        curPos[i * 3] = (Math.random() - 0.5) * 16;
        curPos[i * 3 + 1] = (Math.random() - 0.5) * 9;
        curPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      const curCol = new Float32Array(wordCol);
      pGeo.setAttribute("position", new THREE.BufferAttribute(curPos, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(curCol, 3));
      const dotTex = (() => {
        const c = document.createElement("canvas");
        c.width = c.height = 32;
        const x = c.getContext("2d")!;
        const g = x.createRadialGradient(16, 16, 0, 16, 16, 16);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.5, "rgba(255,255,255,0.9)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        x.fillStyle = g;
        x.fillRect(0, 0, 32, 32);
        return new THREE.CanvasTexture(c);
      })();
      const pMat = new THREE.PointsMaterial({ size: 0.021, vertexColors: true, transparent: true, opacity: 1, map: dotTex, depthWrite: false });
      scene.add(new THREE.Points(pGeo, pMat));

      /* ---- 입력 ---- */
      let currentScroll = 0;
      let mouseX = 0, mouseY = 0, tMX = 0, tMY = 0;
      let curX = innerWidth / 2, curY = innerHeight / 2, outX = curX, outY = curY;
      const shotO = new Float32Array(PRODUCTS.length);
      const onResize = () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
        shaderUniforms.uResolution.value.set(innerWidth, innerHeight);
      };
      const onMove = (e: MouseEvent) => {
        curX = e.clientX; curY = e.clientY;
        tMX = (e.clientX / innerWidth) * 2 - 1;
        tMY = (e.clientY / innerHeight) * 2 - 1;
        const ci = root.querySelector<HTMLElement>(".ob-cur-in");
        if (ci) { ci.style.left = curX + "px"; ci.style.top = curY + "px"; }
      };
      addEventListener("resize", onResize);
      addEventListener("mousemove", onMove);
      cleanupFns.push(() => removeEventListener("resize", onResize));
      cleanupFns.push(() => removeEventListener("mousemove", onMove));

      const shotImgs = Array.from(root.querySelectorAll<HTMLImageElement>(".ob-shot"));
      const panels = Array.from(root.querySelectorAll<HTMLElement>(".ob-panel"));
      const dashes = Array.from(root.querySelectorAll<HTMLElement>(".ob-dash-fill"));
      const dots = Array.from(root.querySelectorAll<HTMLElement>(".ob-gdot"));
      const heroSlide = root.querySelector<HTMLElement>(".ob-slide-hero");
      const finalSlide = root.querySelector<HTMLElement>(".ob-slide-final");
      const curOut = root.querySelector<HTMLElement>(".ob-cur-out");

      const clock = new THREE.Clock();
      function animate() {
        if (disposed) return;
        raf = requestAnimationFrame(animate);
        const tt = clock.getElapsedTime();
        const maxScroll = document.documentElement.scrollHeight - innerHeight;
        const targetScroll = maxScroll > 0 ? Math.min(1, (scrollY || 0) / (root!.offsetHeight - innerHeight)) : 0;
        currentScroll += (targetScroll - currentScroll) * 0.035;
        const s = currentScroll;
        mouseX += (tMX - mouseX) * 0.05;
        mouseY += (tMY - mouseY) * 0.05;
        outX += (curX - outX) * 0.2; outY += (curY - outY) * 0.2;
        if (curOut) { curOut.style.left = outX + "px"; curOut.style.top = outY + "px"; }

        /* 스캔 링: 히어로 + 피날레 재등장 */
        const heroFade = 1 - smooth01(HERO_END * 0.55, HERO_END * 1.15, s);
        const finaleIn = smooth01(FINAL_START, FINAL_START + 0.03, s);
        const ringVis = Math.max(heroFade, finaleIn);
        heroGroup.visible = ringVis > 0.001;
        if (heroGroup.visible) {
          arc.rotation.z = -tt * 0.35;
          arcGlow.rotation.z = -tt * 0.35;
          heroGroup.rotation.y = mouseX * 0.15;
          heroGroup.rotation.x = mouseY * 0.1;
          heroGroup.scale.setScalar(0.85 + 0.15 * ringVis);
          ringMats.forEach((m, i) => { m.opacity = ringBaseOp[i] * ringVis; });
        }

        /* 입자 상태 */
        pMat.opacity = 1;
        let tgtPos = cloudPos, tgtCol = cloudCol, spread = 1;
        if (s >= FINAL_START - 0.02) {
          tgtPos = wordPos; tgtCol = wordCol;
          spread = 1 - smooth01(FINAL_START - 0.02, FINAL_START + 0.035, s);
        } else if (s >= PROD_START - 0.015) {
          const fi = Math.max(0, Math.min(PRODUCTS.length - 1, Math.floor((s - PROD_START) / SEG)));
          const p = (s - (PROD_START + fi * SEG)) / SEG;
          if (imgReady[fi]) { tgtPos = imgPos[fi]; tgtCol = imgCol[fi]; }
          spread = Math.max(0, Math.min(1, (1 - smooth01(0.0, 0.24, p)) + smooth01(0.78, 1.0, p)));
        } else {
          tgtPos = wordPos; tgtCol = wordCol; spread = 0;
        }
        const jit = spread * 0.9;
        for (let i = 0; i < N; i++) {
          const i3 = i * 3;
          const ex = tgtPos[i3] * (1 - spread) + cloudPos[i3] * spread;
          const ey = tgtPos[i3 + 1] * (1 - spread) + cloudPos[i3 + 1] * spread;
          const ez = tgtPos[i3 + 2] * (1 - spread) + cloudPos[i3 + 2] * spread;
          const k = speed[i];
          curPos[i3] += (ex - curPos[i3]) * k + Math.sin(tt * 1.7 + i) * 0.0016 * jit;
          curPos[i3 + 1] += (ey - curPos[i3 + 1]) * k + Math.cos(tt * 1.3 + i * 1.7) * 0.0016 * jit;
          curPos[i3 + 2] += (ez - curPos[i3 + 2]) * k;
          curCol[i3] += (tgtCol[i3] * (1 - spread) + cloudCol[i3] * spread - curCol[i3]) * 0.09;
          curCol[i3 + 1] += (tgtCol[i3 + 1] * (1 - spread) + cloudCol[i3 + 1] * spread - curCol[i3 + 1]) * 0.09;
          curCol[i3 + 2] += (tgtCol[i3 + 2] * (1 - spread) + cloudCol[i3 + 2] * spread - curCol[i3 + 2]) * 0.09;
        }
        pGeo.attributes.position.needsUpdate = true;
        pGeo.attributes.color.needsUpdate = true;

        camera.position.x += (mouseX * 0.35 + Math.sin(s * Math.PI * 2) * 0.25 - camera.position.x) * 0.04;
        camera.position.y += (0.15 + mouseY * -0.2 - camera.position.y) * 0.04;
        camera.lookAt(0, 0.05, 0);
        shaderUniforms.uTime.value = tt;
        shaderUniforms.uMouse.value.set(mouseX, -mouseY);
        shaderUniforms.uScroll.value = s;

        /* 실물 스크린샷 크로스페이드 — 입자 수렴 거리 기반 블러→초점 */
        const fi2 = s >= PROD_START - 0.015 && s < FINAL_START - 0.02
          ? Math.max(0, Math.min(PRODUCTS.length - 1, Math.floor((s - PROD_START) / SEG))) : -1;
        for (let i = 0; i < PRODUCTS.length; i++) {
          const im = shotImgs[i];
          let target = 0;
          if (i === fi2 && imgReady[i]) {
            const tp = imgPos[i];
            let err = 0, cnt = 0;
            for (let k2 = 0; k2 < N; k2 += 173) {
              const k3 = k2 * 3;
              err += Math.abs(curPos[k3] - tp[k3]) + Math.abs(curPos[k3 + 1] - tp[k3 + 1]);
              cnt++;
            }
            err /= cnt;
            target = Math.max(0, Math.min(1, (0.9 - err) / 0.85));
            target *= target;
          }
          shotO[i] += (target - shotO[i]) * 0.055;
          const o = shotO[i];
          if (!im) continue;
          if (o < 0.01) { im.style.opacity = "0"; continue; }
          im.style.opacity = (o * 0.97).toFixed(3);
          im.style.filter = `blur(${((1 - o) * 16).toFixed(1)}px) saturate(1.05)`;
          const xo = i % 2 === 0 ? X_OFF : -X_OFF;
          const grow = 1 + (1 - o) * 0.025;
          const tl = new THREE.Vector3(xo - (IMG_W * grow) / 2, 0.15 + (IMG_H * grow) / 2, 0).project(camera);
          const br = new THREE.Vector3(xo + (IMG_W * grow) / 2, 0.15 - (IMG_H * grow) / 2, 0).project(camera);
          const x1 = (tl.x * 0.5 + 0.5) * innerWidth, y1 = (-tl.y * 0.5 + 0.5) * innerHeight;
          const x2 = (br.x * 0.5 + 0.5) * innerWidth, y2 = (-br.y * 0.5 + 0.5) * innerHeight;
          im.style.left = x1 + "px"; im.style.top = y1 + "px";
          im.style.width = x2 - x1 + "px"; im.style.height = y2 - y1 + "px";
        }
        /* 이미지 선명 → 형성 입자 완전 페이드 (삐져나옴 방지) */
        const oNow = fi2 >= 0 ? shotO[fi2] : 0;
        pMat.opacity = Math.max(0, 1 - oNow * 1.25);
        const dimT = fi2 >= 0 ? 1 - spread : 0;
        shaderUniforms.uDim.value += (dimT - shaderUniforms.uDim.value) * 0.06;

        /* 오버레이 */
        heroSlide?.classList.toggle("active", s < HERO_END * 0.8);
        finalSlide?.classList.toggle("active", s > FINAL_START);
        for (let i = 0; i < PRODUCTS.length; i++) {
          const st = PROD_START + i * SEG;
          const p = (s - st) / SEG;
          panels[i]?.classList.toggle("active", p >= 0.22 && p <= 0.8);
          if (dashes[i]) dashes[i].style.height = Math.max(0, Math.min(1, p)) * 100 + "%";
        }
        dots.forEach((dot, i) => {
          const startY = (i * 17) % 80 + 10;
          let sp = 90 + (i * 55) % 180;
          if (i % 2 === 0) sp = -sp;
          const y = startY + s * sp;
          dot.style.top = (((y % 100) + 100) % 100) + "%";
        });

        renderer.render(scene, camera);
      }
      animate();
      cleanupFns.push(() => renderer.dispose());
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanupFns.forEach((f) => f());
      document.body.classList.remove("ob-on");
    };
  }, [isStatic]);

  const oneOf = (slug: string, en: string) =>
    lang === "ko" ? KO_ONELINERS[slug] ?? en : en;

  /* ---- 정적 폴백 (data-motion=static) ---- */
  if (isStatic !== false) {
    return (
      <div className="ob-fallback wrap" data-pending={isStatic === null ? "1" : undefined}>
        <h1 className="ob-fb-title">{t(SITE.positioning, "폐쇄망 환경을 위한 검증 도구.")}</h1>
        <p className="ob-fb-sub">
          {t(
            "Nine desktop instruments. Built for rooms where the network is deliberately absent.",
            "아홉 개의 데스크톱 도구. 네트워크가 의도적으로 존재하지 않는 방을 위해."
          )}
        </p>
        <div className="ob-fb-grid">
          {PRODUCTS.map((p) => (
            <LLink key={p.slug} className="ob-fb-card" href={`/products/${p.slug}`}>
              {p.image && <img src={asset(p.image)} alt={`${p.name} screenshot`} loading="lazy" />}
              <b>{p.name}</b>
              <span className={STATUS_CLASS[p.status]}>{STATUS_LABEL[p.status]}</span>
              <p>{oneOf(p.slug, p.oneLiner)}</p>
            </LLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="ob-root" ref={rootRef}>
      <div className="ob-cur-in" aria-hidden />
      <div className="ob-cur-out" aria-hidden />
      <canvas className="ob-webgl" aria-hidden />

      {/* 실물 스크린샷 레이어 (입자 응집 완료 시 크로스페이드) */}
      <div className="ob-shots" aria-hidden>
        {PRODUCTS.map((p) => (
          <img key={p.slug} className="ob-shot" src={p.image ? asset(p.image) : undefined} alt="" />
        ))}
      </div>

      {/* 히어로 슬라이드 */}
      <div className="ob-slide ob-slide-hero">
        <h1 className="ob-title">
          {t("Verification tools", "폐쇄망 환경을")}
          <br />
          {t("for air-gapped environments.", "위한 검증 도구.")}
        </h1>
        <div className="ob-cols">
          <p>
            {t(
              "Nine desktop instruments. Built for rooms where the network is deliberately absent.",
              "아홉 개의 데스크톱 도구. 네트워크가 의도적으로 존재하지 않는 방을 위해."
            )}
          </p>
          <p>
            {t(
              "Defense · Aerospace · Industrial · Semiconductor. They run where the internet doesn't reach.",
              "국방 · 항공우주 · 산업 · 반도체. 인터넷이 닿지 않는 곳에서 동작합니다."
            )}
          </p>
        </div>
      </div>

      {/* 제품 패널 9개 — 지그재그 */}
      {PRODUCTS.map((p, i) => (
        <div key={p.slug} className={`ob-panel ${i % 2 === 0 ? "ob-panel--l" : "ob-panel--r"}`}>
          <div className="ob-p-idx">
            {String(i + 1).padStart(2, "0")} <b>/ 09</b>
          </div>
          <div className="ob-p-name">{p.name}</div>
          <div className="ob-p-verb">{verbLabel(p.verb)}</div>
          <p className="ob-p-one">{oneOf(p.slug, p.oneLiner)}</p>
          <LLink className="ob-p-link" href={`/products/${p.slug}`}>
            {t("Open specification", "사양 열기")} ↗
          </LLink>
        </div>
      ))}

      {/* 피날레 */}
      <div className="ob-slide ob-slide-final">
        <h2 className="ob-title">
          Proof,
          <br />
          not consensus.
        </h2>
        <p className="ob-final-sub">
          {t(
            "Offline-first. Deterministic. Single-file.",
            "합의가 아니라 증명. 아홉 개의 도구가 폐쇄망 안에서 그것을 만듭니다."
          )}
        </p>
        <LLink className="ob-cta" href="/products">
          {t("Browse the nine tools", "9개 도구 살펴보기")} ↗
        </LLink>
      </div>

      {/* 그리드 라인 + 진행 대시 */}
      <div className="ob-hline" aria-hidden />
      <div className="ob-grid" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="ob-gline">
            <span className="ob-gdot" />
            <span className="ob-gdot" />
          </div>
        ))}
        <div className="ob-gline">
          <span className="ob-gdot" />
          <span className="ob-gdot" />
          <div className="ob-dashes">
            {PRODUCTS.map((p) => (
              <span key={p.slug} className="ob-dash">
                <span className="ob-dash-fill" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
