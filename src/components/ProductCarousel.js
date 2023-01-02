import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, CarouselItem, Container, Image, Button  } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import useProductsRedux from '../hooks/useProductsRedux'
import currencyFormatter from '../utils/currencyFormatter'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Rating from './Rating';
import productOptionsPrices from '../utils/productOptionsPrices';

const ProductCarousel = () => {
  const { productsList:{ showcaseProducts, isLoading, error} } = useProductsRedux();
  const [ showOverlay, setShowOverlay ] = useState(false)
  console.log(showcaseProducts)
  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error}</Message>
  return (
    <Carousel pause="hover" className='bg-dark mb-5 carousel-component' indicators={false}>
        {showcaseProducts.map(item => (
            <CarouselItem key={item._id} onMouseEnter={() => setShowOverlay(true)} onMouseLeave={() => setShowOverlay(false)}>
                <Link to={`/product/${item._id}`}>
                    <Image src={item.bannerImage.url} alt={item.bannerImage.name} className="d-block w-100 hover-shadow"/>
                    {showOverlay && <div className='position-absolute translate-middle top-50 start-50 h-100 w-100 bg-dark bg-gradient bg-opacity-50'>
                    <Container className='text-light text-center p-5' style={{textShadow: "#333 1px 1px 3px"}}>
                        <h1 className='pt-5 mt-5' style={{letterSpacing: ".05em", fontSize: "2.2em"}}>
                            {item.name} 
                            {item.hasOptions ? ` (${productOptionsPrices(item.productOptions)})` : ` (${currencyFormatter(item.price)})`}
                        </h1>
                        <Rating value={item.rating} text={`${item.numReviews} reviews`} className="justify-content-center"/>
                        <p className='m-5 px-5' style={{letterSpacing: ".01em"}}>{item.description}...</p>
                        <Button variant="info" size="lg" className='mt-5 px-4 '>CLICK HERE TO SEE MORE <ChevronRightIcon style={{marginRight: 0}}/></Button>
                    </Container>
                </div>}
                </Link>
            </CarouselItem>
        ))}
    </Carousel>
  )
}

export default ProductCarousel