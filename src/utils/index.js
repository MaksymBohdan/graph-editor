export const getRandomLocation = () => {
  const innerWidth = window.innerWidth / 1.5;
  const innerHeight = window.innerHeight / 1.5;
  const graphWidth = 100;

  const left = Math.floor(
    Math.random(graphWidth, innerWidth - graphWidth) * Math.floor(innerWidth)
  );

  const top = Math.floor(
    Math.random(graphWidth, innerHeight - graphWidth) * Math.floor(innerHeight)
  );

  return { top, left };
};
