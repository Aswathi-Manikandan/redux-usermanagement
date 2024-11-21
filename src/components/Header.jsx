import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-slate-600">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-white">User Management</h1>
        </Link>

        <ul className="flex gap-4 text-white items-center">
          {/* Navigation Links */}
          <Link to="/">
            <li>Home</li>
          </Link>

          <Link to="/about">
            <li>About</li>
          </Link>

          {/* Profile or Sign-In */}
          {currentUser ? (
            <Link to="/profile">
              <img
                src={currentUser.profilePicture}
                alt="Profile"
                className="w-7 h-7 rounded-full"
                onError={(e) =>
                  (e.target.src =
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
                } // Fallback to default
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
