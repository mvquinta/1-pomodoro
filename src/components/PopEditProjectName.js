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


export default function PopEditProjectName(props) {

    const [newProjectName, setNewProjectName] = React.useState('')

    //reads onChange what is being written in the input field changing newProjectName state
    //than is used as an argument to make it the new active project and, in consequence, creating a new project.
    //then sets toggle to false closing the window
    function handleOkClick () {
        props.valueSetActiveProjectName(newProjectName)
        props.valueSetPopProjectName(false)
    }

    //sets toggle to false closing the window
    function handleCancelClick() {
        props.valueSetPopProjectName(false)
    }
    
    return(
        <div style={styles.container}>
            <div style={styles.popupedit}>
                <label>Project Name</label>
                <input 
                type='text'
                placeholder='New Project Name'
                onChange={(e) => setNewProjectName(e.target.value)}
                style={styles.popinput}
                />
                <button style={styles.popbuttons} onClick={handleOkClick}>OK</button>
                <button style={styles.popbuttons} onClick={handleCancelClick}>Cancel</button>
            </div>
        </div>
    )
}