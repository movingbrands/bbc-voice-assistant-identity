export default _c => {
  const c = _c * 255.0;
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};
