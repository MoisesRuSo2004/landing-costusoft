"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Scene palette ─────────────────────────────────────────
const SCENE_PALETTE = [
  "#2563eb", "#49c21b", "#7c3aed", "#2563eb",
  "#f59e0b", "#2563eb", "#f59e0b", "#49c21b", "#49c21b",
];

// ── Flying object config per destination scene ────────────
const FLY_SHAPES: Record<number, { geo: string; color: string; label: string }> = {
  0: { geo: "sphere",      color: "#2563eb", label: "" },
  1: { geo: "sphere",      color: "#2563eb", label: "" },
  2: { geo: "torus",       color: "#49c21b", label: "Roles" },
  3: { geo: "box",         color: "#7c3aed", label: "Pedido" },
  4: { geo: "ring_check",  color: "#2563eb", label: "Confirmado" },
  5: { geo: "cylinder",    color: "#f59e0b", label: "Material" },
  6: { geo: "octahedron",  color: "#2563eb", label: "Plan ILP" },
  7: { geo: "tetrahedron", color: "#f59e0b", label: "Producción" },
  8: { geo: "icosahedron", color: "#49c21b", label: "IA" },
};

// ── Circular glow sprite ──────────────────────────────────
function makeGlowSprite(size = 128): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = size; c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0.00, "rgba(255,255,255,1.00)");
  g.addColorStop(0.20, "rgba(255,255,255,0.90)");
  g.addColorStop(0.45, "rgba(255,255,255,0.45)");
  g.addColorStop(0.70, "rgba(255,255,255,0.12)");
  g.addColorStop(1.00, "rgba(255,255,255,0.00)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

// ── Shape geometry helper ─────────────────────────────────
function ShapeGeo({ geo }: { geo: string }) {
  if (geo === "box")         return <boxGeometry args={[0.38, 0.48, 0.08]} />;
  if (geo === "torus")       return <torusGeometry args={[0.26, 0.08, 8, 28]} />;
  if (geo === "ring_check")  return <torusGeometry args={[0.28, 0.055, 8, 28]} />;
  if (geo === "cylinder")    return <cylinderGeometry args={[0.13, 0.13, 0.46, 10]} />;
  if (geo === "octahedron")  return <octahedronGeometry args={[0.30, 0]} />;
  if (geo === "tetrahedron") return <tetrahedronGeometry args={[0.34, 0]} />;
  if (geo === "icosahedron") return <icosahedronGeometry args={[0.27, 0]} />;
  return <sphereGeometry args={[0.22, 10, 10]} />;
}

// ── Flying 3D transition object ───────────────────────────
function FlyingObject({
  toScene, direction, transitionSignal,
}: {
  toScene: number; direction: number; transitionSignal: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const flyT     = useRef(-1);
  const prevSig  = useRef(-1);

  // Arc curve — recomputed when direction changes
  const curve = useMemo(() => {
    const sx = direction > 0 ? -11 : 11;
    const ex = direction > 0 ?  11 : -11;
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(sx, -0.8, 0.5),
      new THREE.Vector3(0,   3.8, 3.5),
      new THREE.Vector3(ex, -0.8, 0.5),
    );
  }, [direction]);

  const shape = FLY_SHAPES[toScene] ?? FLY_SHAPES[3];

  // Trigger on scene transition
  useEffect(() => {
    if (transitionSignal !== prevSig.current && transitionSignal > 0) {
      flyT.current = 0;
      prevSig.current = transitionSignal;
    }
  }, [transitionSignal]);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;

    if (flyT.current < 0) {
      g.visible = false;
      return;
    }

    g.visible = true;
    flyT.current = Math.min(flyT.current + delta * 0.85, 1.08);

    const t  = Math.min(flyT.current, 1.0);
    const pt = curve.getPoint(t);
    g.position.copy(pt);

    // Spin
    g.rotation.x += delta * 2.1;
    g.rotation.y += delta * 1.65;
    g.rotation.z += delta * 0.85;

    // Scale envelope: grow in, full, shrink out
    const env = t < 0.18 ? t / 0.18 : t > 0.82 ? (1 - t) / 0.18 : 1;
    g.scale.setScalar(0.55 + env * 0.6);

    // Opacity via traverse
    g.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = env * (mesh.userData.baseOp ?? 0.9);
      }
    });

    if (flyT.current >= 1.08) flyT.current = -1;
  });

  // Cache base opacities after first mount
  useEffect(() => {
    groupRef.current?.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && !mesh.userData.baseOp) {
        mesh.userData.baseOp = (mesh.material as THREE.MeshBasicMaterial).opacity;
      }
    });
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* Main shape */}
      <mesh>
        <ShapeGeo geo={shape.geo} />
        <meshBasicMaterial
          color={shape.color}
          transparent opacity={0.92}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Inner bright core */}
      <mesh scale={0.45}>
        <sphereGeometry args={[0.6, 8, 8]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Outer soft glow */}
      <mesh>
        <sphereGeometry args={[0.68, 8, 8]} />
        <meshBasicMaterial
          color={shape.color}
          transparent opacity={0.10}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.50, 0.018, 4, 28]} />
        <meshBasicMaterial
          color={shape.color}
          transparent opacity={0.40}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ── Main particle network + connection lines ──────────────
const N = 90, N_AMB = 55, MAX_LINES = 220;
const DIST_SQ = 4.8 * 4.8;
const WHITE = new THREE.Color(1, 1, 1);
const _c = new THREE.Color();

function ParticleField({ sceneIndex, transitionSignal }: { sceneIndex: number; transitionSignal: number }) {
  const ptsRef   = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const sprite   = useMemo(() => makeGlowSprite(128), []);

  const basePos     = useMemo(() => { const a = new Float32Array(N * 3); for (let i = 0; i < N; i++) { a[i*3] = (Math.random()-.5)*24; a[i*3+1] = (Math.random()-.5)*13; a[i*3+2] = (Math.random()-.5)*7; } return a; }, []);
  const phases      = useMemo(() => { const a = new Float32Array(N * 3); for (let i = 0; i < N*3; i++) a[i] = Math.random()*Math.PI*2; return a; }, []);
  const floatSpeeds = useMemo(() => { const a = new Float32Array(N * 3); for (let i = 0; i < N*3; i++) a[i] = .18+Math.random()*.45; return a; }, []);
  const burstDirs   = useMemo(() => { const a = new Float32Array(N * 3); for (let i = 0; i < N; i++) { const ag = Math.random()*Math.PI*2, el = (Math.random()-.5)*Math.PI; a[i*3] = Math.cos(el)*Math.cos(ag); a[i*3+1] = Math.cos(el)*Math.sin(ag); a[i*3+2] = Math.sin(el); } return a; }, []);

  const curPos  = useMemo(() => new Float32Array(N * 3), []);
  const curCol  = useMemo(() => new Float32Array(N * 3), []);
  const linePos = useMemo(() => new Float32Array(MAX_LINES * 6), []);
  const lineCol = useMemo(() => new Float32Array(MAX_LINES * 6), []);

  const sceneColor = useRef(new THREE.Color(SCENE_PALETTE[0]));
  const burst      = useRef(0);
  const prevSig    = useRef(transitionSignal);

  useEffect(() => {
    if (transitionSignal !== prevSig.current) {
      burst.current = 1.0;
      prevSig.current = transitionSignal;
      for (let i = 0; i < N; i++) {
        const ag = Math.random()*Math.PI*2, el = (Math.random()-.5)*Math.PI;
        burstDirs[i*3] = Math.cos(el)*Math.cos(ag);
        burstDirs[i*3+1] = Math.cos(el)*Math.sin(ag);
        burstDirs[i*3+2] = Math.sin(el);
      }
    }
  }, [transitionSignal, burstDirs]);

  useEffect(() => {
    const p = ptsRef.current, l = linesRef.current;
    if (p) { (p.geometry.attributes.position as THREE.BufferAttribute).usage = THREE.DynamicDrawUsage; (p.geometry.attributes.color as THREE.BufferAttribute).usage = THREE.DynamicDrawUsage; }
    if (l) { (l.geometry.attributes.position as THREE.BufferAttribute).usage = THREE.DynamicDrawUsage; (l.geometry.attributes.color as THREE.BufferAttribute).usage = THREE.DynamicDrawUsage; }
  }, []);

  useFrame(({ clock }) => {
    if (!ptsRef.current || !linesRef.current) return;
    const t = clock.getElapsedTime();

    _c.set(SCENE_PALETTE[sceneIndex] ?? SCENE_PALETTE[0]);
    sceneColor.current.lerp(_c, 0.028);
    burst.current *= 0.86;
    const b = burst.current, bs = b * 4.2;

    for (let i = 0; i < N; i++) {
      const bx = basePos[i*3], by = basePos[i*3+1], bz = basePos[i*3+2];
      const px = phases[i*3], py = phases[i*3+1], pz = phases[i*3+2];
      const sx = floatSpeeds[i*3], sy = floatSpeeds[i*3+1], sz = floatSpeeds[i*3+2];

      const fx = bx + Math.sin(t*sx+px)*0.38 + Math.cos(t*sx*.5+py)*0.12;
      const fy = by + Math.cos(t*sy+py)*0.28 + Math.sin(t*.25+i)*0.10;
      const fz = bz + Math.sin(t*sz+pz)*0.20;

      curPos[i*3]   = fx + burstDirs[i*3]   * bs;
      curPos[i*3+1] = fy + burstDirs[i*3+1] * bs;
      curPos[i*3+2] = fz + burstDirs[i*3+2] * bs;

      const sh = 0.55 + Math.sin(t*.7+i*.38)*.20;
      _c.copy(sceneColor.current).lerp(WHITE, sh*.40);
      const fade = Math.max(0.05, 1 - b*.55);
      curCol[i*3] = _c.r*fade; curCol[i*3+1] = _c.g*fade; curCol[i*3+2] = _c.b*fade;
    }

    let lc = 0;
    for (let i = 0; i < N && lc < MAX_LINES; i++) {
      for (let j = i+1; j < N && lc < MAX_LINES; j++) {
        const dx = curPos[i*3]-curPos[j*3], dy = curPos[i*3+1]-curPos[j*3+1], dz = curPos[i*3+2]-curPos[j*3+2];
        const dsq = dx*dx+dy*dy+dz*dz;
        if (dsq < DIST_SQ) {
          const alpha = (1-Math.sqrt(dsq)/4.8)*.38*(1-b*.7);
          const r = sceneColor.current.r*alpha, g = sceneColor.current.g*alpha, bl = sceneColor.current.b*alpha;
          const o = lc*6;
          linePos[o]=curPos[i*3]; linePos[o+1]=curPos[i*3+1]; linePos[o+2]=curPos[i*3+2];
          linePos[o+3]=curPos[j*3]; linePos[o+4]=curPos[j*3+1]; linePos[o+5]=curPos[j*3+2];
          lineCol[o]=r; lineCol[o+1]=g; lineCol[o+2]=bl;
          lineCol[o+3]=r; lineCol[o+4]=g; lineCol[o+5]=bl;
          lc++;
        }
      }
    }

    const pGeo = ptsRef.current.geometry;
    (pGeo.attributes.position as THREE.BufferAttribute).set(curPos); (pGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (pGeo.attributes.color    as THREE.BufferAttribute).set(curCol); (pGeo.attributes.color    as THREE.BufferAttribute).needsUpdate = true;

    const lGeo = linesRef.current.geometry;
    (lGeo.attributes.position as THREE.BufferAttribute).set(linePos); (lGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (lGeo.attributes.color    as THREE.BufferAttribute).set(lineCol); (lGeo.attributes.color    as THREE.BufferAttribute).needsUpdate = true;
    lGeo.setDrawRange(0, lc * 2);
  });

  return (
    <>
      <points ref={ptsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[curPos, 3]} />
          <bufferAttribute attach="attributes-color"    args={[curCol, 3]} />
        </bufferGeometry>
        <pointsMaterial map={sprite} size={0.30} vertexColors transparent opacity={1} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} alphaTest={0.001} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
          <bufferAttribute attach="attributes-color"    args={[lineCol, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </>
  );
}

// ── Ambient dust ──────────────────────────────────────────
function AmbientDust() {
  const ref    = useRef<THREE.Points>(null);
  const sprite = useMemo(() => makeGlowSprite(64), []);

  const [pos, col] = useMemo(() => {
    const p = new Float32Array(N_AMB*3), c = new Float32Array(N_AMB*3);
    for (let i = 0; i < N_AMB; i++) {
      p[i*3]=(Math.random()-.5)*32; p[i*3+1]=(Math.random()-.5)*18; p[i*3+2]=(Math.random()-.5)*12;
      const v=.06+Math.random()*.08; c[i*3]=v; c[i*3+1]=v; c[i*3+2]=v+Math.random()*.1;
    }
    return [p, c];
  }, []);

  const phases  = useMemo(() => { const a=new Float32Array(N_AMB*2); for(let i=0;i<N_AMB*2;i++) a[i]=Math.random()*Math.PI*2; return a; }, []);
  const curPos  = useMemo(() => new Float32Array(pos), [pos]);

  useEffect(() => { const a = ref.current?.geometry.attributes.position as THREE.BufferAttribute|undefined; if(a) a.usage = THREE.DynamicDrawUsage; }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < N_AMB; i++) {
      curPos[i*3]   = pos[i*3]   + Math.sin(t*.28+phases[i*2])*  .55;
      curPos[i*3+1] = pos[i*3+1] + Math.cos(t*.22+phases[i*2+1])*.40;
      curPos[i*3+2] = pos[i*3+2] + Math.sin(t*.18+phases[i*2]*1.3)*.30;
    }
    (ref.current.geometry.attributes.position as THREE.BufferAttribute).set(curPos);
    (ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[curPos, 3]} />
        <bufferAttribute attach="attributes-color"    args={[col,    3]} />
      </bufferGeometry>
      <pointsMaterial map={sprite} size={0.12} vertexColors transparent opacity={0.50} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} alphaTest={0.001} />
    </points>
  );
}

// ── Role node halos ───────────────────────────────────────
const ROLE_COLORS: string[] = ["#2563eb", "#49c21b", "#f59e0b", "#7c3aed"];
const ROLE_BASE: [number, number, number][] = [[-6,2.5,-2],[6,2.5,-2],[-6,-2.5,-2],[6,-2.5,-2]];

function RoleNodes({ sceneIndex }: { sceneIndex: number }) {
  const coreRefs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];
  const ringRefs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    coreRefs.forEach((r, i) => {
      if (!r.current) return;
      r.current.position.x = ROLE_BASE[i][0] + Math.cos(t*.38+i*1.2)*.22;
      r.current.position.y = ROLE_BASE[i][1] + Math.sin(t*.52+i*1.5)*.34;
      r.current.rotation.z = t*.4+i;
    });
    ringRefs.forEach((r, i) => {
      if (!r.current) return;
      r.current.position.x = ROLE_BASE[i][0] + Math.cos(t*.38+i*1.2)*.22;
      r.current.position.y = ROLE_BASE[i][1] + Math.sin(t*.52+i*1.5)*.34;
      r.current.scale.setScalar(1 + Math.sin(t*1.8+i*1.1)*.12);
      (r.current.material as THREE.MeshBasicMaterial).opacity = (sceneIndex===i+1||sceneIndex===0) ? .55 : .18;
    });
  });

  return (
    <>
      {ROLE_COLORS.map((color, i) => (
        <group key={i}>
          <mesh ref={coreRefs[i]} position={ROLE_BASE[i]}>
            <sphereGeometry args={[0.10, 14, 14]} />
            <meshBasicMaterial color={color} transparent opacity={0.9} />
          </mesh>
          <mesh ref={ringRefs[i]} position={ROLE_BASE[i]}>
            <torusGeometry args={[0.28, 0.022, 8, 36]} />
            <meshBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      ))}
    </>
  );
}

// ── Scrolling grid floor ──────────────────────────────────
function GridFloor({ sceneIndex }: { sceneIndex: number }) {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.z = ((clock.getElapsedTime() * .4) % 2) - 1;
  });
  return <gridHelper ref={ref} args={[60, 60, SCENE_PALETTE[sceneIndex] ?? "#0b3d91", "#0a1d42"]} position={[0, -7, -5]} />;
}

// ── Mouse-parallax camera ─────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const mouse  = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - .5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - .5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    smooth.current.x += (mouse.current.x - smooth.current.x) * .032;
    smooth.current.y += (mouse.current.y - smooth.current.y) * .032;
    camera.position.x = smooth.current.x * .9;
    camera.position.y = -smooth.current.y * .6 + .3;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── Root ──────────────────────────────────────────────────
export default function ThreeBackground({
  sceneIndex,
  transitionSignal,
  direction,
}: {
  sceneIndex: number;
  transitionSignal: number;
  direction: number;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 58 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <ParticleField sceneIndex={sceneIndex} transitionSignal={transitionSignal} />
        <AmbientDust />
        <RoleNodes sceneIndex={sceneIndex} />
        <GridFloor sceneIndex={sceneIndex} />
        <CameraRig />
      </Canvas>
    </div>
  );
}
