import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface CardsState {
    xValue: string,
    yValue: string,
}
interface IChangeValue {
    value: string,
    index: number
}

const initialState: CardsState[] = [{
    xValue: "0",
    yValue: "0",
}]

export const cardsSlice = createSlice({
    name: 'cardsList',
    initialState,
    reducers: {
        createCard: (state) => {
            state.push({ xValue: "0", yValue: "0" })
        },
        deleteCard: (state, action: PayloadAction<number>) => {
            state.splice(action.payload, 1);
        },
        setXValue: (state, action: PayloadAction<IChangeValue>) => {
            state[action.payload.index].xValue = action.payload.value;
        },
        setYValue: (state, action: PayloadAction<IChangeValue>) => {
            state[action.payload.index].yValue = action.payload.value;

        }

    },
})

export const { createCard, deleteCard, setXValue, setYValue } = cardsSlice.actions

export const selectValues = (state: RootState, index: number) => state.cards[index]

export default cardsSlice.reducer