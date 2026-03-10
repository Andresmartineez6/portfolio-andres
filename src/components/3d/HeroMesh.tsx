"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "@/state/store";

const vertexShader = `
uniform float uTime;
uniform float uDistortion;
uniform vec2 uMouse;
uniform float uHover;
varying vec2 vUv;
varying float vDisplacement;
varying vec3 vNormal;
varying vec3 vPosition;

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
  vUv=uv;
  vNormal=normal;
  vec3 pos=position;
  float n1=snoise(pos*1.2+uTime*0.15);
  float n2=snoise(pos*2.5+uTime*0.08)*0.4;
  float displacement=(n1+n2)*uDistortion;
  vec2 mouseDir=uMouse*1.0;
  float mouseDist=length(pos.xy-mouseDir);
  float mouseEff=smoothstep(2.5,0.0,mouseDist)*uHover*0.15;
  displacement+=mouseEff;
  pos+=normal*displacement;
  vDisplacement=displacement;
  vPosition=pos;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);
}
`;

const fragmentShader = `
uniform float uTime;
varying vec2 vUv;
varying float vDisplacement;
varying vec3 vNormal;
varying vec3 vPosition;

void main(){
  vec3 viewDir=normalize(cameraPosition-vPosition);
  float fresnel=pow(1.0-max(dot(viewDir,vNormal),0.0),4.0);
  vec3 darkBase=vec3(0.02,0.02,0.04);
  vec3 edgeColor=vec3(0.25,0.5,0.6);
  vec3 highlightColor=vec3(0.4,0.82,1.0);
  vec3 lightDir=normalize(vec3(1.0,1.0,2.0));
  float diffuse=max(dot(vNormal,lightDir),0.0)*0.3+0.7;
  vec3 finalC=darkBase*diffuse;
  finalC+=edgeColor*fresnel*0.5;
  finalC+=highlightColor*fresnel*fresnel*0.3;
  finalC+=sin(vPosition.y*30.0+uTime*1.5)*0.005;
  float alpha=0.35+fresnel*0.45;
  gl_FragColor=vec4(finalC,alpha);
}
`;

export default function HeroMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const hoverRef = useRef(0);
  const cursorPosition = useAppStore((s) => s.cursorPosition);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistortion: { value: 0.12 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uHover: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current || !meshRef.current) return;
    const mat = materialRef.current;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uMouse.value.set(cursorPosition.x, cursorPosition.y);
    mat.uniforms.uHover.value += (hoverRef.current - mat.uniforms.uHover.value) * 0.03;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.08;
  });

  return (
    <group position={[0, 0, -1]}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => { hoverRef.current = 1; }}
        onPointerLeave={() => { hoverRef.current = 0; }}
      >
        <icosahedronGeometry args={[1.1, 48]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh rotation-y={0.3}>
        <icosahedronGeometry args={[1.25, 2]} />
        <meshBasicMaterial wireframe transparent opacity={0.04} color="#64d2ff" />
      </mesh>
    </group>
  );
}
