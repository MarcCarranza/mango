import {
  RangeSelector,
  MinPositionParams,
  MaxPositionParams,
  PositionFromValueParams,
} from "@customTypes/Range";

// TODO: TYPES!!!!

// EXERCISE 1
// TODO: Return type
export const getMinPositioning = ({
  sliderWidth,
  sliderOffset,
  minSelectorRef,
  clientX,
  maxSelectorPosition,
}: MinPositionParams) => {
  if (!minSelectorRef.current) {
    // TODO: Handle this error
    console.error("getMinPositioning - minSelectorRef is null or undefined");
    return {};
  }
  const minPosition = 0;
  // Taking into account maxSelector
  const maxPosition =
    sliderWidth +
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
}: MaxPositionParams) => {
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

export const getValueFromPosition = ({
  selectorPosition,
  selectorType,
  sliderWidth,
  selectorWidth,
  min,
  max,
}): number => {
  // Calculating percentage slided
  const percentage = selectorPosition / (sliderWidth - selectorWidth);
  const sum = Math.round((max - min) * percentage * 100) / 100;
  const value = selectorType === RangeSelector.MIN ? min + sum : max + sum;
  return value;
};

export const getPositionFromValue = ({
  sliderWidth,
  selectorType,
  selectorWidth,
  value,
  min,
  max,
}: PositionFromValueParams): number => {
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
