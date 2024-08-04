const PersonsForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleButtonClick }) => {
  return (
    <form>
      <div>
        name: <input 
        value={newName}
        onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input 
        value={newNumber}
        onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit" onClick={handleButtonClick}>add</button>
      </div>
    </form>
  );
}

export default PersonsForm;