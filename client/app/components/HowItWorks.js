const HowItWorks = () => {
    return (
      <section className="py-12 bg-gray-50" id="#how-it-works">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 mb-12">
            Our decentralized lottery system ensures fairness, transparency, and excitement. Here's a step-by-step guide on how to participate and win.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-8 bg-white shadow-lg rounded-lg">
              <div className="text-2xl font-bold text-purple-900 mb-2">1</div>
              <h3 className="text-xl font-bold mb-2">Buy Tickets</h3>
              <p className="text-gray-600">
                Purchase your lottery tickets using our secure platform. Each ticket is your gateway to winning big. No intermediaries, just pure blockchain-based transactions.
              </p>
            </div>
            <div className="p-8 bg-white shadow-lg rounded-lg">
              <div className="text-2xl font-bold text-purple-900 mb-2">2</div>
              <h3 className="text-xl font-bold mb-2">Automatic Draw Schedule</h3>
              <p className="text-gray-600">
                Our system uses Chainlink Automation to schedule and manage the lottery draws at predefined intervals, such as daily or weekly. You can always know when the next draw is happening.
              </p>
            </div>
            <div className="p-8 bg-white shadow-lg rounded-lg">
              <div className="text-2xl font-bold text-purple-900 mb-2">3</div>
              <h3 className="text-xl font-bold mb-2">Random Winner Selection</h3>
              <p className="text-gray-600">
                We use Chainlink Oracles for truly random number generation, ensuring that each lottery draw is fair and unbiased. Every participant has an equal chance to win.
              </p>
            </div>
            <div className="p-8 bg-white shadow-lg rounded-lg">
              <div className="text-2xl font-bold text-purple-900 mb-2">4</div>
              <h3 className="text-xl font-bold mb-2">Instant Payouts</h3>
              <p className="text-gray-600">
                Winners are chosen and notified automatically, with winnings paid out instantly to your specified wallet. Enjoy the thrill of instant rewards!
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  