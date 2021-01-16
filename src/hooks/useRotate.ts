import { useIsHotkeyPressed } from "react-hotkeys-hook";
import { useThree } from "react-three-fiber";
import { Handler } from "react-use-gesture/dist/types";
import { Euler, Group, Vector3 } from "three";

const group = (groups: Group[], tempGroup: Group) => {
  groups.forEach((gr) => {
    tempGroup.attach(gr);
  });
};
const rotate = (
  tempGroup: Group,
  axis: number,
  direction: boolean,
  rotateValue: number
) => {
  if (tempGroup.children.length !== 8 && tempGroup.children.length !== 9) {
    console.warn("cannot rotate", tempGroup.children.length, "elements");
    return;
  }
  tempGroup.rotateOnAxis(
    new Vector3().setComponent(axis, 1),
    direction ? rotateValue : -rotateValue
  );
};
const dispose = (groups: Group[], tempGroup: Group, outerGroup: Group) => {
  groups.forEach((gr) => {
    outerGroup.attach(gr);
    gr.position.round();
  });

  tempGroup.setRotationFromEuler(new Euler(0, 0, 0));
};
export const useRotate = ({
  tempGroup,
  outerGroup,
  getFace,
}: {
  tempGroup: Group;
  outerGroup: Group;
  getFace: (cubieId: string, axis: number) => Group[];
}): Handler<"drag", React.PointerEvent<Group>> => {
  const isPressed = useIsHotkeyPressed();
  return ({ event, movement, offset, down, direction, first, last, delta }) => {
    // console.log({ movement, down, direction });
    // const rotateValue = Math.PI / 2;
    // const directionBool = !isPressed("shift");
    // isPressed("space") && console.log("rotating");
    const axis = ((window as unknown) as any).axis;

    const groups = getFace(
      ((event as unknown) as any).eventObject.userData.id,
      axis
    );

    if (first) {
      group(groups, tempGroup);
    } else if (last) {
      dispose(groups, tempGroup, outerGroup);
    } else {
      const dir = Math.abs(direction[0] - direction[1]) <= 1;
      rotate(tempGroup, axis, dir, delta[axis]);
    }
  };
};
