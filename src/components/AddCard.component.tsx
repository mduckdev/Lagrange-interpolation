import { MouseEvent, MouseEventHandler } from "react";
import "../scss/style.scss"
export const Plus = () => {
    const insert = (e: MouseEvent) => {

    }

    return (
        <button onClick={e => insert(e)} className='plus'>
            +
        </button>

    )
}