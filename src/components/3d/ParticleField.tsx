"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "@/state/store";

const vertexShader = `
uniform float uTime;
uniform float uNoiseScale;
uniform float uNoiseSpeed;
uniform float uDistortion;
uniform vec2 uMouse;
uniform float uParticleSize;
attribute float aRandom;
varying float vAlpha;
varying float vDistance;

vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main(){
  vec3 pos=position;
  float n1=snoise(pos*uNoiseScale+uTime*uNoiseSpeed)*0.6;
  float n2=snoise(pos*uNoiseScale*0.5+uTime*uNoiseSpeed*0.5+100.0)*0.4;
  pos.x+=n1*uDistortion*aRandom;
  pos.y+=n2*uDistortion*aRandom;
  pos.z+=snoise(pos*uNoiseScale*0.3+uTime*uNoiseSpeed*0.3)*uDistortion*0.3;
  float mouseInf=1.0-smoothstep(0.0,3.0,length(pos.xy-uMouse*2.0));
  pos.xy+=normalize(pos.xy-uMouse*2.0+0.001)*mouseInf*0.2;
  vec4 mvPos=modelViewMatrix*vec4(pos,1.0);
  vDistance=-mvPos.z;
  vAlpha=smoothstep(20.0,3.0,vDistance)*(0.15+aRandom*0.2);
  gl_PointSize=uParticleSize*(200.0/-mvPos.z)*(0.3+aRandom*0.7);
  gl_Position=projectionMatrix*mvPos;
}
`;

const fragmentShader = `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;
varying float vAlpha;
varying float vDistance;

void main(){
  vec2 center=gl_PointCoord-vec2(0.5);
  float dist=length(center);
  if(dist>0.5) discard;
  float core=exp(-dist*8.0);
  float colorMix=sin(vDistance*0.2+uTime*0.3)*0.5+0.5;
  vec3 color=mix(uColorA,uColorB,colorMix);
  float alpha=core*vAlpha;
  gl_FragColor=vec4(color,alpha);
}
`;

interface ParticleFieldProps { count?: number; radius?: number; }

export default function ParticleField({ count: countOverride, radius = 8 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const isMobile = useAppStore((s) => s.isMobile);
  const cursorPosition = useAppStore((s) => s.cursorPosition);
  const params = useAppStore((s) => s.playgroundParams);
  const count = countOverride ?? (isMobile ? 800 : params.particleCount);

  const { positions, randoms } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random());
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      rnd[i] = Math.random();
    }
    return { positions: pos, randoms: rnd };
  }, [count, radius]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNoiseScale: { value: params.noiseScale },
      uNoiseSpeed: { value: params.noiseSpeed },
      uDistortion: { value: params.distortion },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uParticleSize: { value: params.particleSize },
      uColorA: { value: new THREE.Color(params.colorA) },
      uColorB: { value: new THREE.Color(params.colorB) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    const mat = materialRef.current;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uMouse.value.set(cursorPosition.x, cursorPosition.y);
    mat.uniforms.uNoiseScale.value = params.noiseScale;
    mat.uniforms.uNoiseSpeed.value = params.noiseSpeed;
    mat.uniforms.uDistortion.value = params.distortion;
    mat.uniforms.uParticleSize.value = params.particleSize;
    mat.uniforms.uColorA.value.set(params.colorA);
    mat.uniforms.uColorB.value.set(params.colorB);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
