import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap'

const UserListModal = ({ modalDetails, setModalDetails, handleUserDelete }) => {
  const { show, user } = modalDetails;

  return (
    <Modal show={show} onHide={() => setModalDetails({show: false, user: null})}>
        <ModalHeader>
            <ModalTitle>Are you sure you want to delete this user?</ModalTitle>
        </ModalHeader>
        <ModalBody>
            <p><strong>ID: </strong>{user._id}</p>
            <p><strong>Name: </strong>{user.name}</p>
            <p><strong>Email: </strong>{user.email}</p>
        </ModalBody>
        <ModalFooter>
            <Button variant="danger" onClick={handleUserDelete}>CONFIRM</Button>
            <Button variant="secondary" onClick={() => setModalDetails({show: false, user: null})}>CANCEL</Button>
        </ModalFooter>
    </Modal>
  )
}

export default UserListModal