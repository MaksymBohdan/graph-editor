export const getRandomLocation = (list) => {
  const maxGraphSize = 101;
  const listWidth = list.offsetWidth;
  const listHeight = list.offsetHeight;

  const left = Math.floor(Math.random() * (listWidth - maxGraphSize));
  const top = Math.floor(
    Math.random() * (listHeight - maxGraphSize - 100 + 1) + 100
  );

  return { top, left };
};

export const getBordersOfElement = (element) => {
  const top = element.getBoundingClientRect().top;
  const left = element.getBoundingClientRect().left;
  const right = element.getBoundingClientRect().right;
  const bottom = element.getBoundingClientRect().bottom;

  return { top, left, right, bottom };
};

export const generateGraphPosition = ({
  topGraph,
  leftGraph,
  graphWidth,
  graphHeight,
  parrentBorder,
}) => {
  const {
    top: topParrent,
    left: leftParrent,
    right: rightParrent,
    bottom: bottomParrent,
  } = parrentBorder;

  let newTopGraph = topGraph - topParrent;
  let newLeftGraph = leftGraph;
  const headerHeight = 100;

  // TOP
  if (topParrent > topGraph) {
    newTopGraph = topParrent - headerHeight;
  }
  // LEFT
  if (leftParrent > leftGraph) {
    newLeftGraph = leftParrent;
  }
  // RIGHT
  if (rightParrent < leftGraph + graphWidth) {
    newLeftGraph = rightParrent - graphWidth;
  }
  // BOTTOM
  if (bottomParrent < topGraph + graphHeight) {
    newTopGraph = bottomParrent - topParrent - graphHeight;
  }

  return { newTopGraph, newLeftGraph };
};

export const generateArrowPosition = ({
  topGraph,
  leftGraph,
  graphWidth,
  graphHeight,
  parrentBorder,
}) => {
  const {
    top: topParrent,
    left: leftParrent,
    right: rightParrent,
    bottom: bottomParrent,
  } = parrentBorder;

  let newTopArrowPosition = topGraph - topParrent + graphHeight / 2;
  let newLeftArrowPostiton = leftGraph + graphWidth / 2;
  const headerHeight = 100;

  // TOP ARROW
  if (topParrent > topGraph) {
    newTopArrowPosition = topParrent - headerHeight + graphHeight / 2;
  }

  // LEFT ARROW
  if (leftParrent > leftGraph) {
    newLeftArrowPostiton = leftParrent + graphHeight / 2;
  }

  // RIGHT ARROW
  if (rightParrent < leftGraph + graphWidth) {
    newLeftArrowPostiton = rightParrent - graphWidth / 2;
  }
  // BOTTOM ARROW
  if (bottomParrent < topGraph + graphHeight) {
    newTopArrowPosition = bottomParrent - topParrent - graphHeight / 2;
  }

  return { newTopArrowPosition, newLeftArrowPostiton };
};

export const newId = () => Date.now().toString();
