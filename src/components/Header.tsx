import './Header.css';

interface HeaderProps {
  ambientColor: string;
}

const Header: React.FC<HeaderProps> = ({ ambientColor }) => {
  return (
    <header className="app-header">
      {/* Left: Logo */}
      <div className="left-section">
        <div className="logo">Ambient Notes</div>
      </div>

      {/* Center: Search (non-functional for now) */}
      <div className="center-section">
        <input className="search-input" type="text" placeholder="Search notes..." />
      </div>

      {/* Right: Ambient Color Indicator */}
      <div className="right-section">
        <div
          
        />
      </div>
    </header>
  );
};

export default Header;
