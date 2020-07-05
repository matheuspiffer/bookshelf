import React from 'react'

const comment = (props) => {
    return (
        <div>
            <p>{props.comment}</p>
            <p>{props.date}</p>
        </div>
    )
}

export default comment