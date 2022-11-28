import { useState } from 'react'
import { Form, Button, FormControl } from 'react-bootstrap'
import { useNavigate, Route } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
const SearchBox = ({isAdmin = false}) => {
  const navigate = useNavigate();
  const [ keyword, setKeyword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(keyword.trim()) {
      if(isAdmin){
        navigate(`/search/${keyword}`)
      } else {
        navigate(`/search/${keyword}`)
      }
    } else {
      navigate(`/`)
    }
  }
  return (
    <Form onSubmit={handleSubmit} className="d-inline-flex">
        <FormControl type="text" name="keyword" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Search Products..." className='me-sm-2 ms-sm-5'/>
        <Button type="submit" variant="outline-success" className='p-2 '><SearchIcon style={{margin: "0"}}/></Button>
    </Form>
  )
}

export default SearchBox