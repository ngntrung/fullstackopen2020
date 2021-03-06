const Notification= ({props}) => {
    if (props.message === '') {
      return null
    }
    
    const notiClass = props.type==='success' ? 'notiSuccess' : 'notiFail'
    return (
      <div className={`${notiClass} noti`}>
        {props.message}
      </div>
    )
  }
export default Notification