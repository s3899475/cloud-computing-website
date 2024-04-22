

export default function QueryForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    onSubmit(formJson);
  }
  
  return (
    <form method='post' onSubmit={handleSubmit}>
      <label>Title:</label>
      <div className='control'>
        <input className='input' name='title'></input>
      </div>
      <label>Artist:</label>
      <div className='control'>
        <input className='input' name='artist'></input>
      </div>
      <label>Year:</label>
      <div className='control'>
        <input className='input' name='year' type='number'></input>
      </div>
      <button className='button is-primary' type='submit'>Search</button>
    </form>
  );
}