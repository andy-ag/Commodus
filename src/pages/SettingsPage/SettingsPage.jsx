import { useState } from 'react'
import HeaderBox from '../../components/HeaderBox.jsx'
import './SettingsPage.css'
import * as usersAPI from '../../utilities/users-api'
import * as userService from '../../utilities/users-service'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function SettingsPage({setUser}) {
  const navigate = useNavigate()  
  const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
    email: '',
    confirmCurrentPassword: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
        await usersAPI.changeEmail({email: formData.email, password: formData.confirmCurrentPassword});
        setFormData({
          email: '',
          confirmCurrentPassword: '',
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        })
        toast.success('E-mail changed successfully!', {
            iconTheme: {
              primary: 'var(--accent)',
              secondary: 'white',
            },
          });
      } catch (error) {
        console.log('Failed to change email:', error);
        toast.error('Error changing email', {
            iconTheme: {
                primary: '#CE2D4F',
                secondary: 'white',
            },
        });
      }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
        setError("New password and confirmation do not match");
        toast.error('Passwords do not match!', {
            iconTheme: {
                primary: '#CE2D4F',
                secondary: 'white',
            },
        });
        return;
      }
    try {
        await usersAPI.changePassword({newPassword: formData.newPassword, password: formData.currentPassword});
        setFormData({
          email: '',
          confirmCurrentPassword: '',
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        })
        toast.success('Password changed successfully!', {
            iconTheme: {
              primary: 'var(--accent)',
              secondary: 'white',
            },
          });
      } catch (error) {
        console.log('Failed to change password:', error);
        toast.error('Error changing password', {
            iconTheme: {
                primary: '#CE2D4F',
                secondary: 'white',
            },
        });
      }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
        await usersAPI.deleteAccount();
        setShowModal(false);
        userService.logOut();
        setUser(null);
        navigate('/')
        toast.error('Your account has been deleted', {
            iconTheme: {
                primary: '#CE2D4F',
                secondary: 'white',
            },
        });
      } catch (error) {
        console.log('Failed to delete account:', error);
        toast.error('Error deleting account', {
            iconTheme: {
                primary: '#CE2D4F',
                secondary: 'white',
            },
        });
      }
  };

  return (
    <>  
        <div className='d-flex flex-column align-items-center'>
        <HeaderBox text={'Settings'} add={false} fav={false}/>
        <div className="auth-container mt-4">
            <form autoComplete="off" onSubmit={handleSubmitEmail}>
                <label className="m-2">Update e-mail</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label className="m-2">Confirm password</label>
                <input type="password" name="confirmCurrentPassword" value={formData.confirmCurrentPassword} onChange={handleChange} required />
                <button className="settings-button" type="submit">CHANGE EMAIL</button>
            </form> 

            <form className="my-4" autoComplete="off" onSubmit={handleSubmitPassword}>
                <label className="m-2">Current password</label>
                <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} required />
                <label className="m-2">New password</label>
                <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
                <label className="m-2">Confirm</label>
                <input type="password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} required />
                <button className="settings-button" type="submit">CHANGE PASSWORD</button>
            </form>

            <button className="delete-button" onClick={() => setShowModal(true)}>DELETE ACCOUNT</button>
        </div>
        <p className="error-message">&nbsp;{error}</p>
        </div>
        <div className={`modal ${showModal ? 'show d-block' : 'd-none'}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
              <div className="modal-header">
              <h5 className="modal-title">Confirm account deletion</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
              <p>Are you sure you want to delete your account? This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Back</button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteAccount}>Confirm</button>
              </div>
          </div>
        </div>
    </div>
    </>  
  );
}
