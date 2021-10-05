import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email: "", password: "",cpassword:""}) 
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("http://localhost:3000/api/auth/createuser", {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/");
            props.showAlert("Account created successfully","success");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }

     
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className="container">
        <form onSubmit={handleSubmit}>
        <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="email" class="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
  
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
  <div class="mb-3">
    <label for="cpassword" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
 
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
    )
}

export default Signup