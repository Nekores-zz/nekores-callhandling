/**
 * by A. Prates, jul-2018
 */

export function asteriskize(block) {
  let asteriskBlock = {};
  for (let i in block) {
    asteriskBlock[i] = strRepeat("*", block[i].length);
  }
  return asteriskBlock;
}

function strRepeat(str, qty) {
  let result = "";
  while (qty > 0) {
    if (qty & 1) result += str;
    (qty >>= 1), (str += str);
  }
  return result;
}
