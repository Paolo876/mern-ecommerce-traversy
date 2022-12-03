import React from 'react'
import { Spinner } from 'react-bootstrap'
const Loader = () => {
  return (
    <Spinner 
        animation='grow'
        role="status"
        style={{
            width: '100px',
            height: '100px',
            margin: 'auto',
            padding: "2em",
            display: 'block',
            opacity: ".5"
        }}
        >
    </Spinner>
  )
}

export default Loader