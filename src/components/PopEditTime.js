import React from 'react'

const styles = {
    container: {
        position: 'relative',
    },
    popupedit: {
        color: '#2d2d2d',
        boxSizing: 'border-box',
        position: 'absolute',
        width: '220px',
        height:'220px',
        left: '15%',
        transform: 'translateY(-34px)',
        borderRadius: '20px',
        border: '4px solid #F2636F',
        backgroundColor: '#F2E7DC',
        textAlign: 'center',
        fontSize: '24px',
        paddingTop:'10%',
    },
    popbuttons: {
        background: 'none',
        border: 'none',
        fonSize: '1.125rem',
        cursor: 'pointer',
        color: '#2d2d2d',
        marginTop:'20px',

        "&:hover": {
            color: '#F2E7DC',
            border: '2px solid red',
        },
    },
    popinput: {
        border: 'none',
        backgroundColor: '#FFF5EC',
        width: '80px',
        marginTop:'20px',
        marginLeft:'10px',
        fontSize: '1.125rem',
        textAlign: 'center',
    },
}

export default function PopEditTime(props) {

    const [editTime, setEditTime] = React.useState(0)
    const [secondsEditTime, setSecondsEdiTime] = React.useState(0)

    //reads the input fields and converts it to seconds. This value is than used to update the setSession time back in ClockTimer.js
    function handleOkClick () {
        const convertedTime = parseInt(editTime) * 60 + parseInt(secondsEditTime)
        props.valueSetSession(convertedTime)
        props.valueSetPopEditTime(false)
    }

    function handleCancelClick() {
        props.valueSetPopEditTime(false)
    }


    return(
        <div style={styles.container}>        
            <div style={styles.popupedit}>
                <label>Minutes</label>
                <input
                type='number'
                onChange={(e) => setEditTime(e.target.value)}
                placeholder='25'
                style={styles.popinput} />
                <label>Seconds</label>
                <input
                type='number'
                min='0'
                onChange={(e) => setSecondsEdiTime(e.target.value)}
                placeholder='0'
                style={styles.popinput} />
                <button style={styles.popbuttons} onClick={handleOkClick}>OK</button>
                <button style={styles.popbuttons} onClick={handleCancelClick}>Cancel</button>
            </div>
        </div>
    )
}