import React from 'react'
import { Nav, NavItem, NavLink } from 'react-bootstrap'
import { LinkContainer,  } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1=false, step2=false, step3=false, step4=false}) => {
  return (
    <Nav className='justify-content-center mb-4'>
        <NavItem>
            {step1 ?
                <LinkContainer to='/cart'><NavLink>Checkout</NavLink></LinkContainer>
                :
                <NavLink disabled>Checkout</NavLink>
            }
        </NavItem>
        <NavItem>
            {step2 ?
                <LinkContainer to='/shipping'><NavLink>Shipping</NavLink></LinkContainer>
                :
                <NavLink disabled>Shipping</NavLink>
            }
        </NavItem>
        <NavItem>
            {step3 ?
                <LinkContainer to='/payment'><NavLink>Payment</NavLink></LinkContainer>
                :
                <NavLink disabled>Payment</NavLink>
            }
        </NavItem>
        <NavItem>
            {step4 ?
                <LinkContainer to='/place-order'><NavLink>Place Order</NavLink></LinkContainer>
                :
                <NavLink disabled>Place Order</NavLink>
            }
        </NavItem>
    </Nav>
  )
}

export default CheckoutSteps