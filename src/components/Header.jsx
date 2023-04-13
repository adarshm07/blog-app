import { Link } from "react-router-dom";

export default function Header() {
  const menu = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Login",
      link: "/login",
    },
    {
      name: "Register",
      link: "/register",
    },
    {
      name: "Add Blog",
      link: "/add-blog",
    },
  ];
  return (
    <div className="header container-fluid bg-secondary d-flex justify-content-between align-items-center text-white">
      <div>
        <a href="/">
          <h2 className="fs-6 p-3 text-white">Blog App</h2>
        </a>
      </div>

      <div className="d-flex">
        {menu.map((item) => (
          <Link key={item.name} to={item.link}>
            <span className="nav-link fs-6 p-3 text-white">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
