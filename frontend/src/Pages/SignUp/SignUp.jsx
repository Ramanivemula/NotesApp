import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log({ name, email, password });
    };

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-mainBackground">
            <div className="w-[30%] border rounded-md bg-white px-8 py-10">
                <form onSubmit={handleSignUp}>
                    <h4 className="text-2xl mb-7">Register Here!!</h4>

                    <div className="flex flex-col gap-y-3">
                        {/* Name Field */}
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                        />

                        {/* Email Field */}
                        <TextField
                            label="Email Id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                        />

                        {/* Password Field */}
                        <FormControl sx={{ width: "100%" }} variant="outlined" required>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showPassword ? 'hide the password' : 'display the password'}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        {/* Confirm Password Field */}
                        <FormControl sx={{ width: "100%" }} variant="outlined" required>
                            <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-confirm-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showConfirmPassword ? 'hide the password' : 'display the password'}
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                            />
                        </FormControl>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                textTransform: "capitalize",
                                padding: "0.7rem 0",
                                fontSize: "0.9rem",
                                fontWeight: "600",
                            }}
                        >
                            Sign Up
                        </Button>
                    </div>

                    {/* Redirect to Login */}
                    <p className="text-sm text-center mt-4 flex justify-center gap-x-2">
                        <span>Already have an account? {""}</span>
                        <Link to="/login" className="font-medium text-sky-500 underline">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
