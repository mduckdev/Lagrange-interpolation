import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface CardsState {
    xValue: string,
    yValue: string,
}
interface IChangeValue {
    value: string,
    index: number
}

// Define the initial state using that type
const initialState: CardsState[] = [{
    xValue: "0",
    yValue: "0",
}]

export const cardsSlice = createSlice({
    name: 'cardsList',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        createCard: (state) => {
            state.push({ xValue: "0", yValue: "0" })
        },
        deleteCard: (state, action: PayloadAction<number>) => {
            state.splice(action.payload, 1);
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        setXValue: (state, action: PayloadAction<IChangeValue>) => {
            state[action.payload.index].xValue = action.payload.value;
        },
        setYValue: (state, action: PayloadAction<IChangeValue>) => {
            state[action.payload.index].yValue = action.payload.value;

        }

    },
})

export const { createCard, deleteCard, setXValue, setYValue } = cardsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectValues = (state: RootState, index: number) => state.cards[index]

export default cardsSlice.reducer