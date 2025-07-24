import React, { useState } from "react";

const Login = ({ logo, onSuccess, isLoggedIn }) => {
  const [isRegister, setIsRegister] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    if (isRegister) {
      if (form.password !== form.confirmPassword) {
        alert("Passwords Do not match");
        return;
      }
      localStorage.setItem(
        "turfAdmin",
        JSON.stringify({
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        })
      );
      localStorage.removeItem("turfAdmin");
      console.log(isLoggedIn);
      onSuccess();
      alert("Register Successful!");
    } else {
      const saved = JSON.parse(localStorage.getItem("turfAdmin"));
      if (saved?.email === form.email && saved.password === form.password) {
        onSuccess();
      } else {
        alert("invalid password");
      }
    }
  };

  return (
    <>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="row card shadow-sm p-4 border">
          <div className="text-center">
            <img src={logo} alt="" className="logo mb-3" />
            <h4>Turf Manager</h4>
            <p>Admin Portal</p>
          </div>
          <div className="">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="please enter your Email"
                className="form-control mb-3"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
              <input
                type="password"
                placeholder="please enter your password"
                className="form-control mb-3"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />
              {isRegister && (
                <input
                  type="password"
                  placeholder="please enter your password"
                  className="form-control mb-3"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              )}
              <button className="btn btn-success w-100" type="submit">
                {isRegister ? "Register" : "Login"}
              </button>
            </form>
          </div>
          <div className="text-center mt-3">
            <button
              className="btn btn-link"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister
                ? "Already have an account? Login"
                : "No account? Register"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
