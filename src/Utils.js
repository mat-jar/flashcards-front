
export const displayCorners = (side) => {
  return (window.matchMedia( "(max-width: 768px)" ).matches ?
    ""
  :
    "rounded-" + side + "-1-5"
  )
};
