import { SignupInput } from '@anish.che/medium-common'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Backend_URL } from '../config'



export default function AuthBox() {
  const navigate = useNavigate()
  const location = useLocation()
  const isSignUp = location.pathname === '/signup'
  const [formData, setFormData] = useState<SignupInput>({
    name: '',
    username: '',
    password: ''
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const send_req = async(event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await axios.post(`${Backend_URL}/api/v1/${isSignUp ? 'signup' : 'signin'}`, formData);
      if (response.status === 200) {
        const data = response.data;
        
        
        localStorage.setItem("authorization", "bearer "+data.jwt);
        navigate("/blogs");
      } else {
        console.error('Unexpected response:', response);
        alert("Unexpected response from server");
      }
    } catch (e) {
      console.error("Error while signing in:", e);
      alert("Error while signing");
    }
  }

  return (
    <div className="w-[350px] shadow-3xl bg-white dark:bg-gray-800 rounded-lg transition-all duration-300 ease-in-out">
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-center">
            {isSignUp ? 'Create an account' : 'Welcome back'}
          </h2>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            {isSignUp ? 'Enter your details to sign up' : 'Enter your credentials to sign in'}
          </p>
        </div>
        <form onSubmit={send_req} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                required 
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Username
            </label>
            <input 
              id="username" 
              name="username" 
              type="email" 
              value={formData.username}
              onChange={handleInputChange}
              required 
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              value={formData.password}
              onChange={handleInputChange}
              required 
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
        <button 
          onClick={() => navigate(isSignUp ? '/signin' : '/signup')}
          className="w-full text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  )
}

