import React, { useEffect } from 'react'
import './Attendance.css'
import { Button } from '@mui/material'

export default function Attendance() {


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

    useEffect(() => {

            startVideo()



    }, [])
    

    return (
        <>
            <section className='attendSec border'>
                <video id='video' className="videoCon border"> </video>
                <Button variant="contained" color="error"> Stop Camera </Button>
                <div className="attenFeedbackCon border"> </div>
            </section>
        </>
    )
}
