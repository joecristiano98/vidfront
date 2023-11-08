import { Button } from 'react-bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'


function LandingPage() {
  return (
    <div className='ms-3'>
        <h1>Welcome Folks!</h1>
       
       <Link to={'/home'}>
         
         <Button>Get Started</Button>
         
       </Link>
        
       <img className='me-5' style={{float:'right'}} src="https://i.postimg.cc/Kz3sqqdx/imb.png" alt="" />
        </div>
  )
}

export default LandingPage