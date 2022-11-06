import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, ListGroupItem, FormControl, Modal, ModalHeader, CloseButton, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import useProductsRedux from '../hooks/useProductsRedux'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ProductPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { productsList: { error, isLoading, products } } = useProductsRedux();
    const product = products && products.find(item => item._id === params.id);
    const [ quantity, setQuantity ] = useState(1);  //default quantity is 1
    const [ showModal, setShowModal ] = useState(false);
    const addToCartHandler = () => {
        setShowModal(true)
        // navigate("/cart")
    }
  return (
    <>
        <Link className='btn btn-light my-3' to="/">Go Back</Link>
        {error && <Message variant="danger">Error: {error}</Message>}
        {isLoading && <Loader/>}
        {!isLoading && product &&
            <Row>
                <Col md={6}><Image src={product.image} alt={product.name} fluid/></Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroupItem><h2>{product.name}</h2></ListGroupItem>
                        <ListGroupItem><Rating value={product.rating} text={`${product.numReviews} reviews`}/></ListGroupItem>
                        <ListGroupItem>Price: ${product.price}</ListGroupItem>
                        <ListGroupItem>Description: {product.description}</ListGroupItem>
                    </ListGroup>
                </Col>
                <Col>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <Row>
                                <Col>Price:</Col>
                                <Col><strong>${product.price}</strong></Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Status:</Col>
                                <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                            </Row>
                        </ListGroupItem>
                            {product.countInStock > 0 && (
                                <ListGroupItem>
                                    <Row>
                                        <Col>Qty:</Col>
                                        <Col>
                                            <FormControl as="select" value={quantity} onChange={e => setQuantity(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map(item => (
                                                    <option key={item + 1} value={item + 1}>{item + 1}</option>
                                                ))}
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )}
                        <ListGroupItem>
                            <Button className='btn-block' type="button" disabled={product.countInStock === 0} onClick={addToCartHandler}><AddShoppingCartIcon/> ADD TO CART</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        }
        {product && <Modal show={showModal} onHide={() => setShowModal(false)}>
            <ModalHeader closeButton>
            <ModalTitle>Successfully Added To Cart! <CheckCircleOutlineIcon style={{color: "green", marginLeft: ".25em"}}/> </ModalTitle></ModalHeader>
            <ModalBody>
            <Row>
                <Col><Image src={product.image} alt={product.name} fluid style={{maxHeight: "100px"}}/></Col>
                <Col><h6>{product.name}</h6></Col>
                <Col><span>Price: <p>${product.price}</p></span></Col>
                <Col><span>Quantity: <p>{quantity}</p></span></Col>
            </Row>
                

            </ModalBody>
            <ModalFooter>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            <Button variant="primary" onClick={() => navigate("/cart")}>Go To Cart</Button>
            </ModalFooter>
        </Modal>}
    </>
  )
}

export default ProductPage