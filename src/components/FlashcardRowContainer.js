import React, { useRef, useLayoutEffect} from 'react';

export default function FlashcardRowContainer(props) {

  const leftDivRef = useRef()
  const rightDivRef = useRef()

  const checkOverflow = (element) => {
    const isOverflowing =
      element.current.clientWidth < element.current.scrollWidth || element.current.clientHeight < element.current.scrollHeight;
    if (isOverflowing){
      element.current.firstChild.style.paddingLeft= "20px";
      element.current.firstChild.style.paddingRight= "20px";
      const width = element.current.firstChild.clientWidth;
      element.current.firstChild.style.left= `${(((width-40)/2)+20)}px`;
    }

  }

  useLayoutEffect(() => {
    checkOverflow(leftDivRef);
    checkOverflow(rightDivRef);

  });


  return(
    <>
    <td className="col-6">
    <div className="border p-2rem bg-white div-hover h-100 position-relative overflow-auto"
    ref={leftDivRef}
     >
    <label className="itemDisplay centered" key={props.flashcard.id} >{props.flashcard.front_text}</label>
    </div>
    </td>
    <td className="col-6">

    <div className="border p-2rem bg-white div-hover h-100 position-relative overflow-auto"
    ref={rightDivRef}>
    <label className="itemDisplay centered" key={props.flashcard.id}>{props.flashcard.back_text}</label>
    </div>
    </td>
    </>
  );
}
