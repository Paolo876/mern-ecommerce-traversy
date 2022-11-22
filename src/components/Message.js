import React from 'react'
import { Alert } from 'react-bootstrap'
const Message = ({ variant, children, opacity=100, onClose=false, dismissible=false}) => {
  return (
    <Alert variant={variant} className={`opacity-${opacity}`} onClose={onClose} dismissible={dismissible}>
        {children}
    </Alert>
  )
}

Message.defaultProps = {
    variant: 'info'
}
export default Message