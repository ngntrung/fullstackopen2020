const Filter = (props) => {
    return (
      <div>
        filter shown with <input value={props.value} onChange={props.event}/>
      </div>
    )
}

export default Filter