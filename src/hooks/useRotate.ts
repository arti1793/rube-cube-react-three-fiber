import { Handler } from "react-use-gesture/dist/types";
import { Euler, Group, MathUtils, Vector3 } from "three";

class Rotator {
  current = 0;

  group = (groups: Group[], tempGroup: Group) => {
    groups.forEach((gr) => tempGroup.attach(gr));
    this.current = 0;
  };
  rotate = (tempGroup: Group, axis: number, rotateValue: number) => {
    if (tempGroup.children.length !== 8 && tempGroup.children.length !== 9) {
      console.warn("cannot rotate", tempGroup.children.length, "elements");
      return;
    }
    tempGroup.rotateOnAxis(new Vector3().setComponent(axis, 1), rotateValue);
    this.current += rotateValue;
  };

  completeMove = (tempGroup: Group, axis: number) => {
    console.log(MathUtils.radToDeg(this.current));

    const rest = this.current % (Math.PI / 2);
    if (rest > Math.PI / 4) {
      this.rotate(tempGroup, axis, Math.PI / 2 - rest);
    } else {
      this.rotate(tempGroup, axis, -rest);
    }
    this.current = 0;
  };
  dispose = (groups: Group[], tempGroup: Group, outerGroup: Group) => {
    groups.forEach((gr) => {
      outerGroup.attach(gr);
      gr.position.round();
    });

    tempGroup.setRotationFromEuler(new Euler(0, 0, 0));
  };
}

const rotator = new Rotator();
export const useRotate = ({
  tempGroup,
  outerGroup,
  getFace,
}: {
  tempGroup: Group;
  outerGroup: Group;
  getFace: (cubieId: string, axis: number) => Group[];
}): Handler<"drag", React.PointerEvent<Group>> => {
  return ({
    event,
    movement,
    offset,
    down,
    direction,
    first,
    last,
    delta,
    cancel,
  }) => {
    const axis = ((window as unknown) as any).axis;

    const groups = getFace(
      ((event as unknown) as any).eventObject.userData.id,
      axis
    );

    if (first) {
      if (rotator.current) cancel();
      rotator.group(groups, tempGroup);
    } else if (last) {
      rotator.completeMove(tempGroup, axis);
      rotator.dispose(groups, tempGroup, outerGroup);
    } else {
      rotator.rotate(tempGroup, axis, delta[axis]);
    }
  };
};
