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
        transform: 'translateY(-200px)',
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

export default function PopSwitchProj(props) {

    const [selectedProj, setSelectedProj] = React.useState('')

    function handleOkClick(event) {
        props.valueSetActiveProjectName(event.target.innerText)
        props.valueSetProjectName(event.target.innerText)
        props.valueSetToggleSwitchProj(false)
    }
    function handleCancelClick() {
        props.valueSetToggleSwitchProj(false)
    }
    return(
        <div style={styles.container}>
            <div style={styles.popupedit}>
                <label>Select Project</label>
                <ul>
                    {props.valueMergedProjs.map((item) => (
                    <li key={item}>
                        <button onClick={handleOkClick}>{item}</button>
                    </li>
                    ))} 
                </ul>
                <button style={styles.popbuttons} onClick={handleCancelClick}>Cancel</button>
            </div>
    </div>
    )
}