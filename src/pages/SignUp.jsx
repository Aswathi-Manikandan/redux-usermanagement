import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to sign up. Please try again.');
      }

      const data = await res.json();
      console.log(data);
      
      setLoading(false)
      setError(false)
     

    } catch (error) {
      console.log(error);
      
      setLoading(false)
      setError(true)
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold m-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-200 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-200 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-200 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95">
          {loading? 'Loading....': 'Sign Up'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an Account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className='text-red-800 mt-5'>{error && 'Something went wrong!!'}</p>
    </div>
  );
};

export default SignUp;
