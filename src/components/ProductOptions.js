import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListGroupItem, Row, Col, DropdownButton, Dropdown, Image, FormControl, Button, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';
import currencyFormatter from "../utils/currencyFormatter";
import Loader from './Loader';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import useCartRedux from '../hooks/useCartRedux'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ProductOptions = ({ options, selected, setSelected, quantity, setQuantity, product}) => {
  const { addToCart, cart: {isLoading: isCartLoading} } = useCartRedux();  
  const navigate = useNavigate();
  const [ showModal, setShowModal ] = useState(false);
  const addToCartHandler = () => {
    setShowModal(true)
    console.log({...product, quantity, option: selected})
  }
  const handleHideModal = () => {
    setShowModal(false);
    setQuantity(1)
  }
  return (
    <>
        <ListGroupItem>
            <h5 className="mb-3">Select Options:</h5>
                <Row>
                    <Col xs={12}>
                    <div className="d-grid">
                        <DropdownButton title={selected && selected.name ? selected.name : "choose an option"} variant="light" className='product-option-dropdown' >
                            {options.map(_item => 
                                <Dropdown.Item key={_item._id} className="d-flex flex-row justify-content-start align-items-center" style={{width: "100%"}} 
                                    onClick={() => setSelected(_item)}>
                                    <Image src={_item.image.thumbnail} alt={_item.image.id} fluid style={{maxHeight: "40px"}} className="me-2"/>
                                    <span>{_item.name}</span>
                                    <span style={{marginLeft: "auto", marginRight: "1em"}}>{currencyFormatter(_item.price)}</span>
                                </Dropdown.Item>)}
                        </DropdownButton>
                    </div>
                    </Col>
                </Row>
        </ListGroupItem>
        {selected &&
        <>
            <ListGroupItem>
                <Row>
                    <Col>Price:</Col>
                    <Col><strong>{currencyFormatter(selected.price)}</strong></Col>
                </Row>
            </ListGroupItem>
            <ListGroupItem>
                <Row>
                    <Col>Qty:</Col>
                    <Col>
                        <FormControl as="select" value={quantity} onChange={e => setQuantity(e.target.value)}>
                            {[...Array(parseInt(selected.countInStock)).keys()].map(item => (
                                <option key={item + 1} value={item + 1}>{item + 1}</option>
                            ))}
                        </FormControl>
                    </Col>
                </Row>
            </ListGroupItem>
            <ListGroupItem>
                {isCartLoading && <Loader/>}
                {!isCartLoading &&
                    <div className="d-grid">
                        <Button className='btn-block mx-3 my-3' type="button" disabled={selected.countInStock === 0} onClick={addToCartHandler} size="lg"><AddShoppingCartIcon/> ADD TO CART</Button>
                    </div>}
            </ListGroupItem>
            <Modal show={showModal} onHide={handleHideModal}>
                <ModalHeader closeButton>
                    <ModalTitle>Successfully Added To Cart! <CheckCircleOutlineIcon style={{color: "green", marginLeft: ".25em"}}/> </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={3}><Image src={selected.image.thumbnail} alt={product.image.name} fluid style={{maxHeight: "100px"}} rounded/></Col>
                        <Col md={5}><h6>{product.name} - {selected.name}</h6></Col>
                        <Col md={2}><span>Price: <p>${selected.price}</p></span></Col>
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

export default ProductOptions