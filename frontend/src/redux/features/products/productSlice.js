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
    message:'',
    totalStoreValue:0,
    outOfStock:0,
    category:[]   
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

// delete one product

export const deleteProduct=createAsyncThunk(
    'products/delete',
    async(id,thunkAPI)=>
    {
        try
        {
            return await productService.deleteProduct(id)
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

// get a product

export const getProduct=createAsyncThunk(
    'products/getProduct',
    async(id,thunkAPI)=>
    {
        try
        {
            return await productService.getProduct(id)
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

// update a product

export const updateProduct=createAsyncThunk(
    'products/updateProduct',
    async({id,formData},thunkAPI)=>
    {
        try
        {
            return await productService.updateProduct(id,formData);
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
            const products=action.payload
            const array=[]

            products.map((product)=>{
                const {price,quantity}=product
                const productValue=price*quantity
                return array.push(productValue)
            })

            const totalValue=array.reduce((a,b)=>{
                return a+b
            },0)

            state.totalStoreValue=totalValue
        },

        CAL_OUTOFSTOCK(state,action)
        {
            const products=action.payload
            const array=[]
            products.map((product)=>{
                const {quantity}=product

                return array.push(quantity)
            })
            
            let count=0
            array.forEach((num)=>{
                if(num===0 || num==='0')
                {
                    count+=1
                }
            })

            state.outOfStock=count
        },

        CAL_CATEGORY(state,action)
        {
            const products=action.payload
            const array=[]

            products.map((product)=>{
                const {category}=product

                return array.push(category)
            })

            const uniqueCategory=[...new Set(array)]
            state.category=uniqueCategory
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
        .addCase(deleteProduct.pending,(state,action)=>{
            state.isLoading=true
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            toast.success("Product deleted successfully!")
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            toast.error(action.payload)
        })
        .addCase(getProduct.pending,(state,action)=>{
            state.isLoading=true
        })
        .addCase(getProduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.product=action.payload // information we will get from http request
        })
        .addCase(getProduct.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            toast.error(action.payload)
        })
        .addCase(updateProduct.pending,(state,action)=>{
            state.isLoading=true
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            toast.success('Product Updated Successfully!!')
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            toast.error(action.payload)
        })
    }
});

export const {CALC_STORE_VALUE,CAL_OUTOFSTOCK,CAL_CATEGORY}=productSlice.actions;

export const selectIsLoading=(state)=>state.product.isLoading

export const selectTotalStoreValue=(state)=>state.product.totalStoreValue

export const selectOutOfStock=(state)=>state.product.outOfStock

export const selectAllCategories=(state)=>state.product.category

export const selectProduct=(state)=>state.product.product

export default productSlice.reducer;
