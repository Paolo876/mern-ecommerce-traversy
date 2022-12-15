import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, CarouselItem, Container, Image, Button  } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import useProductsRedux from '../hooks/useProductsRedux'
import currencyFormatter from '../utils/currencyFormatter'
const ProductCarousel = () => {
  const { productsList:{ showcaseProducts, isLoading, error} } = useProductsRedux();
  const [ showOverlay, setShowOverlay ] = useState(false)
  console.log(showOverlay)
  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error}</Message>
  return (
    <Carousel pause="hover" className='bg-dark mb-5 carousel-component'>
        {showcaseProducts.map(item => (
            <CarouselItem key={item._id} onMouseEnter={() => setShowOverlay(true)} onMouseLeave={() => setShowOverlay(false)}>
                <Link to={`/product/${item._id}`}>
                    <Image src={item.bannerImage.url} alt={item.bannerImage.name} className="d-block w-100 hover-shadow"/>
                    <Carousel.Caption className='carousel-caption text-dark'>
                        {/* <h2>{item.name} ({currencyFormatter(item.price)})</h2> */}
                    </Carousel.Caption>
                    {showOverlay && <div className='position-absolute translate-middle top-50 start-50 h-100 w-100 bg-dark bg-gradient bg-opacity-25'>
                    <Container className='text-light text-center p-5' style={{textShadow: "#333 1px 1px 3px"}}>
                        <h1 className='pt-5 m-5'>{item.name} {!item.hasOptions && `- ${currencyFormatter(item.price)}`}</h1>
                        <p className='m-5 px-5'>{item.description}</p>
                        <Button variant="outline-light" size="lg" className='mt-5'>SHOP NOW</Button>
                    </Container>
                </div>}
                </Link>
            </CarouselItem>
        ))}
    </Carousel>
  )
}

export default ProductCarousel