import React, { useEffect, useRef, useState } from 'react'
import { Button, TextField } from '@mui/material'
import captureVideoFrame from "capture-video-frame";
import './Enrollment.css'
import { createRoot } from 'react-dom/client';
import axios from 'axios'

export default function Enrollment() {

  const captureCon = useRef()

  const [ImgSrc, setImgSrc] = useState()
  const [Name, setName] = useState()
  const [Email, setEmail] = useState()

  async function startVideo() {

    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 } },
        (stream) => {
          const video = document.querySelector('video');
          video.srcObject = stream;
          video.onloadedmetadata = (e) => {
            video.play();
          };

        },
        (err) => {
          console.error(`The following error occurred: ${err}`);
        }
      );
    } else {
      console.log("getUserMedia not supported");
    }

  }

  function capture() {

    const frame = captureVideoFrame("video", "png");

    const root = createRoot(captureCon.current)
    root.render(
      <img className='capturedImg' src={frame.dataUri} />
    )

    console.log(dataURItoBlob(frame.dataUri));
    setImgSrc(dataURItoBlob(frame.dataUri))

  }

  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });


  }

  function handleSubmit() {


    var data = new FormData();
    data.append('name', Name);
    data.append('email', Email);
    data.append('image', ImgSrc);

    var config = {
      method: 'post',
      url: 'http://localhost:8000/enrollUser',
      headers: { 'content-type': 'multipart/form-data' },
      data: data
    };

    axios(config)
      .then(function (response) {
        alert(response.data.msg)
        window.location.href = '/'
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {

    startVideo()

  }, [])


  return (
    <>
      <section className="enrollSec border">

        <div className="showCapture" ref={captureCon} >
          <video id='video' className="cameraCon border"></video>
        </div>

        <Button variant="contained" sx={{ marginTop: '24px' }} onClick={() => { capture() }} >  Capture </Button>

        <TextField id="outlined-basic" defaultValue='' className='name' sx={{ width: '100%', margin: '12px 0 ' }} label="Name" onChange={(e) => { setName(e.target.value) }} variant="outlined" />
        <TextField id="outlined-basic" defaultValue='' className='email' sx={{ width: '100%', margin: '12px 0 ' }} label="Email" onChange={(e) => { setEmail(e.target.value) }} variant="outlined" />


        <Button variant="contained" color='success' sx={{ marginTop: '24px', width: '100%' }} onClick={() => { handleSubmit() }} >  Submit </Button>

      </section>
    </>
  )
}
