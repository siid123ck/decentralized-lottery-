const WinnerDisplay = ({ winner }) => {
    return (
      <div className="p-4 bg-gray-800 text-white rounded-lg">
        <h2 className="text-xl mb-4">Latest Winner</h2>
        <p>{winner}</p>
      </div>
    );
  };
  
  export default WinnerDisplay;
  