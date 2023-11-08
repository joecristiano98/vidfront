import React, { useEffect } from 'react'
import { useState } from 'react';
import {  FloatingLabel, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Trash } from 'react-feather';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, deleteCat, getAllCat, getAllCategories, getVideo, updateCategory } from '../services/allapis';
import uniqid from 'uniqid'



function Categories() {

  // state to hold input, id and video array

  const [catInputs, setCatInputs] = useState({
    id: "",
    name: "",
    videos: []
  })

  const [categories, setCategories] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setInputs = (e) => {
    const { value, name } = e.target
    setCatInputs({ ...catInputs, [name]: value })
  }


  const addData = async () => {
    let id = uniqid()
    setCatInputs({ ...catInputs, ["id"]: id })


    const { name } = catInputs
    if (name == "") {
      toast.error('please provide caption', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
    else {
      //api call
      const result = await addCategory(catInputs)
      if (result.status >= 200 && result.status < 300) {
        setShow(false)
        // console.log();
      }

      getAllCategories()

      toast.success(` ${result.data.name} added`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
  }
  //console.log(catInputs);

  const getAllCategories = async () => {
    const result = await getAllCat()
    if (result.status >= 200 && result.status < 300) {

      setCategories(result.data)
    }
  }
  // console.log(Categories);

  const removeCategory = async (id) => {
    const result = await deleteCat(id)
    if (result.status >= 200 && result.status < 300) {
      // refresh category list
      getAllCategories()
    }
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  const dragOver = (e) => {
    e.preventDefault()
    console.log("dragged over the category ...");
  }

  const dropped = async (e, id) => {
    console.log("dropped...cat Id -" + id);
    // video id access
    const videoId = e.dataTransfer.getData("cardId")
    console.log(videoId);

    // access video data from backend
    const { data } = await getVideo(videoId)
    console.log(data);

    // select dropped category from all categories
    const selectedCategory = categories.find(i => i.id == id)
    console.log(selectedCategory);

    // update category object with video data
    selectedCategory.videos.push(data)
    console.log(selectedCategory);

    // api call to update the changed category in backend
    await updateCategory(id, selectedCategory)
    getAllCategories()



  }

  return (
    <div>

      
        <Button className=' w-100 ms-5' variant="primary" onClick={handleShow}>
          Add Category
        </Button>
        {
          categories.length > 0 ? (
            categories.map(i => (
              <div droppable
                
              onDragOver={(e) => dragOver(e)}
                onDrop={(e) => dropped(e, i.id)}
                className='border mt-3 p-3 ms-5 w-100 bg-dark text-white'>
                <p className='fs-3'>{i.name}</p>
                <div className='text-end'>
                  <Trash onClick={() => (removeCategory(i.id))} size={55} className='text-danger btn'></Trash>
                </div>
  
                {
                  i.videos.map(j => (
                    <img className='p-1' style={{ height: '60px', width: '60px' }} src={j.cover_image} alt="" />
                  ))
                }
  
  
              </div>
            ))
          ) : <h3>No Categories added yet</h3>
        }
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId='floatingInput'
            label="Category Name"
            className='text-dark'>

            <FormControl onChange={(e) => setInputs(e)} name="name" type='text'></FormControl>
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addData}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default Categories