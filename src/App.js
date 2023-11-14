import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from './utils/firebase/firebase.utils';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser } from './store/user/user.action';
import './main-style.css/style.css'

// Defining the main App component
const App = () => {
  // Getting the dispatch function from Redux
  const dispatch = useDispatch();

  // Using the useEffect hook to add a listener for authentication state changes
  useEffect(() => {
    // The listener returns a function to unsubscribe
    const unsubscribe = onAuthStateChangedListener((user) => {
      // If there's a user, create a document for them in Firestore
      if (user) {
        createUserDocumentFromAuth(user);
      }
      // Dispatch an action to set the current user in Redux
      dispatch(setCurrentUser(user));
    });

    // Return the unsubscribe function to clean up on unmount
    return unsubscribe;
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // Rendering the routes for the app
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
