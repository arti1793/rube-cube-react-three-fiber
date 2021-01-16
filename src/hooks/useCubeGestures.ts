import { useThree } from "react-three-fiber";
import { useDrag } from "react-use-gesture";
import { Handler } from "react-use-gesture/dist/types";
import { Group } from "three";

export const useCubeGestures = (
  handler: Handler<"drag", React.PointerEvent<Group>>
) => {
  const { viewport, camera } = useThree();
  const { width, height, factor } = viewport;

  const bind = useDrag(handler, {
    // bounds: {
    //   left: -width / 2,
    //   right: width / 2,
    //   top: -height / 2,
    //   bottom: height / 2,
    // },
    // rubberband: true,
    //   axis
    transform: ([x, y]) => [x / factor, -y / factor],
    // lockDirection: true,
  });
  return bind;
};
