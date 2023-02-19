import styles from '../styles/Draw_pile.module.css';
import {useState} from 'react'
import {useDraggable} from '@dnd-kit/core';

function Draw_pile(props) {



const {attributes, listeners, setNodeRef, transform} = useDraggable({
  id: "draw",
  data: {
    number: props.number,
    color: props.color
  },
});

const style = 
  transform ? {
  transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  
} : undefined;

const [test, setTest] = useState(styles.cardContainer)

function handleClick () {
  console.log("prout")
  setTest(styles.test)

  
}

  return (
    <div
      onClick={handleClick}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div style={{ backgroundColor: props.color }} className={test}>
      
      </div>
    </div>
  );
}

export default Draw_pile;
