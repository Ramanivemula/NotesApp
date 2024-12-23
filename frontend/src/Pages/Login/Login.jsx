import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import { IoEyeOutline } from 'react-icons/io5';
import { IoEyeOffOutline } from 'react-icons/io5';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('All fields are required');
    } else {
      setError('');
      console.log('Login submitted', { email, password });
      // Handle actual login logic here
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen bg-mainBackground">
        <div className="w-[30%] border rounded-md bg-white px-8 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login Here!!</h4>

            <div className="flex flex-col gap-y-3">
              <TextField
                id="email"
                label="Email Id"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={!email && !!error}
                helperText={!email && error ? 'Email is required' : ''}
              />

              <FormControl sx={{ width: '100%' }} variant="outlined" required>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  error={!password && !!error}
                />
                {!password && error && (
                  <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                    Password is required
                  </span>
                )}
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: 'capitalize',
                  padding: '0.7rem 0',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                }}
              >
                Login
              </Button>
            </div>

            {error && (
              <p
                style={{
                  color: 'red',
                  textAlign: 'center',
                  marginTop: '1rem',
                  fontSize: '0.9rem',
                }}
              >
                {error}
              </p>
            )}

            <p className="text-sm text-center mt-4 flex justify-center gap-x-2">
              <span>Don't have an account?? {''}</span>
              <Link to="/signup" className="font-medium text-sky-500 underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
