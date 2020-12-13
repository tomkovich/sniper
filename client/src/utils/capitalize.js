export const capitalize = (str) => {
  if (str?.length > 1) {
    let newString = [];
    str
      .split(" ")
      .forEach((word) =>
        newString.push(`${word[0].toUpperCase()}${word.slice(1, word.length)}`)
      );
    return newString.join(" ");
  }

  return str;
};
