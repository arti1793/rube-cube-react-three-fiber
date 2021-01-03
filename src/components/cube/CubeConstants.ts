import { GLTFResult, ICubiePart } from "./CubeTypes";

export const cubeConfig2: (result: GLTFResult) => ICubiePart[][] = ({
  materials,
  nodes,
}) => {
  const halfPi = Math.PI / 2;
  return [
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube015_Cube_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
      {
        type: "label",
        material: materials.material,
        geometry: nodes.Cube035_Red_0.geometry,
        rotation: [-halfPi, halfPi, 0],
      },
      {
        type: "label",
        material: materials.Yellow,
        geometry: nodes.Cube085_Yellow_0.geometry,
        rotation: [Math.PI, 0, Math.PI],
      },
      {
        type: "label",
        material: materials.Blue,
        geometry: nodes.Cube065_Blue_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube010_Cube_0.geometry,
        rotation: [0, 1.57, 0],
      },
      {
        type: "label",
        material: materials.material,
        geometry: nodes.Cube037_Red_0.geometry,
        rotation: [0, 1.57, 0],
      },
      {
        type: "label",
        material: materials.Yellow,
        geometry: nodes.Cube086_Yellow_0.geometry,
        rotation: [Math.PI, 0, Math.PI],
      },
    ],

    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube016_Cube_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
      {
        type: "label",
        material: materials.material,
        geometry: nodes.Cube033_Red_0.geometry,
        rotation: [-halfPi, halfPi, 0],
      },
      {
        type: "label",
        material: materials.Yellow,
        geometry: nodes.Cube078_Yellow_0.geometry,
        rotation: [Math.PI, 0, Math.PI],
      },
      {
        type: "label",
        material: materials.Green,
        geometry: nodes.Cube048_Green_0.geometry,
        rotation: [halfPi, 0, Math.PI],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube012_Cube_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
      {
        type: "label",
        material: materials.material,
        geometry: nodes.Cube041_Red_0.geometry,
        rotation: [-halfPi, halfPi, 0],
      },
      {
        type: "label",
        material: materials.Green,
        geometry: nodes.Cube049_Green_0.geometry,
        rotation: [halfPi, 0, Math.PI],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube017_Cube_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
      {
        type: "label",
        material: materials.material,
        geometry: nodes.Cube036_Red_0.geometry,
        rotation: [-halfPi, halfPi, 0],
      },
      {
        type: "label",
        material: materials.Green,
        geometry: nodes.Cube039_Green_0.geometry,
        rotation: [halfPi, 0, Math.PI],
      },
      {
        type: "label",
        material: materials.White,
        geometry: nodes.Cube075_White_0.geometry,
        rotation: [0, 0, 0],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube024_Cube_0.geometry,
        rotation: [0, 1.57, 0],
      },
      {
        type: "label",
        material: materials.material,
        geometry: nodes.Cube040_Red_0.geometry,
        rotation: [0, 1.57, 0],
      },
      {
        type: "label",
        material: materials.White,
        geometry: nodes.Cube074_White_0.geometry,
        rotation: [0, 0, 0],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube014_Cube_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
      {
        type: "label",
        material: materials.material,
        geometry: nodes.Cube034_Red_0.geometry,
        rotation: [-halfPi, halfPi, 0],
      },
      {
        type: "label",
        material: materials.White,
        geometry: nodes.Cube072_White_0.geometry,
        rotation: [0, 0, 0],
      },
      {
        type: "label",
        material: materials.Blue,
        geometry: nodes.Cube062_Blue_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube027_Cube_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
      {
        type: "label",
        material: materials.material,
        geometry: nodes.Cube060_Red_0.geometry,
        rotation: [-halfPi, halfPi, 0],
      },
      {
        type: "label",
        material: materials.Blue,
        geometry: nodes.Cube063_Blue_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube032_Cube_0.geometry,
        rotation: [-halfPi, 0, halfPi],
      },
      {
        type: "label",
        material: materials.Yellow,
        geometry: nodes.Cube084_Yellow_0.geometry,
        rotation: [-Math.PI, 0, -halfPi],
      },
      {
        type: "label",
        material: materials.Blue,
        geometry: nodes.Cube066_Blue_0.geometry,
        rotation: [-halfPi, 0, halfPi],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube021_Cube_0.geometry,
        rotation: [0, 1.57, 0],
      },
      {
        type: "label",
        material: materials.Yellow,
        geometry: nodes.Cube082_Yellow_0.geometry,
        rotation: [0, -1.57, 0],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube011_Cube_0.geometry,
        rotation: [-halfPi, 0, halfPi],
      },
      {
        type: "label",
        material: materials.Yellow,
        geometry: nodes.Cube079_Yellow_0.geometry,
        rotation: [-Math.PI, 0, -halfPi],
      },
      {
        type: "label",
        material: materials.Green,
        geometry: nodes.Cube047_Green_0.geometry,
        rotation: [halfPi, 0, -halfPi],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube025_Cube_0.geometry,
        rotation: [-halfPi, halfPi, 0],
      },
      {
        type: "label",
        material: materials.Green,
        geometry: nodes.Cube045_Green_0.geometry,
        rotation: [-halfPi, -halfPi, 0],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube030_Cube_0.geometry,
        rotation: [-halfPi, 0, halfPi],
      },
      {
        type: "label",
        material: materials.Green,
        geometry: nodes.Cube042_Green_0.geometry,
        rotation: [halfPi, 0, -halfPi],
      },
      {
        type: "label",
        material: materials.White,
        geometry: nodes.Cube076_White_0.geometry,
        rotation: [0, 0, halfPi],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube007_Cube_0.geometry,
        rotation: [0, 1.57, 0],
      },

      {
        type: "label",
        material: materials.White,
        geometry: nodes.Cube073_White_0.geometry,
        rotation: [0, 1.57, 0],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube031_Cube_0.geometry,
        rotation: [-halfPi, 0, halfPi],
      },
      {
        type: "label",
        material: materials.White,
        geometry: nodes.Cube071_White_0.geometry,
        rotation: [0, 0, halfPi],
      },
      {
        type: "label",
        material: materials.Blue,
        geometry: nodes.Cube061_Blue_0.geometry,
        rotation: [-halfPi, 0, halfPi],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube008_Cube_0.geometry,
        rotation: [-halfPi, halfPi, 0],
      },
      {
        type: "label",
        material: materials.Blue,
        geometry: nodes.Cube064_Blue_0.geometry,
        rotation: [-halfPi, halfPi, 0],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube020_Cube_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
      {
        type: "label",
        material: materials.Yellow,
        geometry: nodes.Cube083_Yellow_0.geometry,
        rotation: [Math.PI, 0, Math.PI],
      },
      {
        type: "label",
        material: materials.Blue,
        geometry: nodes.Cube067_Blue_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
      {
        type: "label",
        material: materials.Orange,
        geometry: nodes.Cube053_Orange_0.geometry,
        rotation: [-halfPi, -halfPi, 0],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube001_Cube_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
      {
        type: "label",
        material: materials.Blue,
        geometry: nodes.Cube068_Blue_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
      {
        type: "label",
        material: materials.Orange,
        geometry: nodes.Cube055_Orange_0.geometry,
        rotation: [-halfPi, -halfPi, 0],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube022_Cube_0.geometry,
        rotation: [0, 1.57, 0],
      },
      {
        type: "label",
        material: materials.Yellow,
        geometry: nodes.Cube081_Yellow_0.geometry,
        rotation: [Math.PI, 0, Math.PI],
      },
      {
        type: "label",
        material: materials.Orange,
        geometry: nodes.Cube052_Orange_0.geometry,
        rotation: [-Math.PI, -1.57, 0],
      },
    ],

    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube019_Cube_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
      {
        type: "label",
        material: materials.Yellow,
        geometry: nodes.Cube080_Yellow_0.geometry,
        rotation: [Math.PI, 0, Math.PI],
      },
      {
        type: "label",
        material: materials.Orange,
        geometry: nodes.Cube051_Orange_0.geometry,
        rotation: [-halfPi, -halfPi, 0],
      },
      {
        type: "label",
        material: materials.Green,
        geometry: nodes.Cube046_Green_0.geometry,
        rotation: [halfPi, 0, Math.PI],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube029_Cube_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
      {
        type: "label",
        material: materials.Green,
        geometry: nodes.Cube044_Green_0.geometry,
        rotation: [halfPi, 0, Math.PI],
      },
      {
        type: "label",
        material: materials.Orange,
        geometry: nodes.Cube050_Orange_0.geometry,
        rotation: [-halfPi, -halfPi, 0],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube018_Cube_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
      {
        type: "label",
        material: materials.Green,
        geometry: nodes.Cube043_Green_0.geometry,
        rotation: [halfPi, 0, Math.PI],
      },
      {
        type: "label",
        material: materials.White,
        geometry: nodes.Cube077_White_0.geometry,
        rotation: [0, 0, 0],
      },
      {
        type: "label",
        material: materials.Orange,
        geometry: nodes.Cube058_Orange_0.geometry,
        rotation: [-halfPi, -halfPi, 0],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube023_Cube_0.geometry,
        rotation: [0, 1.57, 0],
      },
      {
        type: "label",
        material: materials.White,
        geometry: nodes.Cube069_White_0.geometry,
        rotation: [0, 0, 0],
      },
      {
        type: "label",
        material: materials.Orange,
        geometry: nodes.Cube057_Orange_0.geometry,
        rotation: [-Math.PI, -1.57, 0],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube000_Cube_0.geometry,
        rotation: [-Math.PI / 2, 0, 0],
      },
      {
        type: "label",
        material: materials.White,
        geometry: nodes.Cube070_White_0.geometry,
        rotation: [0, 0, 0],
      },
      {
        type: "label",
        material: materials.Orange,
        geometry: nodes.Cube056_Orange_0.geometry,
        rotation: [-halfPi, -halfPi, 0],
      },
      {
        type: "label",
        material: materials.Blue,
        geometry: nodes.Cube059_Blue_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube026_Cube_0.geometry,
        rotation: [-halfPi, 0, 0],
      },
      {
        type: "label",
        material: materials.material,
        geometry: nodes.Cube038_Red_0.geometry,
        rotation: [halfPi, 0, Math.PI],
      },
    ],
    [
      {
        type: "cube",
        material: materials.Cube,
        geometry: nodes.Cube009_Cube_0.geometry,
        rotation: [Math.PI, 0, 0],
      },
      {
        type: "label",
        material: materials.Orange,
        geometry: nodes.Cube054_Orange_0.geometry,
        rotation: [Math.PI, 0, 0],
      },
    ],
  ];
};
