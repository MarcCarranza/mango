"use client";

// Dependencies
import { ChangeEvent, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Hooks
// TODO: PATH
import useElementSize from "../../hooks/useElementSize";

// Utils
import {
  getMinPositioning,
  getMaxPositioning,
  getPositionFromValue,
  getValueFromPosition,
} from "@utils";

// Types
import { RangeProps, RangeSelector } from "./types";

// Styles
// TODO: USE TAILWIND!!!!
import "./style.css";

// TODO: Standarize slider/selector positioning

function Range({ min, max }: RangeProps): React.ReactNode {
  // State
  const [minSelectorValue, setMinSelectorValue] = useState<number>(min ?? 0);
  const [maxSelectorValue, setMaxSelectorValue] = useState<number>(max ?? 100);
  const [isDragging, setDragging] = useState<boolean>(false);
  const [sliderRef, { width: sliderWidth, offsetLeft: sliderOffset }] =
    useElementSize();
  const minSelector = useRef<HTMLDivElement>(null);
  const maxSelector = useRef<HTMLDivElement>(null);
  const currentSelector = useRef<RangeSelector | null>(null);
  const minSelectorPosition = useRef<number>(0);
  const maxSelectorPosition = useRef<number>(0);

  useEffect(() => {
    // TODO: Loader?
    if (min) setMinSelectorValue(min);
    if (max) setMaxSelectorValue(max);
  }, [min, max]);

  useEffect(() => {
    // TODO: Optimize re-renders
    // TODO: Don't calculate if values are min or max?
    if (minSelector.current && maxSelector.current) {
      onResize();
    }
  }, [sliderWidth]);

  // Handlers
  const onMoveSlider = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    // EXERCISE 1
    if (!isDragging) {
      return;
    }
    if (minSelector.current && maxSelector.current && currentSelector.current) {
      // Min and max values
      let minPosition;
      let maxPosition;
      let selectorPosition;
      let selectorToUpdate;
      let positionToUpdate;

      if (currentSelector.current === RangeSelector.MIN) {
        // Assigning refs to update
        selectorToUpdate = minSelector;
        positionToUpdate = minSelectorPosition;
        // Positioning values (max, min, slider and selector)
        const positionValues = getMinPositioning({
          sliderWidth,
          sliderOffset,
          minSelectorRef: minSelector,
          clientX: e.clientX,
          maxSelectorPosition,
        });

        minPosition = positionValues.minPosition;
        maxPosition = positionValues.maxPosition;
        selectorPosition = positionValues.selectorPosition;
      } else if (currentSelector.current === RangeSelector.MAX) {
        // Assigning refs to update
        selectorToUpdate = maxSelector;
        positionToUpdate = maxSelectorPosition;
        // Max and min positions
        const positionValues = getMaxPositioning({
          sliderWidth,
          sliderOffset,
          maxSelectorRef: maxSelector,
          clientX: e.clientX,
          minSelectorPosition,
        });

        minPosition = positionValues.minPosition;
        maxPosition = positionValues.maxPosition;
        selectorPosition = positionValues.selectorPosition;
      } else {
        console.error("currentSelector value is null or undefined");
        return;
      }

      // Checking min and max values before translation
      if (selectorPosition >= minPosition && selectorPosition <= maxPosition) {
        const updatedValue = getValueFromPosition({
          selectorPosition,
          selectorType: currentSelector.current,
          sliderWidth,
          selectorWidth: selectorToUpdate.current.clientWidth,
          min,
          max,
        });

        // Animating the slider
        positionToUpdate.current = selectorPosition;
        selectorToUpdate.current.style.transform = `translate3d(${selectorPosition}px, 0, 0)`;

        if (currentSelector.current === RangeSelector.MIN) {
          setMinSelectorValue(updatedValue);
        } else {
          setMaxSelectorValue(updatedValue);
        }
      }
    }
  };

  const onStartDragging = (selectorType: RangeSelector): void => {
    currentSelector.current = selectorType;
    setDragging(true);
  };

  const onEndDragging = (): void => {
    if (!currentSelector.current) {
      console.error("onEndDragging - currentSelector is undefined/null");
      return;
    }

    currentSelector.current = null;
    setDragging(false);
  };

  const onChangeMinInput = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    if (!min || !max || !minSelector.current) {
      console.error("No min, max or selector ref");
      return;
    }
    // TODO: Let null value?
    const value = parseFloat(e.currentTarget.value);
    if (value >= min && value < maxSelectorValue) {
      const minUpdatedPosition = getPositionFromValue({
        sliderWidth,
        selectorType: RangeSelector.MIN,
        selectorWidth: minSelector.current.clientWidth,
        value,
        min,
        max,
      });
      minSelector.current.style.transform = `translate3d(${minUpdatedPosition}px, 0, 0)`;
      setMinSelectorValue(value);
    }
  };

  const onChangeMaxInput = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    if (!min || !max || !maxSelector.current) {
      console.error("No min, max or selector ref");
      return;
    }
    // TODO: Let null value?
    const value = parseFloat(e.currentTarget.value);
    if (value > minSelectorValue && value <= max) {
      const maxUpdatedPosition = getPositionFromValue({
        sliderWidth,
        selectorType: RangeSelector.MIN,
        selectorWidth: maxSelector.current.clientWidth,
        value,
        min,
        max,
      });
      maxSelector.current.style.transform = `translate3d(${maxUpdatedPosition}px, 0, 0)`;
      setMaxSelectorValue(value);
    }
  };

  const onResize = () => {
    // TODO: Will this change with exercise 2?
    if (!min || !max || !minSelector.current || !maxSelector.current) {
      // TODO: Handle this differently
      // console.error("onResize - No min, max or selector ref");
      return;
    }

    const minResizePosition = getPositionFromValue({
      sliderWidth,
      selectorType: RangeSelector.MIN,
      selectorWidth: minSelector.current.clientWidth,
      value: minSelectorValue,
      min,
      max,
    });

    const maxResizePosition = getPositionFromValue({
      sliderWidth,
      selectorType: RangeSelector.MAX,
      selectorWidth: minSelector.current.clientWidth,
      value: maxSelectorValue,
      min,
      max,
    });

    minSelector.current.style.transform = `translate3d(${minResizePosition}px, 0, 0)`;
    maxSelector.current.style.transform = `translate3d(${maxResizePosition}px, 0, 0)`;
  };

  return (
    <div className="range">
      {/* Min value label */}
      {typeof min === "number" ? (
        <input
          type="number"
          className="range__input"
          value={minSelectorValue}
          onChange={onChangeMinInput}
          step="0.01"
        />
      ) : (
        <span className="range__label">{minSelectorValue}</span>
      )}

      {/* Slider */}
      <div
        className="range__slider-wrapper"
        onMouseMove={onMoveSlider}
        ref={sliderRef}
      >
        <div className="range__slider">
          {/* Selector min */}
          <div
            className="range__selector selector-min"
            ref={minSelector}
            onMouseDown={() => onStartDragging(RangeSelector.MIN)}
            onMouseUp={onEndDragging}
          />
          {/* Selector max */}
          <div
            className="range__selector selector-max"
            ref={maxSelector}
            onMouseDown={() => onStartDragging(RangeSelector.MAX)}
            onMouseUp={onEndDragging}
          />
        </div>
      </div>
      {/* Max value label */}
      {typeof min === "number" ? (
        <input
          className="range__input"
          type="number"
          value={maxSelectorValue}
          onChange={onChangeMaxInput}
          step="0.01"
        />
      ) : (
        <span className="range__label">{maxSelectorValue}</span>
      )}
    </div>
  );
}

// Removed SSR because useResizeObserver in useElementSize uses window
const RangeNoSSR = dynamic(() => Promise.resolve(Range), { ssr: false });
export default RangeNoSSR;
