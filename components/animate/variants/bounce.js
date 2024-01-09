import { varTranEnter } from './transition';

// ----------------------------------------------------------------------

export const varBounce = (props) => {
  const durationIn = props?.durationIn;
  // const durationOut = props?.durationOut;
  const easeIn = props?.easeIn;
  // const easeOut = props?.easeOut;

  return {
    // IN
    in: {
      scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
      opacity: [0, 1, 1, 1, 1, 1],
      transition: varTranEnter({ durationIn, easeIn }),
    },
    inUp: {
      y: [720, -24, 12, -4, 0],
      scaleY: [4, 0.9, 0.95, 0.985, 1],
      opacity: [0, 1, 1, 1, 1],
      transition: { ...varTranEnter({ durationIn, easeIn }) },
    },
    inDown: {
      y: [-720, 24, -12, 4, 0],
      scaleY: [4, 0.9, 0.95, 0.985, 1],
      opacity: [0, 1, 1, 1, 1],
      transition: varTranEnter({ durationIn, easeIn }),
    },
    inLeft: {
      x: [-720, 24, -12, 4, 0],
      scaleX: [3, 1, 0.98, 0.995, 1],
      opacity: [0, 1, 1, 1, 1],
      transition: varTranEnter({ durationIn, easeIn }),
    },
    inRight: {
      x: [720, -24, 12, -4, 0],
      scaleX: [3, 1, 0.98, 0.995, 1],
      opacity: [0, 1, 1, 1, 1],
      transition: varTranEnter({ durationIn, easeIn }),
    },

    // OUT
    out: {
      scale: [0.9, 1.1, 0.3],
      opacity: [1, 1, 0],
    },
    outUp: { y: [-12, 24, -720], scaleY: [0.985, 0.9, 3], opacity: [1, 1, 0] },
    outDown: {
      y: [12, -24, 720],
      scaleY: [0.985, 0.9, 3],
      opacity: [1, 1, 0],
    },
    outLeft: {
      x: [0, 24, -720],
      scaleX: [1, 0.9, 2],
      opacity: [1, 1, 0],
    },
    outRight: {
      x: [0, -24, 720],
      scaleX: [1, 0.9, 2],
      opacity: [1, 1, 0],
    },
  };
};
