import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FormControl, Form, FormGroup, FormLabel, Button } from "react-bootstrap"
import useUserRedux from '../hooks/useUserRedux'
import useProductsRedux from '../hooks/useProductsRedux'
import axios from 'axios'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

const ProductDetailsPage = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const { user: { userData } } = useUserRedux();
  const { productsList: { products, isLoading, error, success }, clearSuccess, updateProduct } = useProductsRedux();
  const [ name, setName ] = useState("");
  const [ price, setPrice ] = useState(0);
  const [ image, setImage ] = useState("");
  const [ brand, setBrand ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ countInStock, setCountInStock ] = useState(0);
  const [ description, setDescription ] = useState("");

  // if not logged in or not an admin, redirect
  useEffect(() => {
    if(!userData) navigate("/login")
    if(userData && !userData.isAdmin) navigate("/")
  }, [userData])

  useEffect(() => {
    if(products.length !== 0) {
      const item = products.find(item => item._id === id)
      if(item){
        setName(item.name);
        setPrice(item.price);
        setImage(item.image);
        setBrand(item.brand);
        setCategory(item.category);
        setCountInStock(item.countInStock);
        setDescription(item.description);
      }
    }
  }, [products])

  useEffect(() => {
    if(success){
      const timeout = setTimeout(() => clearSuccess(), 10000)
      return () => {
        clearTimeout(timeout)
        clearSuccess();
      }
    }
  }, [success])

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct({_id: id, name, price, image, brand, category, countInStock, description})
  }

  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error.message}</Message>
  return (
    <>
      <Link to="/product-list" className='btn btn-light my-3'>Go Back</Link>
      <FormContainer>
        {success && <Message variant="success" onClose={() => clearSuccess()} dismissible>{success}</Message>}
        <h1>Edit Product Information</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup controlId='name' className="my-4">
                <FormLabel><strong>Product Name</strong></FormLabel>
                <FormControl type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" required/>
            </FormGroup>
            <FormGroup controlId='price' className="my-4">
                <FormLabel><strong>Price (USD)</strong></FormLabel>
                <FormControl type="number" step="0.01" placeholder="Enter price" value={price} onChange={e => setPrice(e.target.value)} autoComplete="price" required/>
            </FormGroup>
            <FormGroup controlId='image' className="my-4">
                <FormLabel><strong>Image</strong></FormLabel>
                <FormControl type="text" placeholder="NOT AVAILABLE YET" value={image} onChange={e => setImage(e.target.value)} autoComplete="image"/>
            </FormGroup>
            <FormGroup controlId='brand' className="my-4">
                <FormLabel><strong>Product Brand</strong></FormLabel>
                <FormControl type="text" placeholder="Enter brand" value={brand} onChange={e => setBrand(e.target.value)} autoComplete="brand" required/>
            </FormGroup>
            <FormGroup controlId='category' className="my-4">
                <FormLabel><strong>Category</strong></FormLabel>
                <FormControl type="text" placeholder="Enter category" value={category} onChange={e => setCategory(e.target.value)} autoComplete="category" required/>
            </FormGroup>
            <FormGroup controlId='countInStock' className="my-4">
                <FormLabel><strong>In Stock</strong></FormLabel>
                <FormControl type="text" placeholder="Enter available stock" value={countInStock} onChange={e => setCountInStock(e.target.value)} autoComplete="countInStock" required/>
            </FormGroup>
            <FormGroup controlId='description' className="my-4">
                <FormLabel><strong>Description</strong></FormLabel>
                <FormControl as="textarea" rows={3}  placeholder="Enter description" value={description} onChange={e => setDescription(e.target.value)} autoComplete="description" required/>
            </FormGroup>

            {!isLoading && <Button type="submit" variant="primary"  className="my-4">UPDATE PRODUCT</Button>}
        </Form>

      </FormContainer>
    </>
  )
}

export default ProductDetailsPage