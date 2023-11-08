import React from 'react'
import { useState } from 'react';
import { FloatingLabel, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import uniqid from 'uniqid'
import { addVideo } from '../services/allapis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({update}) {

  // state to hold input datas
  const [inputs, setInputs] = useState({
    id: "",
    caption: "",
    cover_image: "",
    video_url: ""
  })

  // function for onChange 
  const setValues = (e) => {
    let { value, name } = e.target
    //console.log(value,name);
    setInputs({ ...inputs, [name]: value })
  }

  // function to extract video url
  const extractUrl = (e) => {
    let videoUrl = e.target.value
    // console.log(videoUrl);
    if (videoUrl.includes("v=")) {
      let subUrl = videoUrl.split("v=")[1]
      //console.log(subUrl);
      let finalUrl = `https://www.youtube.com/embed/${subUrl}?autoplay=1`

      setInputs({ ...inputs, ["video_url"]: finalUrl })
    }
  }
  // function to add button click
  const addHandle = async () => {
    let id = uniqid()
    // console.log(id);
    setInputs({ ...inputs, ["id"]: id })
    
    const {caption,cover_image,video_url}=inputs
    
    if(caption==""||cover_image==""||video_url==""){
    toast.error('all inputs are required', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });}
      else{
    const result = await addVideo(inputs)
    console.log(result);

    if (result.status >= 200 && result.status < 300) {
      
      // update state of home
      update(result.data)
      
      toast.success('video added', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });}
      setShow(false)
    
    
    }
  }

  console.log(inputs);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>

      <i onClick={handleShow} class="fa-solid fa-circle-plus fa-3x fa-beat ms-3 mt-3" style={{ color: "#063a93" }}></i>


      <Modal show={show} onHide={handleClose}>



        <Modal.Body>
          <Modal.Title>Upload Video</Modal.Title>

          <FloatingLabel controlId="floatingInput"
            label="Video Caption"
            className='text-dark'>
            <FormControl name='caption' onChange={(e)=>setValues(e)}></FormControl>
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput1"
            label="Cover Image URL"
            className='text-dark'>
            <FormControl name='cover_image' onChange={(e)=>setValues(e)}></FormControl>
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput2"
            label="YouTube Video URL"
            className='text-dark'>
            <FormControl onChange={(e)=>extractUrl(e)}></FormControl>
          </FloatingLabel>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="light" onClick={addHandle}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default Add