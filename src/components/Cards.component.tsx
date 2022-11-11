import "../css/style.css"
import { Card } from "./Card.component"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { createCard } from "../redux/cardsSlice"
export const Cards = () => {
    const cardsList = useSelector((state: RootState) => state)
    const dispatch = useDispatch();

    return (
        <div className="card-container">
            <div className="card-container">
                {cardsList.cards.map((element, index) => <Card index={index} key={index}></Card>)}
            </div>
            <button className='plus' onClick={() => dispatch(createCard())}>
                +
            </button>
        </div>

    )
}