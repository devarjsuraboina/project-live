import { configureStore } from '@reduxjs/toolkit'
import dataReducer from "../Slice/Slice"

 const store=configureStore({
    reducer:{
        data:dataReducer

}})