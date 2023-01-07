import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import productService from './productService';

const initialState=
{
    product:null,
    products:[],
    isError:false,  // indicate any error
    isLoading:false,
    isSuccess:false,
    message:''   
}

// create new product

export const createProduct=createAsyncThunk(
    "products/create",
    async (formData,thunkAPI)=>{
        try
        {
            return await productService.createProduct(formData);
        }
        catch(err)
        {
            // error can be in any format

            const message=(
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString();

            console.log(message);

            return thunkAPI.rejectWithValue(message);
        }
    }
)

// get all products

export const getProducts=createAsyncThunk(
    'products/getAll',
    async(_,thunkAPI)=>
    {
        try
        {
            return await productService.getProducts();
        }
        catch(err)
        {
            // error can be in any format

            const message=(
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString();

            console.log(message);

            return thunkAPI.rejectWithValue(message);
        }   
    }
)


const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:
    {
        CALC_STORE_VALUE(state,action)
        {
            console.log('store value')
        }
    },
    extraReducers:(builder)=>
    {
        builder
        .addCase(createProduct.pending,(state,action)=>{
            state.isLoading=true
        })
        .addCase(createProduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            console.log(action.payload)
            state.products.push(action.payload)
            toast.success('Product Added Successfully!')
        })
        .addCase(createProduct.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            toast.error(action.payload)
        })
        .addCase(getProducts.pending,(state,action)=>
        {
            state.isLoading=true
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            console.log(action.payload)
            state.products=action.payload
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            toast.error(action.payload)
        })
    }
});

export const {CALC_STORE_VALUE}=productSlice.actions;

export const selectIsLoading=(state)=>state.product.isLoading


export default productSlice.reducer;
