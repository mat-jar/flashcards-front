import React, { useRef, useLayoutEffect, useEffect, useState} from 'react';

export default function AddFlashcardRowContainer(props) {

  const leftDivRef = useRef(0);
  const rightDivRef = useRef(0);

  const [flashcard, setFlashcard] = useState({});
  const [key, setKey] = useState({});



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

  function expand_textarea(e)
{
  const { name, value, parentNode } = e.target;

  parentNode.dataset.replicatedValue = value
  setFlashcard({...flashcard, [name]: value})
  setKey({...key, [name]: e.target})
  //console.log(key)


}

function handleKeyDown(event) {
  //event.preventDefault();
  if (event.key === 'ArrowDown') {

   props.addFlashcard(flashcard);
   document.getElementById("front_textarea").value = "";
   document.getElementById("back_textarea").value = "";
   setFlashcard({});
  }

 };

 useEffect(() => {
   window.addEventListener('keydown', handleKeyDown);
   // cleanup this component
   return () => {
     window.removeEventListener('keydown', handleKeyDown);
     };
   });



  return(
    <>
    <td className="col-6">
    <div className="border p-1rem bg-white div-hover h-100 position-relative overflow-auto"
    ref={leftDivRef}
     >
    <div className="grow-wrap">
    <textarea className="itemDisplay border-0" key={key} name="front_text"
    id="front_textarea" onInput={expand_textarea} rows="1" placeholder="Fill the front side" ></textarea>
    </div>

    </div>
    </td>
    <td className="col-6">

    <div className="border p-1rem bg-white div-hover h-100 position-relative overflow-auto"
    ref={rightDivRef}>
    <div className="grow-wrap">
    <textarea className="itemDisplay border-0" key="new_back_text" name="back_text"
    id="back_textarea" onInput={expand_textarea} rows="1" placeholder="Fill the back side" ></textarea>
    </div>
    </div>
    </td>
    </>
  );
}
