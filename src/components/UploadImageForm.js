import { useState, useRef } from 'react'
import { FormGroup, FormControl, FormLabel, Image, Button } from 'react-bootstrap'

const UploadImageForm = ({ image, setImage, imageData, setImageData }) => {
  const inputRef = useRef();
  const onChangeImage = (e) => {
    if (e.target.files[0]) {
      setImageData(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => setImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handleRemoveImage = () => {
    setImageData(null)
    setImage(null)
    inputRef.current.value = "";
  }
  return (
    <FormGroup controlId='image' className="my-4">  
      <FormLabel><strong>Primary Image</strong></FormLabel>    
        {image && imageData && <div>
          <Button className='float-end mb-1' variant="warning" size="sm" onClick={handleRemoveImage}>Remove Image</Button>
          <Image src={image} alt="preview-image" fluid/>
        </div>}
        <FormControl type="file" accept="image/*" onChange={e => onChangeImage(e)} autoComplete="image" className="mt-2" ref={inputRef}/>
    </FormGroup>
  )
}

export default UploadImageForm