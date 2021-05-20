import React from 'react'

const styles = {
    container: {
        position: 'relative',
    },
    hovertip: {
        color: '#F2E7DC',
        boxSizing: 'border-box',
        position: 'absolute',
        width: '160px',
        bottom: '100%',
        left: '50%',
        marginLeft: '-80px',
        borderRadius: '3px',
        backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
        padding: '7px',
        marginBottom: '5px',
        textAlign: 'center',
        fontSize: '14px'
    }
}

//this Hover component can be used everywhere I want to have a small popup window with some hint for the user.
//when called, I just have to pass in the text I want to show
//is being used in ClockTimer.js

export default function Hovertip(props) {
    const [hovering, setHovering] = React.useState(false)


    function handleMouseOver() {
        setHovering(true)
    }

    function handleMouseOut() {
        setHovering(false)
    }

    return(
        <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={styles.container}>
            {hovering ? <div style={styles.hovertip}>{props.text}</div> : null}
            {props.children}
        </div>
    )
}
