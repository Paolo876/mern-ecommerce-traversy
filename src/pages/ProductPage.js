import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [ product, setProduct ] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/products/${params.id}`).then(res => setProduct(res.data))
    }, [])
    // useEffect(() => {
    //     if(!product) navigate("/")
    // }, [product])

  return (
    <>
        <Link className='btn btn-light my-3' to="/">Go Back</Link>
        {product &&
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
                        <ListGroupItem>
                            <Button className='btn-block' type="button" disabled={product.countInStock === 0}>ADD TO CART</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        }
    </>
  )
}

export default ProductPage