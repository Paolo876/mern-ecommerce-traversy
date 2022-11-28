import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, CarouselItem, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import useProductsRedux from '../hooks/useProductsRedux'
import currencyFormatter from '../utils/currencyFormatter'
const ProductCarousel = () => {
  const { productsList:{ showcaseProducts, isLoading, error} } = useProductsRedux();

  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error}</Message>
  return (
    <Carousel pause="hover" className='bg-dark mb-5'>
        {showcaseProducts.map(item => (
            <CarouselItem key={item._id}>
                <Link to={`/product/${item._id}`}>
                    <Image src={item.image.url} alt={item.image.name}/>
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{item.name} ({currencyFormatter(item.price)})</h2>
                    </Carousel.Caption>
                </Link>
            </CarouselItem>
        ))}
    </Carousel>
  )
}

export default ProductCarousel