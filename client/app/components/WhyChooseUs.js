const WhyChooseUs = () => {
    return (
       <>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 p-8">
            <img
              src="https://images.pexels.com/photos/20021296/pexels-photo-20021296/free-photo-of-lottery-scrabble-letters-on-a-wooden-table.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Lottery Image"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 mb-4">
              Decentralized Lottery leverages blockchain technology to provide an unparalleled level of trust and transparency. Here's why you should participate:
            </p>
            <ul className="text-gray-600 list-disc list-inside mb-4">
              <li>100% Fair and Transparent</li>
              <li>Secure and Decentralized</li>
              <li>Instant Winner Notifications</li>
              <li>Automatic and Timely Draws</li>
            </ul>
            <button className="w-full md:w-auto p-3 bg-purple-600 text-white font-bold rounded hover:bg-purple-800">
              Join the Lottery
            </button>
            <div className="flex items-center mt-4">
              <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Profile" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="text-gray-700 font-semibold">"I've never seen a more transparent lottery system. The use of blockchain is brilliant!"</p>
                <p className="text-purple-900 font-semibold">Jane Doe <span className="text-gray-600">Crypto Investor</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-4xl font-bold mb-4">Make Every Ticket Count</h2>
          <p className="text-gray-600 mb-4">
            Our platform ensures that every ticket you buy is a step closer to winning. With an automated, decentralized system, you can trust that your ticket will be part of a fair draw.
          </p>
          <ul className="text-gray-600 list-disc list-inside mb-4">
            <li>Blockchain-based Security</li>
            <li>Guaranteed Fairness</li>
            <li>No Hidden Fees</li>
            <li>Easy to Use Interface</li>
          </ul>
          <button className="w-full md:w-auto p-3 bg-purple-600 text-white font-bold rounded hover:bg-purple-800">
            Start Playing
          </button>
          <div className="flex items-center mt-4">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" className="w-10 h-10 rounded-full mr-4" />
            <div>
              <p className="text-gray-700 font-semibold">"The transparency and fairness of Decentralized Lottery are unmatched. Highly recommended for everyone!"</p>
              <p className="text-purple-900 font-semibold">John Doe <span className="text-gray-600">Blockchain Advocate</span></p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <img
            src="https://images.pexels.com/photos/2923157/pexels-photo-2923157.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
            alt="Lottery Image"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
      </>
    );
  };
  
  export default WhyChooseUs;
  