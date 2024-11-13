import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "state";  // Import your logout action

// auto-expiration
const SessionTimeoutWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Set session timeout for 7200000 milliseconds (120 minutes -> 2 hours)
    const sessionTimeout = setTimeout(() => {
      dispatch(setLogout());
      navigate('/');
      alert("Session has expired. Please log in again.");
    }, 7200000 );

    // Cleanup function to clear timeout on component unmount
    return () => clearTimeout(sessionTimeout);
  }, [dispatch, navigate]);

  return children; // Render the child components (e.g., Dashboard, Products, transactions, etc.)
};

export default SessionTimeoutWrapper;
