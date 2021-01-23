import { useCallback, useEffect, useRef, useState } from "react";
import { useSpring } from "react-spring";
import { Handler } from "react-use-gesture/dist/types";
import { Euler, Group, MathUtils, Vector3 } from "three";

class Rotator {
  current = 0;

  constructor(
    private groups: Group[],
    public tempGroup: Group,
    private outerGroup: Group,
    private axis: number
  ) {}

  group = () => {
    this.groups.forEach((gr) => this.tempGroup.attach(gr));
    this.current = 0;
  };
  rotate = (rotateValue: number) => {
    if (
      this.tempGroup.children.length !== 8 &&
      this.tempGroup.children.length !== 9
    ) {
      console.warn("cannot rotate", this.tempGroup.children.length, "elements");
      return;
    }
    this.tempGroup.rotateOnAxis(
      new Vector3().setComponent(this.axis, 1),
      rotateValue
    );
    this.current += rotateValue;
  };

  completeMove = () => {
    console.log(MathUtils.radToDeg(this.current));

    const rest = this.current % (Math.PI / 2);
    if (rest > Math.PI / 4) {
      this.rotate(Math.PI / 2 - rest);
    } else {
      this.rotate(-rest);
    }
    this.current = 0;
  };
  dispose = () => {
    this.groups.forEach((gr) => {
      this.outerGroup.attach(gr);
      gr.position.round();
    });

    this.tempGroup.setRotationFromEuler(new Euler(0, 0, 0));
  };
}

interface State {
  // groups: Group[];
  // tempGroup: Group;
  // outerGroup: Group;
  // axis: number;
  current: number;
}

const axis = ((window as unknown) as any).axis || 1;

export const useRotate = ({
  tempGroup,
  outerGroup,
  getFace,
}: {
  tempGroup: Group;
  outerGroup: Group;
  getFace: (cubieId: string, axis: number) => Group[];
}): Handler<"drag", React.PointerEvent<Group>> => {
  const [rotateValue, setRotate] = useState<number>(0);
  const [isRotating, setIsRotating] = useState(false);
  const groupsRef = useRef<Group[]>([]);

  const [spring, set] = useSpring(() => ({
    rotateValue: rotateValue,
    from: { rotateValue: 0 },
    onFrame: ({ rotateValue }: { rotateValue: number }) => {
      tempGroup.setRotationFromAxisAngle(
        new Vector3().setComponent(axis, 1),
        rotateValue
      );
    },
    // onRest: ({ rotateValue }) => {
    //   // !isRotating && rotateValue && dispose();
    // },
  }));

  const group = (groups: Group[]) => {
    console.log("group", groups.length);
    groupsRef.current = groups;
    groupsRef.current.forEach((gr) => tempGroup.attach(gr));

    setRotate(0);
    setIsRotating(true);
  };

  const rotate = (diff: number) => {
    if (tempGroup.children.length !== 8 && tempGroup.children.length !== 9) {
      console.warn("cannot rotate", tempGroup.children.length, "elements");
      return;
    }
    setRotate(rotateValue + diff);
  };

  const dispose = useCallback(() => {
    console.log("dispose");
    groupsRef.current.forEach((gr) => {
      outerGroup.attach(gr);
      gr.position.round();
    });

    tempGroup.setRotationFromEuler(new Euler(0, 0, 0));
    setRotate(0);
    groupsRef.current = [];
  }, [outerGroup, tempGroup]);

  // useEffect(() => {
  //   if (rotateValue === spring.rotateValue.getValue()) {
  //     groupsRef.current.length && !isRotating && dispose();
  //   }
  // }, [rotateValue, isRotating, spring, dispose]);

  const completeMove = () => {
    const rest = Math.abs(rotateValue % (Math.PI / 2));
    const sign = Math.sign(rotateValue);
    if (sign > 0) {
      if (rest > Math.PI / 4) {
        rotate(Math.PI / 2 - rest);
      } else {
        rotate(-rest);
      }
    } else {
      if (rest > Math.PI / 4) {
        rotate(-(Math.PI / 2 - rest));
      } else {
        rotate(rest);
      }
    }
  };
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
    if (first) {
      if (isRotating) {
        console.log("cancelling");
        cancel();
      }
      group(getFace(((event as unknown) as any).eventObject.userData.id, axis));
    } else if (last) {
      completeMove();
    } else {
      rotate(delta[axis]);
    }
  };
};
