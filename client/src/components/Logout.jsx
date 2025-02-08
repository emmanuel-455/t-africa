import { useSetAtom } from 'jotai';
import { isUserLoggedInAtom, userDetailsAtom } from './store/store';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const setIsUserLoggedIn = useSetAtom(isUserLoggedInAtom);
  const setUserDetails = useSetAtom(userDetailsAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsUserLoggedIn(false); // Update login state
    setUserDetails({ firstName: '', lastName: '', email: '' }); // Clear user details

    navigate('/login'); // Redirect to login page
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  );
}

export default Logout;
