
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass-card p-8 max-w-md w-full text-center glass-effect">
        <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold text-primary-500">404</span>
        </div>
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          We couldn't find the page you were looking for. The page might have been
          moved, deleted, or never existed.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center h-12 px-6 
                    bg-primary-500 hover:bg-primary-500/90 text-white
                    rounded-xl font-medium transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
