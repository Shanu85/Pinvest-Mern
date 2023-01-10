import React, { useEffect } from 'react'
import './productSummary.scss'
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from '../../infoBox/InfoBox';
import {useDispatch,useSelector} from 'react-redux';
import { CALC_STORE_VALUE, selectTotalStoreValue,selectOutOfStock,CAL_OUTOFSTOCK,CAL_CATEGORY,selectAllCategories} from '../../../redux/features/products/productSlice';
const earningIcon=<AiFillDollarCircle size={40} color="#fff"/>
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

const ProductSummary = ({products}) => {

  const dispatch=useDispatch()

  // here we can get the result generated after dispatching the action in useEffect
  const totalStoreValue=useSelector(selectTotalStoreValue)

  const totalOutOfStock=useSelector(selectOutOfStock)

  const totalCategories=useSelector(selectAllCategories)
  
  useEffect(()=>{
    // this will dispatch the action 
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CAL_OUTOFSTOCK(products));
    dispatch(CAL_CATEGORY(products))
  },[dispatch,products])

  return (
    <div className='product-summary'>
      <h3 className='--mt'>Inventory Stats</h3>
      <div className='info-summary'>
        <InfoBox icon={productIcon} title={"Total Product"} count={products.length} bgColor='card1'/>

        <InfoBox icon={earningIcon} title={"Total Store Value"} count={totalStoreValue} bgColor='card2'/>

        <InfoBox icon={outOfStockIcon} title={"Out of Stock"} count={totalOutOfStock} bgColor='card3'/>

        <InfoBox icon={categoryIcon} title={"All Categories"} count={totalCategories.length} bgColor='card4'/>
      </div>
    </div>
  )
}

export default ProductSummary
