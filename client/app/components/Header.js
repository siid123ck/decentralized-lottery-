const Header = () => {
    return (
      <header className="flex justify-between items-center p-4 bg-white text-black shadow-md">
        <h1 className="text-2xl font-bold text-purple-900">Decentralized Lottery</h1>
        <nav>
          <ul className="flex space-x-8">
            <li><a href="#how-it-works" className="hover:text-purple-700">How It Works</a></li>
            <li><a href="/winners" className="hover:text-purple-700">Winners</a></li>
            <li><a href="#blog" className="hover:text-purple-700">Blog</a></li>
            <li><a href="#connect-wallet" className="hover:text-purple-700">Connect Wallet</a></li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;
  