import { useState } from "react"
import "../scss/style.scss"
interface cardProps {
    count: number
}
export const Card = (props: cardProps) => {
    return (
        <div className="card">
            X<sub>{props.count}</sub>Y<sub>{props.count}</sub>
            <br></br>
            <div className="closeButton plus">x</div>
            <input type="number" placeholder="X:"></input>
            <br></br>
            <input type="number" placeholder="Y:"></input>
        </div>

    )
}