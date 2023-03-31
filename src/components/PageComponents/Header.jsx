function Header() {
  return (
    <div className="header">
      <div className="header-elements">
        <div className="icons">
          <i className="fa-solid fa-bell"></i>
          <i className="fa-solid fa-gear"></i>
          <div className="log-in">
            <i className="fa-solid fa-user"></i>
            <span className="log-in-text">Log-Out</span>
          </div>
        </div>
        <div className="flex-item"></div>
        <div>
          <div className="search-input-box">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
