import React from 'react'
import { Pagination } from 'react-bootstrap' 
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, keyword="", isAdmin=false}) => {
  if (pages > 1) return (
    <Pagination>
        {Array(pages).fill(1).map((item, index) => (
            <LinkContainer 
                key={item + index} 
                to={
                    isAdmin ? 
                        (keyword ? `/search/${keyword}/page/${item + index}` : `/product-list/${item + index}`)
                    :
                        (keyword ? `/search/${keyword}/page/${item + index}` : `/page/${item + index}`)
                    }
            >
                <Pagination.Item active={item + index === page}>{item + index}</Pagination.Item>
            </LinkContainer>
        ))}
    </Pagination>
  )

}

export default Paginate