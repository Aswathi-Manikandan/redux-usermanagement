import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to sign in. Please try again.");
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      console.error(err.message);
      dispatch(signInFailure(err.message || "Something went wrong!"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500 text-white">
      <div className="flex shadow-lg rounded-lg bg-white overflow-hidden w-full max-w-4xl">
        {/* Left Section with Background Image */}
        <div
          className="hidden md:flex flex-col justify-center items-center w-1/2 text-white p-6"
          style={{ backgroundImage: 'url(https://i.pinimg.com/736x/f2/44/38/f2443851bb24757bbe9025bfc1faf154.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="mt-2 text-sm">Sign in to access your account and continue your journey.</p>
          <a
            href="/sign-up"
            className="mt-6 px-6 py-2 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-700"
          >
            Sign Up
          </a>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center p-8 w-full md:w-1/2 bg-gray-100 text-gray-900">
          <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              disabled={loading}
              className={`w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>

          {/* OAuth Google Sign In */}
          <div className="mt-4">
            <OAuth />
          </div>

          {/* Footer */}
          <p className="text-center text-sm mt-4">
            Dont have an account?{' '}
            <a href="/sign-up" className="text-gray-900 font-medium hover:underline">
              Sign Up
            </a>
          </p>

          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
