import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'

const PageTwo = (): any => {
    useEffect(()=>{
        document.title='page2'
    },[])

    return (
        <div>
            <p>PageTwo</p>
            <Link to='/page1'>到pageOne</Link>
        </div>
    );

}

export default PageTwo