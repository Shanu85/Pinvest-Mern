import React, { useState } from 'react'
import ProductForm from '../../components/product/productForm/ProductForm'
import {useDispatch, useSelector} from 'react-redux';
import { createProduct, selectIsLoading } from '../../redux/features/products/productSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader'

const initialState=
{
    name:'',
    category:'',
    quantity:'',
    price:''
}



const AddProduct = () => {
    const [product,setProduct]=useState(initialState)
    const [productImage,setProductImage]=useState('')
    const [imagePreview,setImagePreview]=useState(null)
    const [description,setDescription]=useState('')
    const isLoading=useSelector(selectIsLoading)

    const {name,category,quantity,price}=product
    const dispatch=useDispatch()
    const navigate=useNavigate()

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

    // SKU -> generate unique ID for product
    const generateSKU=(category)=>
    {
        const letter=category.slice(0,3).toUpperCase();
        const number=Date.now()
        const SKU=letter+'-'+number;
        return SKU;
    }

    const saveProduct=async(e)=>
    {
        e.preventDefault();
        const formData=new FormData()
        formData.append('name',name)
        formData.append('sku',generateSKU(category))
        formData.append('category',category)
        formData.append('quantity',quantity)
        formData.append('price',price)
        formData.append('description',description)
        formData.append('image',productImage)

        console.log(...formData)

        await dispatch(createProduct(formData))
        
        navigate('/dashboard')
        
    }   

  return (
    <div>

        {isLoading && <Loader/>}
      <h3 className='--mt'>
        Add New Product
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

export default AddProduct
