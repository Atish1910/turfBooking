import React, { useEffect, useState } from "react";

const Navbar = ({ onFilter, allOrders }) => {
  const [searchId, setSearchId] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");

  const filterCompany = [...new Set(allOrders.map((c) => c.company))];
  // console.log(filterCompany);
  const filterStatus = [...new Set(allOrders.map((s) => s.status))];
  // console.log(filterStatus);
  useEffect(() => {
    onFilter({ searchId, company, status });
    // console.log(company);
  }, [searchId, company, status]);

  const clearFilter = () => {
    setSearchId("");
    setCompany("");
    setStatus("");
    onFilter({
      searchId: "",
      company: "",
      status: "",
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-3">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="form-control"
            placeholder="Order ID"
          />
        </div>
        <div className="col-lg-3">
          <select
            name=""
            id=""
            onChange={(e) => setCompany(e.target.value)}
            value={company}
            className="form-control"
          >
            <option value="">select Company</option>
            {filterCompany.map((company, i) => (
              <option key={i} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-3">
          <select
            name=""
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-control"
            id=""
          >
            <option value="">select Status</option>
            {filterStatus.map((status, i) => (
              <option key={i} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="col-lg-3 col-6 mb-2  align-items-center">
          <button className="btn  btn-sm  btn-primary px-3 me-3 ">
            Filter
          </button>
          <button className="btn  btn-sm btn-01" onClick={clearFilter}>
            Clear Filter
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
