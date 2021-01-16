import * as React from "react";
import { Suspense } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { Loader, OrbitControls } from "@react-three/drei";
import Model from "./components/cube/Cube";
import { Floor } from "./components/floor/Floor";
import { Lights } from "./components/lights/Lights";
import { useSpring } from "react-spring";

const ZoomWithOrbital = () => {
  const { gl, camera } = useThree();
  useSpring({
    from: {
      x: 1500,
      y: 1500,
      z: 1500,
    },
    x: 1200,
    y: 1200,
    z: 1200,
    onFrame: ({ x, y, z }: { x: number; y: number; z: number }) => {
      camera.position.x = x;
      camera.position.y = y;
      camera.position.z = z;
    },
  });
  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      enableRotate={false}
      target={[0, 0, 0]}
      args={[camera, gl.domElement]}
    />
  );
};
export const App: React.FC<{}> = () => (
  <div className={"app"}>
    <Canvas
      colorManagement
      shadowMap
      camera={{
        aspect: window.innerWidth / window.innerHeight,
        far: 10000,
        near: 400,
        fov: 50,
      }}
    >
      <Lights />
      <Suspense fallback={null}>
        <Model attach={"mesh"} />
        <Floor />
        <axesHelper scale={[500, 700, 1000]} />
        <ZoomWithOrbital />
      </Suspense>
    </Canvas>
    <Loader />
  </div>
);
