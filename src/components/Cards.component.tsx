import { useState } from "react"
import "../scss/style.scss"
import { Card } from "./Card.component"
export const Cards = () => {
    const [cardsList, setCardsList] = useState([<Card count={0}></Card>]);
    // for (let i = 1; i < 9; i++) {
    //     cardsList.push(<Card count={i}></Card>)
    // }


    return (
        <div className="card-container">
            {cardsList}
            <button className='plus'>
                +
            </button>
        </div>
    )
}