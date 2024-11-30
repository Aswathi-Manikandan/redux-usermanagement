import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-black via-transparent to-black opacity-70 backdrop-blur-sm shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo and Title */}
        <Link to="/">
          <h1 className="text-2xl font-bold text-white hover:text-gray-200 transition duration-200">User Management</h1>
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-white items-center">
          <Link to="/" className="hover:text-gray-200 transition duration-200">
            <li>Home</li>
          </Link>

          <Link to="/about" className="hover:text-gray-200 transition duration-200">
            <li>About</li>
          </Link>

          {/* Profile or Sign-In */}
          {currentUser ? (
            <Link to="/profile" className="flex items-center">
              
              <img
                src={currentUser.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
              
            </Link>
          ) : (
            <Link to="/sign-in" className="hover:text-gray-200 transition duration-200">
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
