import React, {Component} from 'react';
import Img404 from '../../assets/images/Err404.gif';
import "./Err404.css"
class Error404 extends Component {

    render() {
        return(
            <div id="pg404">
                <h1 class="err404">Error 404</h1>
                <img src={Img404} alt="Error 404" />
                <h3 class="err404">Page not Found!</h3>
            </div>
        )
    }

}

export default Error404;