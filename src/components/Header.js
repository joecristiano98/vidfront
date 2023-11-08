import React from 'react'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
       
         <Navbar className="bg-primary">
          <Container>
  <Link to={"/"} style={{textDecoration: 'none'}}>
              <Navbar.Brand >
                <img
                  alt=""
                  src="https://i.postimg.cc/jjNDTKq4/video-icon.png"
                  width="60"
                  height="60"
                  className="d-inline-block align-top"
                />{' '}
                <b style={{fontSize:'40px'}}>Upvids</b>
              </Navbar.Brand>
              </Link>      
            </Container>
          </Navbar> 
        
       

    </div>
  )
}

export default Header