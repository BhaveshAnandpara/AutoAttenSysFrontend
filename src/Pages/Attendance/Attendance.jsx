import React, { useEffect, useRef } from 'react'
import './Attendance.css'
import { Button } from '@mui/material'
import videoSrc from '../../video_gameOn.mp4'
import captureVideoFrame from "capture-video-frame";
import axios from 'axios'

export default function Attendance() {

    const videoRef = useRef()

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

        const img = document.createElement('img')
        img.setAttribute("src", frame.dataUri);
        return img

    }


    useEffect(() => {

        startVideo()

        setInterval(async () => {

            const ss = capture()

            var data = new FormData();
            data.append('name', 'Bhavesh Anandpara');
            data.append('frame', ss);

            var config = {
                method: 'post',
                url: 'http://127.0.0.1:8000/presentee',
                headers: {
                    "content-type" : "application/json, text/* "
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });


        }, 5000)

    }, [])


    return (
        <>
            <section className='attendSec border'>
                <video ref={videoRef} id='video' className="videoCon border"> </video>
                <Button variant="contained" color="error" onClick={() => { capture() }} > Stop Camera </Button>
                <div className="attenFeedbackCon border">
                </div>
            </section>
        </>
    )
}
