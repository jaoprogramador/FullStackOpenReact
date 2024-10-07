const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type === 'error' ? 'error' : 'succes'}>
      {message}
    </div>
  )
}

export default Notification