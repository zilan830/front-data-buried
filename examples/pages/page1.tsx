import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

class PageOne extends PureComponent {

    componentDidMount() {
        document.title = 'page1'
    }

    render() {
        return (
            <div>
                <p>PageOne</p>
                <div>
                    <Link to='/page2'>到pageTwo</Link>
                </div>
                <div>
                    <Link to='/page3'>到pageThree</Link>
                </div>
            </div>
        );
    }
}

export default PageOne