import React from "react";
import { CSSTransition } from "react-transition-group";

import type { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-bottom"
  | "zoom-in-right";

interface ExtendsTransitionProps {
  animation?: AnimationName;
  wrapper?: boolean;
}

export type TransitionProps = ExtendsTransitionProps & CSSTransitionProps;

const Transition: React.FC<TransitionProps> = (props) => {
  const nodeRef = React.useRef(null);

  const { children, classNames, animation, wrapper, ...restProps } = props;
  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div ref={nodeRef}>{children}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;
