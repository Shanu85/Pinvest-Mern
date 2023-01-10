import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getProducts } from '../../redux/features/products/productSlice';
import ProductList from '../../components/product/productlist/ProductList';
import ProductSummary from '../../components/product/productsummary/ProductSummary';


const Dashboard = () => {

  useRedirectLoggedOutUser('/login');

  const dispatch=useDispatch()

  const isLoggedIn=useSelector(selectIsLoggedIn)

  const {products,isLoading,isError,message}=useSelector((state)=>state.product)

  // load all the products on page loading
  useEffect(()=>{
    if(isLoggedIn===true)
    {
      dispatch(getProducts())
      
    }

    if(isError)
    {
      console.log(message)
    }
  },[isLoggedIn,isError,message,dispatch])

  return (
    <div>
      <ProductSummary products={products}/>
      <ProductList products={products} isLoading={isLoading}/>
    </div>
  )
}

export default Dashboard
