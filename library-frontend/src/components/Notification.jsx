
const Notification = (props) => {

  if (props.info) {
    setTimeout(() => {
      props.setNotification(null)
    }, 10000)
  }

  const bottomRightDivStyle = {
    position: 'absolute',
    bottom: 50,
    right: 50,
    width: '300px',
    height: '100px',
    backgroundColor: 'rgba(173, 216, 230, 0.5)',
    border: '1px black solid',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5em', // Adjust the font size as needed
    fontFamily: 'Arial, sans-serif',
    zIndex: 100,
  };


  return (
    <div >
      {props.info && <div style={bottomRightDivStyle}>{props.info}</div>}
    </div>
  )
}

export default Notification