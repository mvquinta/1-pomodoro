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

    /*const [mergedProjectNames, setMergedProjectNames] = React.useState([])

    function handleOkClick() {
        console.log(props.valueMergedProjectNames)
        console.log(typeof props.valueMergedProjectNames)
        //props.valueMergedProjectNames.map((item) => console.log(item))
    }

    function handleMergeProjectNames() {
        const allProjNames = props.valueTodos.map((todo) => todo.project)
        allProjNames.map((item) => {
            if(mergedProjectNames.includes(item) === false) {
                setMergedProjectNames(mergedProjectNames.push(item))
            }
            return mergedProjectNames
        })
        console.log('handle merge',mergedProjectNames)
    }*/

    function handleCancelClick() {
        props.valueSetToggleSwitchProj(false)
    }
    return(
        <div style={styles.container}>
            <div style={styles.popupedit}>
                <label>Select Project</label>
                {props.valueMergedProjs.map((item) => (
                    <div key={item}> {/*need a better key here!*/}
                        {item}
                    </div>
                ))}                
                <button style={styles.popbuttons} >OK</button>
                <button style={styles.popbuttons} onClick={handleCancelClick}>Cancel</button>
            </div>
    </div>
    )
}