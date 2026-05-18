import { RefObject } from "react";

// TODO: Types as a separate?
import { RangeSelector } from "../components/Range/types";

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

interface PositionFromValueProps {
  sliderWidth: number;
  selectorType: RangeSelector;
  selectorWidth: number;
  value: number;
  min: number;
  max: number;
}

// EXERCISE 1
// TODO: Return type
export const getMinPositioning = ({
  sliderWidth,
  sliderOffset,
  minSelectorRef,
  clientX,
  maxSelectorPosition,
}: MinPositionProps) => {
  if (!minSelectorRef.current) {
    // TODO: Handle this error
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
    selectorPosition: Math.round(selectorPosition),
  };
};

// TODO: Return type
export const getMaxPositioning = ({
  sliderWidth,
  sliderOffset,
  maxSelectorRef,
  clientX,
  minSelectorPosition,
}: MaxPositionProps) => {
  if (!maxSelectorRef.current) {
    // TODO: Handle this error
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

export const getPositionFromValue = ({
  sliderWidth,
  selectorType,
  selectorWidth,
  value,
  min,
  max,
}: PositionFromValueProps): number => {
  const sliderTotalWidth = sliderWidth - selectorWidth;
  let percentage;
  if (selectorType === RangeSelector.MIN) {
    percentage = (value - min) / (max - min);
  } else {
    percentage = (value - max) / (max - min);
  }
  const updatedPosition = sliderTotalWidth * percentage;
  return Math.round(updatedPosition);
};

// EXERCISE 2
