import { configureStore } from '@reduxjs/toolkit'
import getReducer from './getSlice'

export default configureStore({
    reducer:{
        req: getReducer
    }
}) 