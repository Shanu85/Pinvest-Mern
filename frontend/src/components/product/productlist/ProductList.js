import React, { useEffect, useState } from 'react'
import './productList.scss'
import SpinnerImg from '../../loader/Loader'
import {FaEdit,FaTrashAlt} from 'react-icons/fa';
import {AiOutlineEye} from 'react-icons/ai';
import Search from '../../search/Search';
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../../redux/features/products/filterSlice';
import {useSelector,useDispatch} from 'react-redux';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { deleteProduct, getProducts } from '../../../redux/features/products/productSlice';
import { Link } from 'react-router-dom';

const ProductList = ({products,isLoading}) => {

    const [search,setSearch]=useState('')

    const dispatch=useDispatch()

    const filteredProducts=useSelector(selectFilteredProducts);

    // begin pagination
    const[currentItems,setCurrentItems]=useState([]);
    const[pageCount,setPageCount]=useState(0);
    const[itemOffset,setItemOffset]=useState(0);

    const itemPerPage=2

    useEffect(()=>{
        const endOffset=itemOffset+itemPerPage;

        setCurrentItems(filteredProducts.slice(itemOffset,endOffset));
        setPageCount(Math.ceil(filteredProducts.length/itemPerPage));

    },[itemOffset,itemPerPage,filteredProducts])

    const handlePageClick=(event)=>
    {
        const newOffset=(event.selected*itemPerPage)%filteredProducts.length
        setItemOffset(newOffset)
    }

    const shortenText=(text,n)=>
    {
        if(text.length>n)
        {
            const shortenedtext=text.substring(0,n).concat('...')

            return shortenedtext
        }

        return text
    }


    // fire useEffect every time search some item
    useEffect(()=>{
        dispatch(FILTER_PRODUCTS({products,search}))
    },[products,search,dispatch])


    const delProduct=async(id)=>
    {
        await dispatch(deleteProduct(id))
        await dispatch(getProducts())
    }

    const confirmDelete=(id)=>{
        confirmAlert({
            title: 'Delete Product!!!',
            message: 'Are you sure you want to delete this product.',
            buttons: [
              {
                label: 'Delete',
                onClick: () => delProduct(id)
              },
              {
                label: 'Cancel',
              }
            ]
          });
    }

    const seeProduct=(id)=>
    {

    }
    
  return (
    <div className='product-list'>
    <hr/>
    <div className='table'>
        <div className='--flex-between --flex-dir-column'>

            <span>
                <h3>Inventory Items</h3>
            </span>

            <span>
                <Search value={search} onChange={(e)=>setSearch(e.target.value)}/>
            </span>
        </div>

        {isLoading && <SpinnerImg/>}

        <div className='table'>
            {!isLoading && products.length===0 ? 
            (
                <p>No Products found, please add a product ...</p>
            ):
            (
                <table>
                    <thead>
                        <tr>
                            <th>s/n</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Value</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((product,index)=>{
                                const {_id,name,category,price,quantity}=product
                                return (
                                    <tr key={_id}>
                                        <td>{index+1}</td>
                                        <td>{shortenText(name,16)}</td>
                                        <td>{category}</td>
                                        <td>{"₹ "}{price}</td>
                                        <td>{quantity}</td>
                                        <td>{"₹ "}{quantity*price}</td>
                                        <td className='icons'>
                                            <span>
                                                <Link to={`/product-detail/${_id}`}>
                                                    <AiOutlineEye size={25} color={'purple'} onClick={()=>seeProduct(_id)}/>
                                                </Link>
                                            </span>
                                            <span>
                                                <FaEdit size={20} color={'green'}/>
                                            </span>
                                            <span>
                                                <FaTrashAlt size={20} color={'red'} onClick={()=>confirmDelete(_id)}/>
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )}
        </div>
        
        <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
            containerClassName='pagination'
            pageLinkClassName='page-num'
            previousLinkClassName='page-num'
            nextLinkClassName='page-num'
            activeLinkClassName='active'
        />

    </div>
    </div>
  )
}

export default ProductList
