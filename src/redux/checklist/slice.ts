import { createSlice } from '@reduxjs/toolkit'

const formInitialValue = {
    "activity": undefined,
    "part_id": undefined,
    "weight": 0,
    "sub_activity": [
        {
            "activity": undefined,
            "part_id": undefined,
            "weight": 0,
        }
    ]
}

const initialState = {
    weightPercent: 0,
    formValue: {
        items: [formInitialValue]
    }
}

export const checklistSlice = createSlice({
    name: 'checklist',
    initialState,
    reducers: {
        setFormValue(state, action) {
            state.formValue = action.payload
        },
        setWeightPercent(state, action) {
            state.weightPercent = action.payload
        },
        addItems(state, action) {
            state.formValue.items = [...state.formValue.items, formInitialValue]
        }
    },
})

// Action creators are generated for each case reducer function
export const checklistActions = checklistSlice.actions

export default checklistSlice.reducer
