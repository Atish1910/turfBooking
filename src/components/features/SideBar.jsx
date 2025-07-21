import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "./orderSlice";

const SideBar = ({ filteredOrders, getLabelBGColor }) => {
  const dispatch = useDispatch();
  const selectedOrder = useSelector((state) => state.orders.selectedOrder);

  const [currentPage, setCurrentpage] = useState(1);
  const orderPerPage = 5;

  const indexOfLastOrder = currentPage * orderPerPage; // 5* 1 = 5
  const indexOfFirstOrder = indexOfLastOrder - orderPerPage; // 5-5 = 0
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(filteredOrders.length / orderPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentpage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentpage(currentPage - 1);
    }
  };

  // console.log(allOrders);
  return (
    <>
      <div className="mt-4">
        <ul className="style-unstyled">
          <li className="d-grid border rounded-3 pt-4">
            <h5>
              Orders :{" "}
              <span className="text-primary">{currentOrders.length}</span>
            </h5>
          </li>
          {currentOrders.map((order, i) => {
            return (
              <li key={i} className="d-grid text-start">
                <button
                  onClick={() => dispatch(selectOrder(order))}
                  className={`btn border d-flex align-items-center justify-content-between ${
                    selectedOrder?.id == order.id
                      ? "active bg-active text-dark"
                      : ""
                  }`}
                >
                  <b>
                    {order.id}
                    <p className="mb-0 fw-normal">{order.company}</p>
                  </b>
                  <span
                    className={`bg-${getLabelBGColor(
                      order.status
                    )} text-white px-3 rounded-3`}
                  >
                    {order.status}
                  </span>
                </button>
              </li>
            );
          })}
          <div className="px-3 py-2 d-flex justify-content-between">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
