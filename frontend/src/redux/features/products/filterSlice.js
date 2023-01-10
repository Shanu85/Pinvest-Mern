import {createSlice} from '@reduxjs/toolkit';

const initialState=
{
    filteredProducts:[]
}

const filterSlice=createSlice({
    name:'filter',
    initialState,
    reducers:{
        FILTER_PRODUCTS (state,action)
        {
            // expecting 2 thing, products array and search value

            const {products,search}=action.payload

            // filtering by using name and category
            const tempProducts=products.filter((product)=>
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.category.toLowerCase().includes(search.toLowerCase())
            )

            state.filteredProducts=tempProducts
        }
    }
});

export const {FILTER_PRODUCTS}=filterSlice.actions

export const selectFilteredProducts=(state)=>state.filter.filteredProducts

export default filterSlice.reducer

