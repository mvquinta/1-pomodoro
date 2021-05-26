import React from 'react'

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
      gap: "30px",
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
      color: "#F2F2F2",
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

export default function PopSwitchProj(props) {

    //switches projects by reading the innertext of the clicked button and making it the active project
    //then sets toggle to false closing the window
    function handleOkClick(event) {
        props.valueSetActiveProjectName(event.target.innerText)
        props.valueSetToggleSwitchProj(false)
    }

    //sets toggle to false closing the window
    function handleCancelClick() {
        props.valueSetToggleSwitchProj(false)
    }
    return(
        <>
          <div style={overlayStyles} />
          <div style={styles.container}>
            <div style={styles.popupedit}>
              <div style={styles.editContainer}>
                <h2 style={styles.poph2}>Select Project</h2>
                <div style={styles.popInputContainer}>
                  <div>
                    {/*<label style={styles.popLabel}>Select Project</label>*/}
                    <ul>
                        {props.valueMergedProjs.map((item) => (
                        <li key={item}>
                            <button style={styles.popButtonsContainer} onClick={handleOkClick}>{item}</button>
                        </li>
                        ))} 
                    </ul>
                  </div>    
                </div>
              </div>
              <div>
                <button style={styles.popbuttons} onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )
}