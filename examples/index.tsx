/* eslint-disable camelcase */

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ERouter from './route'
import { GetAllEvent } from './../src'

window.onload = () => {
    console.log("eeee")
    const params = {
        atom_id: 'ddd',
        soft_name: 'refee_1',//手机端续费:refee_1,车机:refee_2
        screen_x: window.screen.availWidth,
        screen_y: window.screen.availHeight,
        load_time: Date.now(),
        root:'http://192.168.12.53:8080/',
        url:'api/v1/event_track'
    }
    GetAllEvent({ ...params })
}




ReactDOM.render(
    <ERouter />,
    document.getElementById('example')
);