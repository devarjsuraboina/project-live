import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import supabase from '../../config/SuperbaseClient'


export const fetchregister = createAsyncThunk('register',async()=>{
    
    try{const {data,error}=await supabase
    .from('register')
    .select('*')
    return data}
    catch(error){
        console.log(error)
    }
})


const initialState={
    Registerdata:[]
}

const dataSlice=createSlice({
    name:"data",
    initialState,
    extraReducers:{
        [fetchregister.fulfilled]:(state,action)=>{
            state.Registerdata.push(action.payload)
        }
    }
    
})
export default dataSlice.reducer