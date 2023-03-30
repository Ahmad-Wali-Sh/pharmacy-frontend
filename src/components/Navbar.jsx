function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-elements">
        <div className="colorfull-image">
          <img
            className="colorfull-image"
            src="./images/frontend/colorful.png"
          />
        </div>
        <div className="profile">
          <img className="profile-image" src="./images/pic.jpg" />
          <div className="profile-text">
            <h5>Ahmad Wali Sharify</h5>
            <h6>Admin</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
