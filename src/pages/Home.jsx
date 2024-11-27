const Home = () => {
  return (
    <div className="h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url("https://www.w3schools.com/w3images/forest.jpg")' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to <span className="text-blue-400">User Management</span>
        </h1>
        <p className="text-lg max-w-2xl mb-6 drop-shadow-lg">
          Effortlessly manage your account, upload your profile picture, and update your details.
          Simplify your life with our intuitive platform.
        </p>

        <div className="flex justify-center gap-8 mb-6">
          {/* Round Images */}
          <div className="flex flex-col items-center">
            <img 
              src="https://www.w3schools.com/w3images/team1.jpg"
              alt="Team Member 1"
              className="w-32 h-32 rounded-full border-4 border-white mb-4"
            />
            <p>John Doe</p>
          </div>

          <div className="flex flex-col items-center">
            <img 
              src="https://www.w3schools.com/w3images/team2.jpg"
              alt="Team Member 2"
              className="w-32 h-32 rounded-full border-4 border-white mb-4"
            />
            <p>Jane Smith</p>
          </div>

          <div className="flex flex-col items-center">
            <img 
              src="https://www.w3schools.com/w3images/team3.jpg"
              alt="Team Member 3"
              className="w-32 h-32 rounded-full border-4 border-white mb-4"
            />
            <p>Bob Brown</p>
          </div>
        </div>

        <div className="flex gap-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-lg transition">
            Get Started
          </button>
          <button className="bg-gray-800 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-lg transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
