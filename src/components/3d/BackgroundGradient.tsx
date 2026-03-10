"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "@/state/store";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScrollProgress;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec3 color = vec3(0.0);
  float t = uTime * 0.03;

  // Flowing noise base
  float n1 = fbm(uv * 2.0 + t * 0.5);
  float n2 = fbm(uv * 3.0 - t * 0.3 + 10.0);

  // Orb 1: Deep blue nebula
  vec2 p1 = vec2(0.25 + sin(t * 2.3) * 0.2, 0.6 + cos(t * 1.7) * 0.2);
  float d1 = length(uv - p1);
  float orb1 = smoothstep(0.55, 0.0, d1) * (0.5 + n1 * 0.5);
  color += vec3(0.01, 0.03, 0.12) * orb1;

  // Orb 2: Dark teal
  vec2 p2 = vec2(0.75 + cos(t * 1.8) * 0.2, 0.35 + sin(t * 2.1) * 0.2);
  float d2 = length(uv - p2);
  float orb2 = smoothstep(0.5, 0.0, d2) * (0.5 + n2 * 0.5);
  color += vec3(0.005, 0.04, 0.05) * orb2;

  // Orb 3: Subtle warm
  vec2 p3 = vec2(0.5 + sin(t * 1.5) * 0.3, 0.7 + cos(t * 1.2) * 0.2);
  float d3 = length(uv - p3);
  float orb3 = smoothstep(0.6, 0.0, d3) * n1;
  color += vec3(0.03, 0.01, 0.005) * orb3;

  // Orb 4: Subtle indigo (moves with scroll)
  vec2 p4 = vec2(0.6, 0.3 + uScrollProgress * 0.4);
  float d4 = length(uv - p4);
  float orb4 = smoothstep(0.5, 0.0, d4) * 0.6;
  color += vec3(0.015, 0.01, 0.04) * orb4;

  // Mouse influence
  vec2 m = uMouse * 0.5 + 0.5;
  float md = length(uv - m);
  color += vec3(0.008, 0.015, 0.025) * smoothstep(0.35, 0.0, md);

  // Grain
  float grain = (hash(uv * vec2(uTime * 100.0, uTime * 73.0)) - 0.5) * 0.006;
  color += grain;

  // Vignette
  float vig = 1.0 - smoothstep(0.4, 1.2, length(uv - 0.5) * 1.2);
  color *= 0.7 + vig * 0.3;

  gl_FragColor = vec4(max(color, 0.0), 1.0);
}
`;

export default function BackgroundGradient() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const cursor = useAppStore((s) => s.cursorPosition);
  const scroll = useAppStore((s) => s.scrollProgress);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScrollProgress: { value: 0 },
  }), []);

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    matRef.current.uniforms.uMouse.value.set(cursor.x, cursor.y);
    matRef.current.uniforms.uScrollProgress.value = scroll;
  });

  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
