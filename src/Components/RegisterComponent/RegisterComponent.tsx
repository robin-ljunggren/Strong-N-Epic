import { FormEvent, useState } from 'react'
import { InputEvent, FormState, SelectEvent } from '../../../Types/Form.js';
import { useSetUserInfo } from '../../hooks/userHook.js';
import './RegisterComponent.css';

type FormStateProps = {
  formState: FormState;
  setFormState: (formState: FormState) => void;
}

export default function RegisterComponent(props: FormStateProps):JSX.Element {
  
  const [value, setValue] = useState('');
  const [ref, setRef] = useState('');
  const [confirmedPw, setConfirmedPw] = useState('');

  const { regUser } = useSetUserInfo(props.formState, ref, value);

  function handleRegInfo(event: InputEvent | SelectEvent) {
    setRef(event.target.name); 
    setValue(event.target.value);
  }

  function saveConfirmedPassword(event: InputEvent) {
    setConfirmedPw(event.target.value);
  }

  function changePage() {
    props.setFormState("LOGIN");
  }

  function submitRegForm(event: FormEvent) {
    event.preventDefault();
    if(regUser.password === confirmedPw) {
      console.log("Its a match!")
    }else {
      console.log("Something went wrong");
    }
    // fetch(url);
  }

  return (
    <section>
      <form className='login-form' onSubmit={submitRegForm}>
        <label className='firstname-label' htmlFor="firstnameField">Firstname:</label>
        <input className='firstname-field' onChange={handleRegInfo} type='text' name='firstname' value={regUser.firstname || ''} id="firstnameField"></input>

        <label className='lastname-label' htmlFor="lastnameField">Lastname:</label>
        <input className='lastname-field' onChange={handleRegInfo} type='text' name='lastname' value={regUser.lastname || ''} id="lastnameField"></input>

        <label className='gender-label' htmlFor="genderField">Gender:</label>
        <select className='gender-field' name="gender" onChange={handleRegInfo} value={regUser.gender} id="genderField">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="i prefer not to say">I prefer not to say</option>
        </select>

        <label className='age-label' htmlFor="ageField">Age:</label>
        <input className='age-field' onChange={handleRegInfo} type='number' name='age' value={regUser.age || ''} id="ageField"></input>

        <label className='email-label' htmlFor="emailField">Email:</label>
        <input className='email-field' onChange={handleRegInfo} type='text' name='email' value={regUser.email || ''} id="emailField"></input>

        <label className='phone-label' htmlFor="phoneField">Phone:</label>
        <input className='phone-field' onChange={handleRegInfo} type='phone' name='phone' value={regUser.phone || ''} id="phoneField"></input>

        <label className='user-id-label' htmlFor="usernameField">UserID:</label>
        <input className='username-field' onChange={handleRegInfo} type='text' name='username' value={regUser.username || ''} id="usernameField"></input>

        <label className='password-label' htmlFor="passwordField">Password:</label>
        <input className='password-field' onChange={handleRegInfo} type='password' name='password' value={regUser.password || ''} id="passwordField"></input>

        <label className='repassword-label' htmlFor="repasswordField">Confirm password:</label>
        <input className='repassword-field' onChange={saveConfirmedPassword} type='password' name='repassword' id="repasswordField"></input>

        <button className='login-btn'>Login</button>
      </form>
      <aside>
        <p>Already a member?</p>
        <a onClick={changePage}>Sign in</a>
        <p>here!</p>
      </aside> 
    </section>
  )
}