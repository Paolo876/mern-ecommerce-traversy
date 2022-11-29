import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, ListGroupItem, FormControl, Modal, ModalHeader, CloseButton, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import useProductsRedux from '../hooks/useProductsRedux'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios'
import useCartRedux from '../hooks/useCartRedux'
import DocumentHead from '../components/DocumentHead'
import CreateRatingForm from '../components/CreateRatingForm'

const ProductPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { state: locationState } = useLocation();
    const { productsList: { error, isLoading, products } } = useProductsRedux();
    const { addToCart, cart: {error: cartError, isLoading: isCartLoading} } = useCartRedux();
    const [ product, setProduct ] = useState(null);
    const [ quantity, setQuantity ] = useState(1);  //default quantity is 1
    const [ showModal, setShowModal ] = useState(false);
    
    useEffect(() => {
        if(!products.find(item => item._id === params.id)) {
            axios.get(`http://localhost:3001/api/products/${params.id}`)
                .then(res => setProduct(res.data))
                .catch(err => console.log(err))
        }
        if(products.find(item => item._id === params.id)) {
            setProduct(products.find(item => item._id === params.id))
        }
    }, [products])

    const addToCartHandler = () => {
        setShowModal(true)
        addToCart({...product, quantity})
    }

    const handleHideModal = () => {
      setShowModal(false);
      setQuantity(1)
    }

  if(isLoading) return <Loader/>
  if(error || cartError) return <Message variant="danger">{error || cartError}</Message>
  return (
    <>

        <Link className='btn btn-light my-3' to={locationState ? locationState.from : "/"}>Go Back</Link>
        {product &&
        <>
            <DocumentHead
                title={`ProShop | ${product.name}`}
                description={product.description}
            />
            <Row>
                <Col md={6}><Image src={product.image.url} alt={product.image.name} fluid/></Col>
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
                                <Col>{product.countInStock > 0 ? `In Stock (${product.countInStock})` : "Out of Stock"}</Col>
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
                            {isCartLoading && <Loader/>}
                            {!isCartLoading &&<Button className='btn-block' type="button" disabled={product.countInStock === 0} onClick={addToCartHandler}><AddShoppingCartIcon/> ADD TO CART</Button>}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
            <CreateRatingForm product={product}/>
        </>
        }
        {product && <Modal show={showModal} onHide={handleHideModal}>
            <ModalHeader closeButton>
                <ModalTitle>Successfully Added To Cart! <CheckCircleOutlineIcon style={{color: "green", marginLeft: ".25em"}}/> </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col md={3}><Image src={product.image.thumbnail} alt={product.image.name} fluid style={{maxHeight: "100px"}} rounded/></Col>
                    <Col md={5}><h6>{product.name}</h6></Col>
                    <Col md={2}><span>Price: <p>${product.price}</p></span></Col>
                    <Col md={2}><span>Quantity: <p>{quantity}</p></span></Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={handleHideModal}>Close</Button>
                <Button variant="primary" onClick={() => navigate("/cart")}>Go To Cart</Button>
            </ModalFooter>
        </Modal>}
    </>
  )
}

export default ProductPage