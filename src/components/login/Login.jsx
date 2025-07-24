import { useState } from "react";

const Login = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleForm = (e) => {
    e.preventDefault();
    debugger;
    if (isRegister) {
      if (form.password !== form.confirmPassword) {
        console.log("password is Not same");
        return;
      }
      console.log("password is same");
      localStorage.setItem(
        "turfAdmin",
        JSON.stringify({
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        })
      );
      console.log(form);
      alert("Register successful");
    } else {
      const savedData = JSON.parse(localStorage.getItem("turfAdmin"));
      if (savedData?.email === form.email && password === form.password) {
        alert("Logged in successfully");
      } else {
        alert("wrong credentials");
      }
    }
  };

  return (
    <>
      <section className="vh-100 ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 mt-5 p-3 border text-center">
              <form action="" onSubmit={handleForm}>
                <input
                  type="text"
                  placeholder="enter your Email"
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
                  placeholder="enter your Password"
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
                    placeholder="enter You Password Again"
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
                <button className="btn btn-success btn-sm w-100" type="submit">
                  {isRegister ? "Register Here" : "Login"}
                </button>
              </form>
              <div className="">
                <button
                  className="btn btn-link"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {isRegister ? "Go To Login" : " Go To Register"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
