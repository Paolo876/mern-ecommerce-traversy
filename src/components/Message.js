import React from 'react'
import { Alert } from 'react-bootstrap'
const Message = ({ variant, children, opacity=100 }) => {
  return (
    <Alert variant={variant} className={`opacity-${opacity}`}>
        {children}
    </Alert>
  )
}

Message.defaultProps = {
    variant: 'info'
}
export default Message