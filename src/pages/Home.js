import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Add from '../components/Add'
import View from '../components/View'
import Categories from '../components/Categories'
import { Link } from 'react-router-dom'
import './home.css'

function Home() {
  
  // state for state state lifting
  const [addUpdate,setAddUpdate]=useState({})
  
  return (
    <div className='ms-3 '>
      
      <h1><span style={{color:'red'}}>U</span>pload <span style={{color:'red'}}>V</span>ideos <span style={{color:'red'}}>h</span>ere</h1>
<div>
  <Link style={{textDecoration:'none'}} to={'/watch-history'}>
    
    <a style={{fontFamily:'fantasy'}}><i class="fa-solid fa-clock-rotate-left fa-spin fa-spin-reverse"></i>View Watch History</a>
  
  </Link>
</div>
   <Row>
    
    <Col lg={1}> 
    <Add update={setAddUpdate}></Add>
    </Col>
   
    <Col lg={7}>
    <View updatedState={addUpdate}></View>
    </Col>
   
    <Col lg={3} >
    <Categories></Categories>
    </Col>
    
    </Row> 
    
    
    
    </div>
  )
}

export default Home