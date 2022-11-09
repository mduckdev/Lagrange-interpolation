import { useSelector, useDispatch } from "react-redux"
import { deleteCard, setXValue, setYValue } from "../redux/cardsSlice"
import type { RootState } from "../redux/store"
import "../scss/style.scss"

interface cardProps {
    index: number
}

export const Card = (props: cardProps) => {
    const dispatch = useDispatch();
    const cardsList = useSelector((state: RootState) => state.cards);
    return (
        <div className="card">
            <br></br>
            <div className="closeButton plus" onClick={() => dispatch(deleteCard(props.index))}>x</div>
            <label htmlFor="xValue">X<sub>{props.index}</sub> :</label>
            <input name="xValue" type="number" placeholder="X:" value={cardsList[props.index].xValue} onChange={e => dispatch(setXValue({ value: e.target.value, index: props.index }))}></input>
            <br></br>
            <label htmlFor="yValue">Y<sub>{props.index}</sub> :</label>
            <input name="yValue" type="number" placeholder="Y:" value={cardsList[props.index].yValue} onChange={e => dispatch(setYValue({ value: e.target.value, index: props.index }))}></input>
        </div>

    )
}