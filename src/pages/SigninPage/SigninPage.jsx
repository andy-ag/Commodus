import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import * as usersService from '../../utilities/users-service';
import HeaderBox from '../../components/HeaderBox.jsx'
import { toast } from 'react-hot-toast'

export default function SigninPage({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate()

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
      toast.success(`Welcome back, ${user.name}!`, {
        iconTheme: {
          primary: 'var(--accent)',
          secondary: 'white',
        },
      });
      navigate('/dashboard')
    } catch {
      setError('Sign in failed - try again!');
    }
  }

  return (
    <div>
      <div className='d-flex flex-column align-items-center'>
        <HeaderBox text={'Sign in'} add={false} fav={false}/>
        <div className="auth-container mt-4">
            <form className="mt-4" autoComplete="off" onSubmit={handleSubmit}>
              <label>E-mail</label>
              <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
              <label>Password</label>
              <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
              <button type="submit">SIGN IN</button>
            </form>
          </div>
        </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
