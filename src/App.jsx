import { useEffect, useState } from "react";
import logo from "../src/assets/img/logo.jpeg";
import "./App.css";
import Login from "./components/login/Login";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const AdminData = localStorage.getItem("turfAdmin");
    if (AdminData) setIsLoggedIn(true);
    // console.log(isLoggedIn);
  }, []);

  return isLoggedIn ? (
    <>
      <section>
        <div className="container py-3 border text-center">
          <h2>Turf Booking App</h2>
          <div className="row py-3 border rounded-3 text-center">
            <div className="d-flex justify-content-between align-items-center">
              <img src={logo} alt="" className="logo" />
              <h3>i am Navbar Component</h3>
              <button className="btn btn-primary">All Bookings</button>
            </div>
          </div>
          <div className="row py-3 mt-3 border rounded-3 text-center">
            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-primary">
                1 <br />M
              </button>
              <button className="btn border">
                2 <br />T
              </button>
              <button className="btn border">
                3 <br />W
              </button>
              <button className="btn border">
                4 <br />T
              </button>
              <button className="btn border">
                5 <br />F
              </button>
              <button className="btn border">
                6 <br />S
              </button>
              <button className="btn border">
                7 <br />S
              </button>
            </div>
          </div>
          <div className="row py-3 mt-3 justify-content-center border rounded-3 text-center hero">
            <h3>i am Hero Component</h3>
            <div className="col-lg-8 border rounded-3">
              <div className="row border pt-3 m-1">
                <h6 className="py-2 text-danger">Morning slot (600 rs/Hr)</h6>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <button className="btn btn-sm btn-001 border">
                    7am to 8am
                  </button>
                  <button className="btn btn-sm btn-001 border btn-secondary">
                    8am to 9am <br /> Pratik SHinde
                  </button>
                  <button className="btn btn-sm btn-001 border">
                    9am to 10am <br /> Manthan
                  </button>
                  <button className="btn btn-sm btn-001 border">
                    10am to 11am
                  </button>
                  <button className="btn btn-sm btn-001 border">
                    11am to 12am
                  </button>
                </div>
              </div>
              <div className="row border pt-3 m-1">
                <h6 className="py-2 text-danger">Afternoon slot (700 rs/Hr)</h6>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <button className="btn btn-sm btn-001 border">
                    12pm to 1pm
                  </button>
                  <button className="btn btn-sm btn-001 border btn-secondary">
                    1pm to 2pm <br /> Pratik SHinde
                  </button>
                  <button className="btn btn-sm btn-001 border">
                    2pm to 3pm <br /> Manthan
                  </button>
                  <button className="btn btn-sm btn-001 border">
                    3pm to 4pm
                  </button>
                </div>
              </div>
              <div className="row border pt-3 m-1">
                <h6 className="py-2 text-danger">Evening slot (800 rs/Hr)</h6>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <button className="btn btn-sm btn-001 border">
                    4pm to 5pm
                  </button>
                  <button className="btn btn-sm btn-001 border btn-secondary">
                    5pm to 6pm <br /> Pratik SHinde
                  </button>
                  <button className="btn btn-sm btn-001 border">
                    6pm to 7pm <br /> Manthan
                  </button>
                  <button className="btn btn-sm btn-001 border">
                    7pm to 8pm
                  </button>
                </div>
              </div>
              <div className="row border pt-3 m-1">
                <h6 className="py-2 text-danger">Night slot (900 rs/Hr)</h6>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <button className="btn btn-sm btn-001 border">
                    8pm to 9pm
                  </button>
                  <button className="btn btn-sm btn-001 border btn-secondary">
                    9pm to 10pm <br /> Pratik SHinde
                  </button>
                  <button className="btn btn-sm btn-001 border">
                    10pm to 11pm <br /> Manthan
                  </button>
                  <button className="btn btn-sm btn-001 border">
                    11pm to 12am
                  </button>
                </div>
              </div>
              <div className="row py-3">
                <h1>For More Bookings : 8888428371</h1>
              </div>

              <div className="row py-3">
                <table className="border table-bordered py-2">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Table</th>
                      <th>PR Name</th>
                      <th>Guest Name</th>
                      <th>Guest Quantity</th>
                      <th>Booking Date</th>
                      <th>Booked At</th>
                      <th>Delete Booking</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>11am to 12pm</td>
                      <td>Admin</td>
                      <td>Manthan SHinde</td>
                      <td>10</td>
                      <td>Date</td>
                      <td>11.43pm 22 march </td>
                      <td>
                        <button className="btn btn-sm btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <Login
      logo={logo}
      onSuccess={() => setIsLoggedIn(true)}
      isLoggedIn={isLoggedIn}
    ></Login>
  );
};

export default App;
0;
