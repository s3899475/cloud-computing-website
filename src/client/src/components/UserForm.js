

export default function UserForm({setUsername, setPassword, handleSubmit, buttonTitle}) {
  return (
    <form onSubmit={handleSubmit}>
      <label className='label'>Username:</label>
      <div className='control'>
        <input className='input' type="text" onChange={(e) => setUsername(e.target.value)} />
      </div>
      
      <label className='label'>Password:</label>
      <div className='control'>
        <input className='input' type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className='control'>
        <button className='button is-primary'>{buttonTitle}</button>
      </div>
    </form>
  )
};