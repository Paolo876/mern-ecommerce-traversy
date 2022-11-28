import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Image } from 'react-bootstrap'
import useUserRedux from '../hooks/useUserRedux'
import useProductsRedux from "../hooks/useProductsRedux"
import useDocumentTitle from "../hooks/useDocumentTitle"
import Message from '../components/Message'
import Loader from '../components/Loader'
import PromptModal from '../components/PromptModal'
import PostAddIcon from '@mui/icons-material/PostAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Paginate from '../components/Paginate'
import SearchBox from '../components/SearchBox'

const ProductListPage = () => {
  useDocumentTitle("Admin | Products")
  const { keyword, pageNumber=1 } = useParams();
  // const params = useParams();
  // console.log(params)
  const navigate = useNavigate();
  const { user: { userData } } = useUserRedux();
  const { productsList: { products, isLoading, error, success, pages, page }, deleteProduct, clearSuccess, fetchProducts } = useProductsRedux();
  const [ modalDetails, setModalDetails ] = useState({show: false, data: null});

  // if not logged in or not an admin, redirect
  useEffect(() => {
    if(!userData) navigate("/login")
    if(userData && !userData.isAdmin) navigate("/")
    if(userData && userData.isAdmin) fetchProducts({keyword, pageNumber})
  }, [userData, keyword, pageNumber])



  //delete product
  const handleProductDelete = () => {
    deleteProduct(modalDetails.data._id)
  }

  useEffect(() => {
    if(success){
      setModalDetails({show: false, data: null})
      const timeout = setTimeout(() => clearSuccess(), 10000)
      return () => {
        clearTimeout(timeout)
        clearSuccess();
      }
    }
  }, [success])


  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error.message}</Message>
  return (
    <>
        {success && <Message variant="success" onClose={() => clearSuccess()} dismissible>{success}</Message>}
        <Row className="align-items-center mb-3">
          <Col md={12}><h1>Products</h1></Col>
          <Col md={9} className="d-grid pe-5"><SearchBox isAdmin={true}/></Col>
          <Col md={3} className="d-grid ps-5">
            <LinkContainer to="/create-product">
              <Button className='me-0' size="lg" variant="primary" style={{fontSize: ".9em"}}>
                <PostAddIcon/> <strong>Create new Product</strong>
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>IMAGE</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>INSTOCK</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {products.map(item => (
                    <tr key={item._id} style={{backgroundColor: `${item.countInStock === 0 ? "rgba(255, 146, 0, 0.51)" : ""}`}}>
                        <th><Link to={`/product-details/${item._id}`}>{item._id}</Link></th>
                        <th>{item.name}</th>
                        <th><Image src={item.image.thumbnail} fluid style={{ maxHeight: '50px' }}/></th>
                        <th>{item.price}</th>
                        <th>{item.category}</th>
                        <th>{item.brand}</th>
                        <th>{item.countInStock === 0 ? <p style={{color:"red"}}>{item.countInStock}</p> : item.countInStock}</th>
                        <th className='p-2'>
                            <LinkContainer to={`/product-details/${item._id}`}>
                                <Button variant='secondary' className='btn-sm me-2'><EditIcon style={{margin: "0"}}/></Button>
                            </LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={() => setModalDetails({show: true, data: item})}><DeleteIcon style={{margin: "0"}}/></Button>
                        </th>
                    </tr>
                ))}
            </tbody>
        </Table>
        <Paginate pages={pages} page={page} isAdmin={true}/>
        {modalDetails.show && <PromptModal 
          title={"Are you sure you want to delete this product?"}
          bodyInfo={[
            {label: "ID", description: modalDetails.data._id},
            {label: "Name", description: modalDetails.data.name},
            {label: "Price", description: modalDetails.data.price},
            {label: "InStock", description: modalDetails.data.countInStock},
          ]}
          modalDetails={modalDetails} 
          setModalDetails={setModalDetails} 
          handleConfirm={handleProductDelete}
        />}
    </>
  )
}

export default ProductListPage