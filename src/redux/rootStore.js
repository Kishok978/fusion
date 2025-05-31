import { configureStore } from '@reduxjs/toolkit'
import checklistReducer from "./checklist/slice.js";

export const store = configureStore({
    reducer: {
        checklist: checklistReducer
    },
})
