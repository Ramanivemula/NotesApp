import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Pw_Input from '../../Components/Pw_Input/Pw_Input';
import { Link , useNavigate} from "react-router-dom";
import { validateEmail } from '../../utilis/helper';
import axiosInstances from '../../utilis/axiosInstances';


function Login() {

  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

      if (!validateEmail(email)) {
        setError("Please Enter a Valud Email.");
        return;
      }

      if(!password){
        setError("Please Enter the Password");
        return;
      }

      setError("");

      //Login API Call
      try {
        const response = await axiosInstances.post("/login",{
          email: email,
          password: password,
        });

        if(response.data && response.data.accessToken){
          localStorage.setItem("token",response.data.accessToken)
          navigate("/home");
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message)          
        }else{
          setError("An unexpected error Occrued. Try again")
        }
      }
  }

  return (
    <>
    <div className='flex items-center justify-center mt-28'>
      <div className='w-96 border rounded bg-white px-8 py-10'>
        <form onSubmit={handleLogin}>
          <h4 className='"text-2xl mb-7'>LOGIN HERE!!</h4>
          <input type='text' placeholder='Email' className='input-box'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          
          <Pw_Input value={password} onChange={(e) => setPassword(e.target.value)}/>

          {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

          <button type='submit' className='btn-primary'>Login</button>

          <p className='text-sm text-center mt-4'>Don't Have an Account?{" "} 
          <Link to="/signUP" className="font-medium text-primary underline">SignUp</Link></p>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login