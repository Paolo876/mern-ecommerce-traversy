import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import useUserRedux from '../hooks/useUserRedux'
import useProductsRedux from "../hooks/useProductsRedux"
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from "../components/FormContainer"

const CreateProductPage = () => {
  const navigate = useNavigate();
  const { user: { userData } } = useUserRedux();
  const { productsList: { isLoading, error, success }, createProduct } = useProductsRedux();
  const [ name, setName ] = useState("");
  const [ price, setPrice ] = useState(0.00);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct({ name, price, image, brand, category, countInStock, description })
    navigate("/product-list")
  }
  
  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error.message}</Message>
  return (
    <>
        <Link to="/product-list" className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
            <h1>Create New Product</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup controlId='name' className="my-4">
                    <FormLabel><strong>Product Name</strong></FormLabel>
                    <FormControl type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" required/>
                </FormGroup>
                <FormGroup controlId='price' className="my-4">
                    <FormLabel><strong>Price</strong></FormLabel>
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

                {!isLoading && <Button type="submit" variant="primary"  className="my-4">CREATE PRODUCT</Button>}
            </Form>
        </FormContainer>
    </>
  )
}

export default CreateProductPage