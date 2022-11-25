import { useState } from 'react'
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap'

const UploadImageForm = ({ image, setImage, imageData, setImageData }) => {
  return (
    <FormGroup controlId='image' className="my-4">
        <FormLabel><strong>Primary Image</strong></FormLabel>
        <FormControl type="file" placeholder="NOT AVAILABLE YET" value={image} onChange={e => setImage(e)} autoComplete="image"/>
    </FormGroup>
  )
}

export default UploadImageForm