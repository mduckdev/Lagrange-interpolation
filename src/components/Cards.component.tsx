import "../scss/style.scss"
import { Card } from "./Card.component"
import { useDispatch, useSelector } from "react-redux"
//import { increment } from "../redux/counterSlice"
import { RootState } from "../redux/store"
import { createCard } from "../redux/cardsSlice"
export const Cards = () => {
    //const [cardsList, setCardsList] = useState([<Card ></Card>]);
    // for (let i = 1; i < 9; i++) {
    //     cardsList.push(<Card count={i}></Card>)
    // }
    const cardsList = useSelector((state: RootState) => state)
    //console.log(cardsList)
    const dispatch = useDispatch();

    // const displayCards = ()=>{

    // }

    return (
        <div className="card-container">
            {cardsList.cards.map((element, index) => <Card index={index} key={index}></Card>)}
            <button className='plus' onClick={() => dispatch(createCard())}>
                +
            </button>
        </div>
    )
}