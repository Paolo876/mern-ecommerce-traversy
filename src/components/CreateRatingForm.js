import { useState, useEffect } from 'react'
import { Row, Col, ListGroup, ListGroupItem, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import Rating from "../components/Rating"
import useUserRedux from "../hooks/useUserRedux"
import useProductsRedux from '../hooks/useProductsRedux'
import axios from "axios"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const CreateRatingForm = ({ product }) => {
  const { user: { userData } } = useUserRedux();
  const { updateProductReview } = useProductsRedux();
  const [ reviews, setReviews ] = useState(product.reviews);
  const [ rating, setRating ] = useState(0)
  const [ comment, setComment ] = useState("")
  const [ name, setName ] = useState("")
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);
  const [ isReviewExists, setIsReviewExists ] = useState(userData && reviews.some(item => (item.user._id === userData._id || item.user === userData._id)))
  const handleSubmit = (e) => {
    e.preventDefault();
    if(rating !== 0){
        setIsLoading(true)
        axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/products/${product._id}/reviews?token=${cookies.get('token')}`, { rating, comment, name }, { withCredentials: true})
            .then(res => {
                setSuccess(res.data.message)
                setIsLoading(false)
                const updatedReviews = res.data.reviews.map(item => item.user === userData._id ? ({...item, user:{name: userData.name, email: userData.email, _id: userData._id}}) : item)
                setReviews(updatedReviews)
                updateProductReview({id: product._id, reviews: updatedReviews})
                setIsReviewExists(true)
            })
            .catch(err => {
                setError(err.response.data.message)
                setIsLoading(false)
            })
    }
  }
  if(isLoading) return <Loader/>
  return (
    <Row>
        <Col md={6} className="mt-4">
            <h2>Reviews</h2>
            {reviews.length === 0 && <Message>No reviews yet.</Message>}
            <ListGroup variant="flush">
                {reviews.map(item => (
                    <ListGroupItem key={item._id}>
                        <strong>{item.name}</strong>
                        <Rating value={item.rating}/>
                        <p>{new Date(item.createdAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: '2-digit'})}</p>
                        <p>{item.comment}</p>
                        <p>-{item.user.name}</p>
                    </ListGroupItem>
                ))}

                {!isReviewExists && userData && <ListGroupItem>
                    <h2>Write a review</h2>
                    {error && <Message variant="danger">{error}</Message>}
                    {success && <Message variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Message>}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup controlId="rating" className="mt-2">
                            <FormLabel>Rating</FormLabel>
                            <FormControl as="select" value={rating} onChange={e => setRating(e.target.value)} required>
                                <option>Select Rating</option>
                                <option value="1">1 - Poor</option>
                                <option value="2">2 - Fair</option>
                                <option value="3">3 - Good</option>
                                <option value="4">4 - Very Good</option>
                                <option value="5">5 - Excellent</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId="name" className="mt-2">
                            <FormLabel>Title <small>(optional)</small></FormLabel>
                            <FormControl type="text" placeholder='Write a title' value={name} onChange={e => setName(e.target.value)}/>
                        </FormGroup>
                        <FormGroup controlId="name" className="mt-2">
                            <FormLabel>Comment <small>(optional)</small></FormLabel>
                            <FormControl as="textarea" rows={3} placeholder='Write a comment' value={comment} onChange={e => setComment(e.target.value)}/>
                        </FormGroup>
                        <Button type="submit" className="my-3" size="lg" disabled={rating === 0}>Submit</Button>
                    </Form>
                </ListGroupItem>}
            </ListGroup>
        </Col>
    </Row>
  )
}

export default CreateRatingForm