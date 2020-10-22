export const handleArrowKeys = (event, stepValue) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault(); // Prevent the cursor from moving to the top
    return Number(event.target.value) + stepValue;
  }
  if (event.key === 'ArrowDown') {
    return Number(event.target.value) - stepValue;
  }
};
