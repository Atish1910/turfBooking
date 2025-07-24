import React, { useEffect, useState } from 'react';
import Login from './components/login/Login';

const App = () => {
  const [isLogin, setIsLogin]= useState(true);
  
  useEffect(() => {
    setIsLogin(false);
  }, [])
  
  return (
    <>
      <section>
        <div className="container">
        {
          isLogin? (
          <div className="row">
            i am App Comp
          </div>
          ) : (
              <Login></Login> 
          )
        }
        </div>
      </section>
    </>
  );
};

export default App;