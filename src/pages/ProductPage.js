import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, ListGroupItem, FormControl, Modal, ModalHeader, Carousel, CarouselItem, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap'
import axios from 'axios'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import DocumentHead from '../components/DocumentHead'
import CreateRatingForm from '../components/CreateRatingForm'
import useProductsRedux from '../hooks/useProductsRedux'
import useCartRedux from '../hooks/useCartRedux'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ProductPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { state: locationState } = useLocation();
    const { productsList: { error, isLoading, products } } = useProductsRedux();
    const { addToCart, cart: {error: cartError, isLoading: isCartLoading} } = useCartRedux();
    const [ product, setProduct ] = useState(null);
    const [ activeImageIndex, setActiveImageIndex ] = useState(0);
    const [ quantity, setQuantity ] = useState(1);  //default quantity is 1
    const [ showModal, setShowModal ] = useState(false);
    const imageStyleProps = { objectFit: "cover", height:"100%", width: "100%", cursor: "pointer" }

    let productImages;
    if(product) productImages = [product.image, ...product.additionalImages];

    useEffect(() => {
        if(!products.find(item => item._id === params.id)) {
            axios.get(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/products/${params.id}`)
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

    const handleClick = () => {
      
    }
  if(isLoading) return <Loader/>
  if(error || cartError) return <Message variant="danger">{error || cartError}</Message>
  return (
    <>

        {product &&
        <>
            <DocumentHead
                title={`MernShop | ${product.name}`}
                description={product.description}
            />
            <Row style={{maxHeight: "550px", overflow: "hidden", marginBottom: "2em"}}>
                {product.bannerImage && <Col xs={12}><Image src={product.bannerImage.url} alt={product.name} variant="top" fluid style={imageStyleProps} className="d-block w-100 hover-shadow"/></Col>}
            </Row>
            <Link className='btn btn-light my-3' to={locationState ? locationState.from : "/"} state={{from: "product"}}>Go Back</Link>
            <Row>
                <Col md={7}>
                <Carousel variant="dark" interval={null} fade controls={false} className="product-carousel" indicators={false} activeIndex={activeImageIndex}>
                    {productImages.map(item => <CarouselItem key={item.id}>
                        <Image src={item.url} variant="top" fluid style={imageStyleProps}/>
                    </CarouselItem>)}
                </Carousel>
                <Row className="me-5 my-3 justify-content-start flex-row" >
                {productImages.map((item, index) => <Col key={item.id} style={{width: "fit-content", flex: "none"}}>
                    <Button variant="light" className={`p-0 m-0 opacity-${activeImageIndex === index ? '100' : '50'}`} onClick={() => setActiveImageIndex(index)}>
                        <Image src={item.thumbnail} alt={item.name} fluid style={{maxHeight: "80px", maxWidth: "100px"}}/>
                    </Button>
                </Col>)}
                </Row>
                </Col>
                <Col md={5}>
                    <ListGroup variant="flush">
                        <ListGroupItem><h2>{product.name}</h2></ListGroupItem>
                        <ListGroupItem><Rating value={product.rating} text={`${product.numReviews} reviews`}/></ListGroupItem>
                        <ListGroupItem>{product.description}</ListGroupItem>
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
                        <ListGroupItem>
                            {product.countInStock > 0 && (
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
                            )}
                        </ListGroupItem>
                        <ListGroupItem>
                            {isCartLoading && <Loader/>}
                            {!isCartLoading &&
                                <div className="d-grid">
                                    <Button className='btn-block mx-3 my-3' type="button" disabled={product.countInStock === 0} onClick={addToCartHandler} size="lg"><AddShoppingCartIcon/> ADD TO CART</Button>
                                </div>}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={12}>
                    <ListGroup variant="flush">
                        <ListGroupItem><p>Features:</p>
                            <ul>
                                {product.features.map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
            <CreateRatingForm product={product}/>
            <Modal show={showModal} onHide={handleHideModal}>
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
            </Modal>
        </>
        }
    </>
  )
}

export default ProductPage