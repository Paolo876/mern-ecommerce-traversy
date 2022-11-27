import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FormControl, Form, FormGroup, FormLabel, Button, Row, Col, Container } from "react-bootstrap"
import useUserRedux from '../hooks/useUserRedux'
import useProductsRedux from '../hooks/useProductsRedux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import UploadImageForm from '../components/UploadImageForm'
const ProductDetailsPage = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const { user: { userData } } = useUserRedux();
  const { productsList: { products, isLoading, error, success }, clearSuccess, updateProduct } = useProductsRedux();
  const [ name, setName ] = useState("");
  const [ price, setPrice ] = useState(0);
  const [ image, setImage ] = useState(null);
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
        console.log(item)
        setName(item.name);
        setPrice(item.price);
        setImage(item.image.url);
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
        <Container>
        <Row className='justify-content-md-center'>
            <Col md={10}>
                <h1>CREATE NEW PRODUCT</h1>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={7}>
                            <FormGroup controlId='name' className="my-4">
                                <FormLabel><strong>Product Name</strong></FormLabel>
                                <FormControl type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" required/>
                            </FormGroup>
                            <FormGroup controlId='price' className="my-4">
                                <FormLabel><strong>Price</strong></FormLabel>
                                <FormControl type="number" step="0.01" placeholder="Enter price" value={price} onChange={e => setPrice(e.target.value)} autoComplete="price" required/>
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
                        </Col>
                        <Col md={5}>
                            {/* <FormGroup controlId='image' className="my-4">
                                <FormLabel><strong>Primary Image</strong></FormLabel>
                                <FormControl type="file" placeholder="NOT AVAILABLE YET" value={image} onChange={e => setImage(e)} autoComplete="image"/>
                            </FormGroup> */}
                            <UploadImageForm image={image} setImage={setImage}/>
                        </Col>
                    </Row>

                    {!isLoading && <Button type="submit" variant="primary"  className="my-4" size="lg">CREATE PRODUCT</Button>}
                </Form>
            </Col>
        </Row>
        </Container>
    </>
  )
}

export default ProductDetailsPage