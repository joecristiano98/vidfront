import React from 'react'
import { Col, Row } from 'react-bootstrap'



function Footer() {
  return (


    <div className=' p-5 bg-info mt-2'>

      <Row>

        <Col lg={1}>
          <img
            src="https://i.postimg.cc/jjNDTKq4/video-icon.png"
            alt=""
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </Col>
        <Col lg={2}>
        <p><i class="fa-regular fa-copyright" style={{color: '#0c1018'}}></i> 2023 Upvids</p>
        </Col>
        
        <Col lg={6}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo laudantium autem commodi necessitatibus ea eum porro est maxime amet iure vero quas tempora, dicta harum velit at voluptatem qui similique!
        </Col>

        <Col>
          <Row>
            
            <Col >
            <p>Contact Us :</p>
              <a href="https://www.youtube.com/"><i class="fa-brands fa-youtube fa-2x" style={{ color: '#2d1c5f' }}></i> </a>
              <a href='https://www.facebook.com/login/'><i class="fa-brands fa-facebook fa-2x ms-1" style={{ color: '#2d1c5f' }}></i></a>
              <a href='https://www.instagram.com/'><i class="fa-brands fa-instagram fa-2x ms-2" style={{ color: '#2d1c5f' }}></i></a>
              <a href='https://twitter.com/i/flow/login'><i class="fa-brands fa-square-x-twitter fa-2x ms-2" style={{ color: '#2d1c5f' }}></i></a>
              <a href='https://in.pinterest.com/'><i class="fa-brands fa-pinterest fa-2x ms-2" style={{ color: '#2d1c5f' }}></i></a>
            </Col>
          </Row>
        </Col>


      </Row>

    </div>

  )
}

export default Footer