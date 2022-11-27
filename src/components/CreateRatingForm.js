import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
const CreateRatingForm = ({product, setProduct}) => {
  const [ rating, setRating ] = useState(0)
  const [ comment, setComment ] = useState("")
  const [ name, setName ] = useState("")
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);


  if(isLoading) return <Loader/>
  if(error || cartError) return <Message variant="danger">{error || cartError}</Message>
  return (
    <Row>
        <Col></Col>
    </Row>
  )
}

export default CreateRatingForm