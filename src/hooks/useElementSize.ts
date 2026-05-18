"use client";

// Dependencies
import { RefObject, useLayoutEffect, useRef, useState } from "react";

// Hooks
import useResizeObserver from "@react-hook/resize-observer";

interface Size {
  width: number;
  height: number;
  offsetLeft: number;
}

export default function useElementSize<
  T extends HTMLElement = HTMLDivElement,
>(): [RefObject<T | null>, Size] {
  const target = useRef<T | null>(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
    offsetLeft: 0,
  });

  useLayoutEffect(() => {
    if (target.current) {
      const size = {
        ...target.current.getBoundingClientRect(),
        offsetLeft: target.current.offsetLeft,
      };
      setSize(size);
    }
  }, [target]);

  // TODO: Type
  const observerCallback = ({ contentBoxSize, target }) => {
    const { inlineSize: width, blockSize: height } = contentBoxSize[0];
    setSize({ width, height, offsetLeft: target.offsetLeft });
  };
  useResizeObserver(target, observerCallback);

  return [target, size];
}
