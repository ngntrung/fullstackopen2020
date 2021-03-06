const PersonDisplay = ({person, event}) => {
    return (
      <div> 
      <p>{person.name} {person.number}</p><button onClick={event}>delete</button> 
      </div>)
    
}

export default PersonDisplay