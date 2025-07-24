import { useEffect, useState } from "react";
import Login from "./components/login/Login";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setIsLogin(false);
  }, []);
  return (
    <>
      <section>
        {isLogin ? (
          <div className="row">i am App COmponent</div>
        ) : (
          <Login></Login>
        )}
      </section>
    </>
  );
};
export default App;
