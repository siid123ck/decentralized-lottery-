const WinnerDisplay = ({ winner, previousWinners }) => {
    return (
      <div className="flex flex-col md:flex-row justify-between items-center min-h-screen bg-gray-50 p-8">
        <div className="w-full md:w-1/2 p-8 bg-white shadow-lg rounded-lg flex flex-col items-center text-center">
          <img 
            src="https://randomuser.me/api/portraits/lego/1.jpg" 
            alt="Latest Winner" 
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold text-purple-900 mb-4">The Winner</h2>
          <p className="text-gray-700 mb-4">{winner}</p>
        </div>
        <div className="w-full md:w-1/2 p-8 bg-white shadow-lg rounded-lg mt-8 md:mt-0 md:ml-4">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Previous Winners</h2>
          <ul className="text-gray-700 list-disc list-inside">
            {previousWinners.map((winner, index) => (
              <li key={index} className="mb-4 flex items-center">
                <img 
                  src={`https://randomuser.me/api/portraits/lego/${index + 2}.jpg`} 
                  alt={`Winner ${index + 1}`} 
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span>{winner}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default WinnerDisplay;
  