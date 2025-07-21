import { useEffect, useState } from "react";
import "./App.css";
import Details from "./components/Details";
import Navbar from "./components/Navbar";
import SideBar from "./components/features/SideBar";
import photo from "./assets/profile/photo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { sampleOrders } from "./data/sampleOrders";
import { setOrders } from "./components/features/orderSlice";

function App() {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.orders.orders);
  const [filteredOrders, setFilterOrders] = useState([]);

  useEffect(() => {
    dispatch(setOrders(sampleOrders));
  }, [dispatch]);

  useEffect(() => {
    setFilterOrders(allOrders);
  }, [allOrders]);

  const handleFilter = ({ searchId, company, status }) => {
    let result = allOrders;

    if (searchId) {
      result = result.filter((o) =>
        o.id.toLowerCase().includes(searchId.toLowerCase())
      );
    }

    if (company) {
      result = result.filter((o) => o.company == company);
    }

    if (status) {
      result = result.filter((s) => s.status == status);
    }
    setFilterOrders(result);
  };

  //// label background color
  const labelBgColor = {
    complete: "success",
    submitted: "primary",
    "in process": "info",
    Draft: "secondary",
  };

  const getLabelBGColor = (status = "") =>
    labelBgColor[status.toLowerCase()] || "dark";

  return (
    <>
      <section className="py-5 border">
        <div className="container-fluid text-center">
          <Navbar onFilter={handleFilter} allOrders={allOrders}></Navbar>
          <div className="row">
            <div className="col-lg-3">
              <SideBar
                filteredOrders={filteredOrders}
                dispatch={dispatch}
                getLabelBGColor={getLabelBGColor}
              ></SideBar>
            </div>
            <div className="col-lg-8">
              <Details
                photo={photo}
                allOrders={allOrders}
                getLabelBGColor={getLabelBGColor}
              ></Details>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default App;
