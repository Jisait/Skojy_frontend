import styles from '../styles/Discard_pile.module.css';
import {useState} from 'react'
import {useDraggable} from '@dnd-kit/core';

function Discard_pile(props) {



const {attributes, listeners, setNodeRef, transform} = useDraggable({
  id: "discard",
  data: {
    number: props.number,
    color: props.color
  },
});

const style = 
  transform ? {
  transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  
} : undefined;



  return (
    <div>
      
        <div ref={setNodeRef} style={style} className={styles.drag}{...listeners} {...attributes}>
          <div
            className={styles.cardContainer}
            style={{ backgroundColor: props.color }}
          >
            <div className={styles.topLeft}>{props.number}</div>
            <div style={{ color: props.color }} className={styles.number}>
              {props.number}
            </div>
          </div>
        </div>
 
    </div>
  );
}

export default Discard_pile;
