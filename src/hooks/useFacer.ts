import { useState } from "react";
import { Group } from "three";

const findFaceByAxis = (
  XorYorZ: number,
  axis: number,
  cubieRefMap: Map<string, Group>
) => {
  return [...cubieRefMap.keys()].filter((cubieId) => {
    return (
      (cubieRefMap.get(cubieId)?.position.getComponent(axis) as number) ===
      XorYorZ
    );
  });
};
export const selectFacesFor = (
  cubieId: string,
  axis: number,
  cubieRefMap: Map<string, Group>
) => {
  return findFaceByAxis(
    cubieRefMap.get(cubieId)?.position.getComponent(axis) as number,
    axis,
    cubieRefMap
  ).map((cubieId) => cubieRefMap.get(cubieId) as Group);
};

const REFS = new Map<string, Group>();
export const useFacer = (n: number): [typeof setRef, typeof getFace] => {
  const setRef = (cubieId: string) => (ref: Group) => {
    REFS.set(cubieId, ref);
  };

  const getFace = (cubieId: string, axis: number) =>
    selectFacesFor(cubieId, axis, REFS);

  return [setRef, getFace];
};
