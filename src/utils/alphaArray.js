export default (size = 10) =>
  [...new Array(size)].map((x, i) => {
    const A_CHAR_CODE = 65;
    const LIA = 26;
    const inc = Math.floor((i + LIA) / LIA);
    if (inc > 26) throw new Error('Size for num to alpha too large');
    return String.fromCharCode.apply(
      null,
      [].concat(inc > 1 ? [inc - 2 + A_CHAR_CODE] : [], [
        (i % LIA) + A_CHAR_CODE
      ])
    );
  });
