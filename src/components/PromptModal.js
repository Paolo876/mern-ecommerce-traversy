import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap'

const PromptModal = ({ modalDetails, setModalDetails, handleConfirm, title, bodyInfo }) => {
  const { show } = modalDetails;

  return (
    <Modal show={show} onHide={() => setModalDetails({show: false, data: null})}>
        <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>
            {bodyInfo.map(item => (
              <p key={item.label}><strong>{item.label}: </strong>{item.description}</p>
            ))}
        </ModalBody>
        <ModalFooter>
            <Button variant="danger" onClick={handleConfirm}>CONFIRM</Button>
            <Button variant="secondary" onClick={() => setModalDetails({show: false, data: null})}>CANCEL</Button>
        </ModalFooter>
    </Modal>
  )
}

export default PromptModal