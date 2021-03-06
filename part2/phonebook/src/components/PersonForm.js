const PersonForm = (props) => {
    const {event, nameValue, nameEvent, numberValue, numberEvent} = props
    return (
      <form onSubmit={event}>
        <div>
          name: <input value={nameValue} onChange={nameEvent}/>
        </div>
        <div>
          number: <input value={numberValue} onChange={numberEvent}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm
