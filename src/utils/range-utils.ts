export const getMinPositioning = ({
  sliderRef,
  minSelectorRef,
  clientX,
  maxSelectorPosition,
}) => {
  const minPosition = 0;
  // Taking into account maxSelector
  const maxPosition =
    sliderRef.current.clientWidth +
    maxSelectorPosition.current -
    sliderRef.current.offsetLeft +
    minSelectorRef.current.clientWidth / 2;
  const sliderPosition = clientX - sliderRef.current.offsetLeft;
  const selectorPosition =
    sliderPosition - minSelectorRef.current.clientWidth / 2;

  return {
    minPosition,
    maxPosition,
    selectorPosition,
  };
};

export const getMaxPositioning = ({
  sliderRef,
  maxSelectorRef,
  clientX,
  minSelectorPosition,
}) => {
  // Taking into account minSelector
  const minPosition =
    -sliderRef.current.clientWidth +
    minSelectorPosition.current +
    sliderRef.current.offsetLeft -
    maxSelectorRef.current.clientWidth / 2;
  const maxPosition = 0;

  const sliderPosition = clientX - sliderRef.current.clientWidth;
  const selectorPosition =
    sliderPosition - maxSelectorRef.current.clientWidth * 2;

  return {
    minPosition,
    maxPosition,
    selectorPosition,
  };
};
