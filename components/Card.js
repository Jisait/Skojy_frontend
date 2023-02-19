import styles from '../styles/Card.module.css';
import {useState} from 'react'
import {useDroppable} from '@dnd-kit/core';


function Card(props) {

const {isOver, setNodeRef} = useDroppable({
  id: props.id,
  data: {
    number: props.number,
    color: props.color,
    key: props.index
  },
});

const style = {
  opacity: isOver ? 0.5 : 1,
  border: isOver ? "red 1px solid":  "beige 1px solid",
  backgroundColor: props.color 
}

const selectCard = () => {
  props.selectCard(props.id)
}

if (props.status === "hidden") {

  return (
    <div onClick={() => selectCard()} ref={setNodeRef} className={styles.cardContainerHidden}>
         <div className={styles.topLeft}>?</div>
      <div className={styles.skojy}>
        Skojy
      </div>
    </div>
  );
}

else return (
  <div ref={setNodeRef} style={style} className={styles.cardContainer}>
      <div className={styles.topLeft}>{props.number}</div>
      <div style={{ color: props.color }} className={styles.number}>
        {props.number}
      </div>
    </div>
)
}

export default Card;
