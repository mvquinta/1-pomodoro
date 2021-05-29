import React from 'react'
import ReactDom from 'react-dom'

const styles = {
    container: {
      position: "fixed",
      zIndex: "100",
      top: '50%',
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    popupedit: {
      color: "#F2E7DC",
      boxSizing: "border-box",
      width: "350px",
      height: "350px",
      borderRadius: "40px",
      backgroundColor: "#F25C5C",
      textAlign: "center",
      fontSize: "24px"
    },
    editContainer: {
      backgroundColor: "#2D2D2D",
      borderRadius: "40px",
      border: "4px solid #F25C5C",
      height: "80%"
    },
    poph2: {
      padding: "50px 0 30px 0"
    },
    popInputContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "30px"
    },
    popLabel: {
      padding: "20px"
    },
    popinput: {
      border: "none",
      color: "#F2E7DC",
      backgroundColor: "#404040",
      borderRadius: "6px",
      width: "120px",
      fontSize: "1.25rem",
      textAlign: "center"
    },
    popButtonsContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "25px",
      color: "#2D2D2D"
    },
    popbuttons: {
      background: "none",
      border: "none",
      fonSize: "1.125rem",
      cursor: "pointer",
      color: "#2D2D2D",
      margin: "15px"
    }
  };

const overlayStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.5",
    zIndex: "100"
  };

export default function Modal(props) {

    const [newModalState, setnewModalState] = React.useState('')

    //reads onChange what is being written in the input field changing newModalState state
    //than is used as an argument to make it the new active project and, in consequence, creating a new project.
    //then sets toggle to false closing the window
    function handleOkClick () {
        props.valueSetActiveProjectName(newModalState)
        props.valueSetPopProjectName(false)
    }

    //sets toggle to false closing the window
    function handleCancelClick() {
        props.valueSetPopProjectName(false)
    }
    
    return ReactDom.createPortal(
        <>
            <div style={overlayStyles} />
            <div style={styles.container}>
                <div style={styles.popupedit}>
                    <div style={styles.editContainer}>
                        <h2 style={styles.poph2}>Add Project</h2>
                        <div style={styles.popInputContainer}>
                            <div>
                                <label style={styles.popLabel}>Project Name</label>
                                <input
                                type="text"
                                placeholder='New Project Name'
                                onChange={(e) => setnewModalState(e.target.value)}
                                style={styles.popinput}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={styles.popButtonsContainer}>
                        <button style={styles.popbuttons} onClick={handleOkClick}>
                        OK
                        </button>
                        <div>|</div>
                        <button style={styles.popbuttons} onClick={handleCancelClick}>
                        Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}