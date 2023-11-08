import React from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Trash2 } from 'react-feather';
import { addHistory, deleteVideo } from '../services/allapis';
import uniqid from 'uniqid'
import { format } from 'date-fns';


function VideoCard({ video, deleteFunc }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    // body

    // id
    var id = uniqid()

    // title
    var video_title = video.caption

    // url
    var url = video.video_url

    // date
    var date = format(new Date(), 'yyyy-MM-dd h:mm:ss a')
    // console.log(date);

    const body = {id, video_title, url, date}
    if (body) {
      // api call
      const result = await addHistory(body)
      // console.log(result);
    }
  }

  const handleDelete = async (id) => {
    const result = await deleteVideo(id)
    if (result.status >= 200 && result.status < 300) {
      deleteFunc(result.data)
    }
  }

  const dragStart = (e, id) => {
    console.log("drag started ... source card id-" + id);

    // store dragged data
    e.dataTransfer.setData("cardId", id)
  }

  return (
    <div style={{ display: 'flex' }}>
      <Card  className='mt-3 bg-dark text-white' draggable onDragStart={(e) => dragStart(e, video.id)} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={video.cover_image} onClick={handleShow} />
        <Card.Body>
          <Card.Title><h5>{video.caption.length>18?video.caption.slice(0,18)+"..":video.caption}</h5></Card.Title>

          <div className='text-end'>
            <Trash2 onClick={() => handleDelete(video.id)} size={55} className='btn text-danger'></Trash2>
            {/* <i class="fa-solid fa-trash" style={{color: '#d3d7df'}}></i> */}

          </div>
        </Card.Body>
      </Card>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe width="476" height="381"
            src={video.video_url}
            title="അഴലിന്റെ ആഴങ്ങളിൽ  | Azhalinte Azhangalil | Ayalum Njanum Thammil Official Song"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>

          </iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default VideoCard