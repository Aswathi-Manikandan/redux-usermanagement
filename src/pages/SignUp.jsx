import React, { useState } from 'react';
import OAuth from "../components/OAuth"; // Assuming OAuth component handles Google Auth

const SignUp = () => {
  const[formData,setFormData] = useState({})
  const[error,setError] = useState(null);
  const[loading,setLoading] = useState(false)

  const handleChange =(e)=>{
      setFormData({...formData,[e.target.id] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error occurred during sign up');
      }
  
      const data = await res.json();
      console.log('Sign-up successful:', data);

      setLoading(false)
      // setError(false)
    } catch (err) {
      setLoading(false)
      setError(true)
      console.error('Error:', err.message);
    }
  };
   
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500 text-white">
      <div className="flex shadow-lg rounded-lg bg-white overflow-hidden w-full max-w-4xl">
      
        <div
          className="hidden md:flex flex-col justify-center items-center w-1/2 text-white p-6"
          style={{ backgroundImage: 'url(https://i.pinimg.com/736x/96/1e/20/961e20478c56469885db826f1c335fff.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h1 className="text-3xl font-bold">Join Us!</h1>
          <p className="mt-2 text-sm">Sign up to create an account and get started.</p>
          <a
            href="/sign-in"
            className="mt-6 px-6 py-2 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-700"
          >
            Log In
          </a>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center p-8 w-full md:w-1/2 bg-gray-100 text-gray-900">
          <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                id="username"
                className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              onChange={handleChange}
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                id="email"
                className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                id="password"
                className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black
               text-white py-2 rounded-md font-medium
                hover:bg-gray-700 transition"
            >
               {loading ?'Loading....':'Create Account'}
             
            </button>
          </form>

          {/* OAuth Google Sign Up */}
          <div className="mt-4">
            <OAuth />
          </div>

          {/* Footer */}
          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <a href="/sign-in" className="text-gray-900 font-medium hover:underline">
              Log In
            </a>
          </p>
          <p 
  className={`mt-5 text-center p-3 rounded-lg ${error ? 'bg-red-100 text-red-700 border border-red-500' : ''}`}>
    {error && 'Something went wrong. Please try again.'}</p>
        </div>
        
      </div>
     
</div>
  );
};

export default SignUp;
