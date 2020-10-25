export const createUidGenerator = () => {
  var seed = 0;
  return () => {
    seed = (seed + 0.0001) % 1;
    let s4 = x =>
      Math.floor((1 + x) * 0x10000)
        .toString(16)
        .substring(1);
    return (
      s4(Math.random()) +
      s4(Math.random()) +
      "-" +
      s4(Math.random()) +
      "-" +
      s4(Math.random()) +
      "-" +
      s4(Math.random()) +
      "-" +
      s4(Math.random()) +
      s4(Math.random()) +
      s4(seed)
    );
  };
};

export const generateUid = createUidGenerator();

export const shrinkString = (s, l0 = 4, l1 = 3) => {
  if (s.length < l0 + 3 + l1) {
    return s;
  } else {
    return s.slice(0, l0) + "..." + s.slice(s.length - l1, s.length);
  }
};

export const capitalize = s => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const decapitalize = s => {
  return s.charAt(0).toLowerCase() + s.slice(1);
};

export const words = s => {
  return s.split(/\W/).filter(Boolean);
};

export const camelCase = s => {
  return decapitalize(
    words(s)
      .map(capitalize)
      .join("")
  );
};