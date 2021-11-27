export const noStartEndCommas = (phrase) => {
  const chars = phrase.split("");
  if (chars[0] === ",") {
    chars.splice(0, 1);
  }
  if (chars[chars.length - 1] === ",") {
    chars.splice(chars.length - 1, 1);
  }
  return chars.join("");
};
