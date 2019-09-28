import React from "react";

import "../styles/square.css"

class Square extends React.Component {
    render() {
        return (
            <button className="square">{this.props.value}</button>
        )
    }

}

export default Square;