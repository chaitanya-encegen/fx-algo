import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();

  // split URL
  const pathnames = location.pathname.split("/").filter(x => x);

  return (
    <div className="text-sm text-gray-400 mb-6">
      <Link to="/" className="hover:text-yellow-400">
        Home
      </Link>

      {pathnames.map((value, index) => {

        const to = "/" + pathnames.slice(0, index + 1).join("/");

        // format name
        const name =
          value === "product" ? "Products" :
          value === "cart" ? "Cart" :
          value === "checkout" ? "Checkout" :
          value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <span key={to}>
            {" / "}
            {index === pathnames.length - 1 ? (
              <span className="text-white">{name}</span>
            ) : (
              <Link to={to} className="hover:text-yellow-400">
                {name}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
