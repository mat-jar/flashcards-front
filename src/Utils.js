
export const displayCorners = (side) => {
  return (window.matchMedia( "(max-width: 768px)" ).matches ?
    ""
  :
    "rounded-" + side + "-1-5"
  )
};

export function shuffle(input_array) {
  var array = structuredClone(input_array)
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array
};
