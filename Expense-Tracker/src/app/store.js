import {configureStore} from '@reduxjs/toolkit'
import reducer from './expnseSlice'

const store = configureStore({
    reducer : {
        reducer
    }
})

export default store