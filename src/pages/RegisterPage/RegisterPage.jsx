import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../utilities/users-service'
import HeaderBox from '../../components/HeaderBox.jsx'
import { toast } from 'react-hot-toast'
import './RegisterPage.css'

export default function RegisterPage({setUser}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    })

    const [error, setError] = useState('')
    const navigate = useNavigate()

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        setError('')
    };  

    async function handleSubmit(e) {
        e.preventDefault()
        if (formData.password !== formData.confirm) return
        try {
            const { confirm, ...data } = formData;
            const user = await signUp(data);
            setUser(user)
            toast.success('Registration successful!', {
                iconTheme: {
                  primary: 'var(--accent)',
                  secondary: 'white',
                },
              });
            navigate('/')
        } catch (error) {
            setError('Sign-up failed - try again!')
        }
    };  

    const disable = formData.password !== formData.confirm;
    return (
        <div className='d-flex flex-column align-items-center'>
            <HeaderBox text={'Register'} add={false} fav={false}/>
            <div className="auth-container mt-4">
                <form autoComplete="off" onSubmit={handleSubmit}>
                <label className="m-2">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <label className="m-2">E-mail</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label className="m-2">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                <label className="m-2">Confirm</label>
                <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
                <button type="submit" disabled={disable}>REGISTER</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    );
}
        

  
