import styles from '../styles/Home.module.css';
import Card from './Card'
import Discard_pile from './Discard_pile';
import Draw_pile from './Draw_pile';
import cardsDeck from '../public/Deck';
import {useEffect, useState, useRef} from 'react'
import {DndContext} from '@dnd-kit/core';
import Image from 'next/image'


function Home() {

 const [decks, setDecks] = useState(cardsDeck)
 const [playerBoard, setPlayerBoard] = useState([])
 const [deckNumber, setDeckNumber] = useState(12)
 const [checkColumn, setCheckColumn] = useState(false)
 const [suppressButton_Column1, setSuppressButton_Column1]=useState({display: "none"})



  function shuffle(array) {
    let m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

  const stopDouble = useRef(false)

  useEffect (()=> {
    if(stopDouble.current === false) {
    shuffle(cardsDeck)
    setDecks(cardsDeck)
    for (let i=0; i<12; i++) {   
 
      setPlayerBoard(current =>[...current, {id:i, number:decks[i].number, color:decks[i].color, status:"hidden" }])
      }
      return () => stopDouble.current = true
    }
  }, [])

useEffect(() => {
  if (checkColumn == true) {
    if(playerBoard[0].status === "revealed" && playerBoard[1].status === "revealed" && playerBoard[2].status === "revealed" && playerBoard[0].number === playerBoard[1].number && playerBoard[0].number === playerBoard[2].number )
        {  setSuppressButton_Column1({display:"flex"})}
       
   else  if(playerBoard[3].status === "revealed" && playerBoard[4].status === "revealed" && playerBoard[5].status === "revealed" && playerBoard[3].number === playerBoard[4].number && playerBoard[3].number === playerBoard[5].number )
        {console.log("kekchose2")}
       
   else if(playerBoard[6].status === "revealed" && playerBoard[7].status === "revealed" && playerBoard[8].status === "revealed" && playerBoard[6].number === playerBoard[7].number && playerBoard[6].number === playerBoard[8].number )
        {console.log("kekchose3")}
    
   else if(playerBoard[9].status === "revealed" && playerBoard[10].status === "revealed" && playerBoard[11].status === "revealed" && playerBoard[9].number === playerBoard[10].number && playerBoard[9].number === playerBoard[11].number )
        {console.log("kekchose4")} 
       
    }
    setCheckColumn(false)

}, [checkColumn])



    



function handleDragEnd(event) {
  const {active, over} = event;
  if (over) {
   setPlayerBoard(current => current.map((e) => (e.id === over.data.current.key ? e = {id: e.id, number:active.data.current.number, color:active.data.current.color, status: 'revealed'} : e)), )
   setDeckNumber(deckNumber+1) 
   setCheckColumn(true)
  }
}

const selectCard = (id) => {
  setPlayerBoard(current => current.map((e) => (e.id === id ? e = { ...e, status: 'revealed', } : e)), )
  setCheckColumn(true)

}



let Cards = playerBoard.map((element, key) => {
  return (
    <Card selectCard={selectCard} {...element} index={key}></Card>
  );
});

let row1 = Cards.slice(0,3)
let row2 = Cards.slice(3,6)
let row3 = Cards.slice(6,9)
let row4 = Cards.slice(9,12)



  return (
    
      <main className={styles.main}>
           <DndContext onDragEnd={handleDragEnd}>
           <Draw_pile 
          number={decks[deckNumber].number}
          color={decks[deckNumber].color}
        ></Draw_pile>
     
   
        <Discard_pile 
          number={decks[deckNumber].number}
          color={decks[deckNumber].color}
        ></Discard_pile >

        <div className={styles.handContainer}>
          {row1}
          <div style= {suppressButton_Column1} className={styles.checkContainer}>
            <div className={styles.check}>
              <Image src="/check.svg" alt="check" width="22" height="22" />
            </div>
            <div className={styles.cancel}>
              <Image src="/cancel.svg" alt="cancel" width="22" height="22" />
            </div>
          </div>
        </div>
        <div className={styles.handContainer}>{row2}</div>
        <div className={styles.handContainer}>{row3}</div>
        <div className={styles.handContainer}>{row4}</div>
            </DndContext>
      </main>

  );
}

export default Home;
