import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const PageTwo = (): any => {
    useEffect(() => {
        document.title = 'page2'
    }, [])

    return (
        <div>
            <p>PageTwo</p>
            <div>
                <Link to='/page1'>到pageOne</Link>
            </div>
            <div>
                <Link to='/page3'>到pageThree</Link>
            </div>
        </div>
    );

}

export default PageTwo