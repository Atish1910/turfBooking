import React, { useState } from 'react';

const Login = () => {
  const [isRegister, setIsRegister] = useState(null);
  const [form, setForm] = useState({
    email : "",
    password : "",
    confirmPassword : ""
  })

  const handleSubmit = () => {

    if(isRegister){
      if(form.password !== form.confirmPassword){
        alert("please Enter same password");
        return;
      }
      localStorage.setItem("formAdmin", 
        JSON.stringify({
        email : form.email,
        password : form.password,
        confirmPassword : form.confirmPassword
      })
    )
    alert("Register successfully")
    console.log(form);
    }else{
      const savedData = JSON.parse(localStorage.setItem("formAdmin"));
      if(savedData?.email == form.email || password == form.password ){
        alert("Login Successfully")
      }else{
        alert("Enter Right password")
      }
    }

  }
  

  return (
    <>
    <section>
      <div className="container p-3 mt-5 border rounded-3">
        <div className="row justify-content-center ">
          <div className="col-lg-6 ">
              <form action="" onClick={handleSubmit}>
                <input type="text" placeholder='email' className='form-control mb-3 ' value={form.email}
                onChange={(e) => setForm({
                  ...form, 
                  email : e.target.value
                })}

                />
                <input type="password" placeholder='password' className='form-control mb-3 ' value={form.password} 
                onChange={(e) => setForm({
                  ...form, 
                  password : e.target.value
                })}/>
                {
                  isRegister && 
                <input type="password" placeholder='Confirm Password' className='form-control mb-3 ' value={form.confirmPassword} 
                onChange={(e) => setForm({
                  ...form, 
                  confirmPassword : e.target.value
                })}
                />
                }
                <button className='btn btn-success w-100 mt-2' type='submit'>{
                  isRegister ? "Register" : "Login"
                  }</button>
              </form>
              <div className="mt-3">
                <button className='btn btn-link' onClick={() => setIsRegister(!isRegister)}>{isRegister ? "Go To Login" : "Go To Register"}</button>
              </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Login;