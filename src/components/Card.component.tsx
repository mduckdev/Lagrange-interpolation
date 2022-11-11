import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteCard, setXValue, setYValue } from "../redux/cardsSlice"
import type { RootState } from "../redux/store"
import "../css/style.css"

interface cardProps {
    index: number
}

export const Card = (props: cardProps) => {
    const dispatch = useDispatch();
    const cardsList = useSelector((state: RootState) => state.cards);
    const [isValidX, setIsValidX] = useState(true);
    const [isValidY, setIsValidY] = useState(true);

    const handleInput = (element: React.ChangeEvent<HTMLInputElement>, isX: boolean) => {
        if (isNaN(element.target.valueAsNumber)) {
            if (isX) setIsValidX(false)
            else setIsValidY(false)
        } else {
            if (isX) setIsValidX(true)
            else setIsValidY(true)
        }

        if (isX) dispatch(setXValue({ value: element.target.value, index: props.index }))
        else dispatch(setYValue({ value: element.target.value, index: props.index }))
    }

    return (
        <div className="card">
            <br></br>
            <div className="closeButton plus" onClick={() => dispatch(deleteCard(props.index))}>x</div>
            <label htmlFor="xValue">X<sub>{props.index}</sub> :</label>
            <input className={isValidX ? ("") : ("error")} name="xValue" type="number" placeholder="X:" value={cardsList[props.index].xValue} onChange={e => handleInput(e, true)}></input>
            <br></br>
            <label htmlFor="yValue">Y<sub>{props.index}</sub> :</label>
            <input className={isValidY ? ("") : ("error")} name="yValue" type="number" placeholder="Y:" value={cardsList[props.index].yValue} onChange={e => handleInput(e, false)}></input>
        </div>

    )
}