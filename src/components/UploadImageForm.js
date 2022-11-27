import { useState, useEffect, useRef } from 'react'
import { FormGroup, FormControl, FormLabel, Image, Button } from 'react-bootstrap'
import Message from './Message';

const UploadImageForm = ({ image, setImage}) => {
  const [ imageData, setImageData] = useState(null);
  const [ imageError, setImageError] = useState(null);
 
  const inputRef = useRef();
  const onChangeImage = (e) => {
    if (e.target.files[0]) {
      if(e.target.files[0].size < 1100000){
        setImageData(e.target.files[0]);
        setImageError(null)
        const reader = new FileReader();
        reader.addEventListener("load", () => setImage(reader.result));
        reader.readAsDataURL(e.target.files[0]);  
      } else {
        setImageError("Image size too large. (please choose an image less than 1mb)")
        handleRemoveImage();
      }
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
        {imageError && <Message variant="danger"><small>{imageError}</small></Message>}
        {image && <div>
          <Button className='float-end mb-1' variant="warning" size="sm" onClick={handleRemoveImage}>Remove Image</Button>
          <Image src={image} alt="preview-image" fluid/>
        </div>}
        <FormControl type="file" accept="image/*" onChange={e => onChangeImage(e)} autoComplete="image" className="mt-2" ref={inputRef} required/>
    </FormGroup>
  )
}

export default UploadImageForm