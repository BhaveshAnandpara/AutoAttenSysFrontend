import React from 'react'
import { Button } from '@mui/material'
import './TakeAttendance.css'

export default function TakeAttendance() {
    return (

        <>
            <section className='border takeAttensec'  >
                <Button variant="contained"  sx={{ position: 'absolute', bottom: '30px' }} onClick={()=>{ window.location.href = '/attendance' }} >Take Attendance</Button>
            </section>
        </>

    )
}
