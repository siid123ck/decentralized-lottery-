const Footer = () => {
    return (
      <footer className="bg-gray-50 py-6">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-purple-900 mb-2">Decentralized Lottery</h2>
          <div className="flex justify-center space-x-4 mb-2">
            <a href="#privacy-policy" className="text-gray-600 hover:text-purple-900">Privacy Policy</a>
            <a href="#terms-of-service" className="text-gray-600 hover:text-purple-900">Terms of Service</a>
          </div>
          <p className="text-gray-600">&copy; 2023 Decentralized Lottery. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  