import React from 'react'
import { ListGroupItem, Row, Col, DropdownButton, Dropdown, Image, FormControl } from 'react-bootstrap';
import currencyFormatter from "../utils/currencyFormatter"
const capitalizeFirstLetter = (str) =>  str[0].toUpperCase() + str.slice(1);

const ProductOptions = ({ options, selected, setSelected, quantity, setQuantity}) => {
    // if(selected) console.log(Object.values(selected))
    console.log(selected && selected.countInStock)
  return (
    <>
        <ListGroupItem>
            <h5 className="mb-3">Select Options:</h5>
                <Row>
                    <Col xs={12}>
                    <div className="d-grid">
                        <DropdownButton title={selected ? selected.name : "choose an option"} variant="light" className='product-option-dropdown' >
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
        </>
        }
    </>
  )
}

export default ProductOptions