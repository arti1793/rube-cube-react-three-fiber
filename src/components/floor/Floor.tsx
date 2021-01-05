import * as React from "react";

export const Floor = () => {
  return (
    <>
      <mesh
        attach={"mesh"}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -500, 0]}
        receiveShadow
      >
        <planeBufferGeometry
          attach={"geometry"}
          args={[3000, 3000]}
        ></planeBufferGeometry>
        <shadowMaterial attach={"material"} opacity={0.4}></shadowMaterial>
      </mesh>
    </>
  );
};
