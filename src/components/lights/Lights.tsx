import * as React from "react";

export const Lights: React.FC = () => {
  return (
    <>
      {/* <fog attach="fog" args={["#fff", 900, 4000]} /> */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[-100, 800, -100]}
        intensity={0}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={5000}
        shadow-camera-left={-500}
        shadow-camera-bottom={-500}
        shadow-camera-right={500}
        shadow-camera-top={500}
        castShadow
      ></directionalLight>
      <pointLight position={[0, 500, 0]} intensity={2}></pointLight>
    </>
  );
};
