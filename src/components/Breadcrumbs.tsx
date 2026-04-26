import { useLocation, Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const formatPathname = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="flex items-center text-sm font-medium text-gray-500">
      <Link to="/" className="hover:text-gray-700 transition-colors">
        Home Page
      </Link>
      {pathnames.length > 0 && (
        <HiChevronRight className="mx-2 text-gray-400" size={16} />
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={name} className="flex items-center">
            {isLast ? (
              <span className="text-gray-900">{formatPathname(name)}</span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-gray-700 transition-colors"
              >
                {formatPathname(name)}
              </Link>
            )}
            {!isLast && (
              <HiChevronRight className="mx-2 text-gray-400" size={16} />
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
