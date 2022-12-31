import React, { useEffect, useRef } from 'react'
import './Attendance.css'
import { Button } from '@mui/material'
import videoSrc from '../../video_gameOn.mp4'
import captureVideoFrame from "capture-video-frame";
import axios from 'axios'
import { convertLength } from '@mui/material/styles/cssUtils';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

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
        return dataURItoBlob(frame.dataUri)

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

        //Old Code
        //write the ArrayBuffer to a blob, and you're done
        //var bb = new BlobBuilder();
        //bb.append(ab);
        //return bb.getBlob(mimeString);

        //New Code
        return new Blob([ab], { type: mimeString });


    }


    useEffect(() => {

        startVideo()

        setInterval(() => {

            const ss = capture()


            var data = new FormData();
            data.append('frame', ss);


            var config = {
                method: 'post',
                url: 'http://localhost:8000/presentee',
                headers: { 'content-type': 'multipart/form-data' },
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
                <Button variant="contained" color="error"  > Stop Camera </Button>
                <div className="attenFeedbackCon border">
                </div>
            </section>
        </>
    )
}
