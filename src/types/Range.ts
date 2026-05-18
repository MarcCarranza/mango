import { RefObject } from "react";

// Component
export type RangeProps = {
  min?: number;
  max?: number;
  rangeValues?: number[];
};

export enum RangeSelector {
  MIN = "min",
  MAX = "max",
}

// Utils
export interface MinPositionParams {
  sliderWidth: number;
  sliderOffset: number;
  minSelectorRef: RefObject<HTMLDivElement | null>;
  clientX: number;
  maxSelectorPosition: { current: number };
}

export interface MaxPositionParams {
  sliderWidth: number;
  sliderOffset: number;
  maxSelectorRef: RefObject<HTMLDivElement | null>;
  clientX: number;
  minSelectorPosition: { current: number };
}

export interface PositionFromValueParams {
  sliderWidth: number;
  selectorType: RangeSelector;
  selectorWidth: number;
  value: number;
  min: number;
  max: number;
}
