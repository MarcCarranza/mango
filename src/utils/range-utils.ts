import { RefObject } from "react";

// TODO: TYPES!!!!
interface MinPositionProps {
  sliderWidth: number;
  sliderOffset: number;
  minSelectorRef: RefObject<HTMLDivElement | null>;
  clientX: number;
  maxSelectorPosition: { current: number };
}

interface MaxPositionProps {
  sliderWidth: number;
  sliderOffset: number;
  maxSelectorRef: RefObject<HTMLDivElement | null>;
  clientX: number;
  minSelectorPosition: { current: number };
}

// EXERCISE 1
export const getMinPositioning = ({
  sliderWidth,
  sliderOffset,
  minSelectorRef,
  clientX,
  maxSelectorPosition,
}: MinPositionProps) => {
  if (!minSelectorRef.current) {
    console.error("getMinPositioning - minSelectorRef is null or undefined");
    return {};
  }
  const minPosition = 0;
  // Taking into account maxSelector
  const maxPosition =
    sliderWidth -
    maxSelectorPosition.current -
    minSelectorRef.current.clientWidth * 2;
  const selectorPosition =
    clientX - sliderOffset - minSelectorRef.current.clientWidth / 2;

  return {
    minPosition,
    maxPosition,
    selectorPosition: Math.floor(selectorPosition),
  };
};

export const getMaxPositioning = ({
  sliderWidth,
  sliderOffset,
  maxSelectorRef,
  clientX,
  minSelectorPosition,
}: MaxPositionProps) => {
  if (!maxSelectorRef.current) {
    console.error("getMaxPositioning - maxSelectorRef is null or undefined");
    return {};
  }
  // Taking into account minSelector
  const minPosition =
    -sliderWidth +
    minSelectorPosition.current +
    maxSelectorRef.current.clientWidth * 2;
  const maxPosition = 0;

  const selectorPosition =
    clientX -
    sliderWidth -
    sliderOffset +
    maxSelectorRef.current.clientWidth / 2;

  return {
    minPosition,
    maxPosition,
    selectorPosition: Math.round(selectorPosition),
  };
};

export const getMinValueFromPercentage = () => {};

export const getMinPositionFromValue = () => {};

// EXERCISE 2
