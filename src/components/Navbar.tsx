
function Navbar() {
  return (
<div className="navbar bg-base-200 ">
  <div className="flex-1 ">
    <a className="btn btn-ghost text-xl">Complexity Game</a>
  </div>
  <div className="navbar-center flex-1 justify-center items-center">
    <ul className="menu menu-horizontal gap-10">
      <li><a className="btn btn-ghost">1 minuto </a></li>
      <li><a className="btn btn-ghost">3 minutos</a></li>
      <li><a className="btn btn-ghost">5 minutos</a></li>
    </ul>
  </div>
  <div className="navbar-end flex-1 ">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
)}

export default Navbar;
