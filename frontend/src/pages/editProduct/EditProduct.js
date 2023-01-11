import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader';
import ProductForm from '../../components/product/productForm/ProductForm';
import { getProduct, getProducts, selectIsLoading, selectProduct, updateProduct } from '../../redux/features/products/productSlice';

const EditProduct = () => {
    const {id}=useParams();
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const isLoading=useSelector(selectIsLoading)
    
    // hold the product we want to edit
    const productEdit=useSelector(selectProduct)

    const [product,setProduct]=useState(productEdit)
    const [productImage,setProductImage]=useState('')
    const [imagePreview,setImagePreview]=useState(null)
    const [description,setDescription]=useState('')

    const handleInputChange=(e)=>
    {
        const {name,value}=e.target;

        // get the initial state, then set the [name]'s value to value
        setProduct({...product,[name]:value})
    }

    const handleImageChange=(e)=>
    {
        setProductImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))

    }

    useEffect(()=>{
        dispatch(getProduct(id))
    },[dispatch,id])

    useEffect(()=>{
      // if user refresh the page, get product from DB(above useEffect),saved in productEdit
      // then setProduct to productEdit
      setProduct(productEdit)
      
      setImagePreview(
        productEdit && productEdit.Image ? 
        `${productEdit.Image.filePath}` : null)
      
      setDescription(
        productEdit && productEdit.description ? 
        productEdit.description : null
      )

    },[productEdit])


    const saveProduct=async(e)=>
    {
        e.preventDefault();
        const formData=new FormData()
        formData.append('name',product?.name)
        formData.append('category',product?.category)
        formData.append('quantity',product?.quantity)
        formData.append('price',product?.price)
        formData.append('description',product.description)

        if(productImage)
        {
          formData.append('image',productImage)
        }

        console.log(...formData)

        await dispatch(updateProduct({id,formData}))

        // before navigating to DB, get all products
        await dispatch(getProducts())
        
        navigate('/dashboard')
        
    }  

  return (
    <div>

        {isLoading && <Loader/>}
      <h3 className='--mt'>
        Edit Product
      </h3>

      <ProductForm 
      product={product}
      productImage={productImage}
      imagePreview={imagePreview}
      description={description}
      setDescription={setDescription}
      handleImageChange={handleImageChange}
      handleInputChange={handleInputChange}
      saveProduct={saveProduct}
      />
    </div>
  )
}

export default EditProduct
