// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";

// Custom CSS
const styles = {
gradientBg: {
background:
"linear-gradient(135deg, #4ade80 0%, #3b82f6 50%, #9333ea 100%)",
},
container: {
maxWidth: "1440px",
margin: "0 auto",
minHeight: "1024px",
},
header: {
boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
borderBottom: "1px solid #e5e7eb",
background: "#ffffff",
position: "sticky",
top: 0,
zIndex: 40,
},
logo: {
fontSize: "24px",
fontWeight: 700,
background: "linear-gradient(to right, #4ade80, #3b82f6)",
WebkitBackgroundClip: "text",
WebkitTextFillColor: "transparent",
},
dateNav: {
background: "#ffffff",
borderBottom: "1px solid #e5e7eb",
padding: "12px 0",
},
dateButton: {
transition: "all 0.3s ease",
border: "2px solid transparent",
"&:hover": {
transform: "translateY(-2px)",
},
},
activeDateButton: {
background: "linear-gradient(135deg, #4ade80, #3b82f6)",
color: "#ffffff",
boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
},
timeSlot: {
transition: "all 0.3s ease",
"&:hover": {
transform: "translateY(-2px)",
},
},
modal: {
background: "rgba(0, 0, 0, 0.5)",
backdropFilter: "blur(4px)",
},
modalContent: {
maxWidth: "500px",
width: "90%",
borderRadius: "16px",
boxShadow:
"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
},
input: {
transition: "all 0.3s ease",
"&:focus": {
boxShadow: "0 0 0 3px rgba(74, 222, 128, 0.2)",
borderColor: "#4ade80",
},
},
button: {
transition: "all 0.3s ease",
"&:hover": {
transform: "translateY(-1px)",
},
"&:active": {
transform: "translateY(0)",
},
},
};

const App = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [isRegister, setIsRegister] = useState(false);
const [selectedDate, setSelectedDate] = useState(new Date());
const [showBookingModal, setShowBookingModal] = useState(false);
const [selectedSlot, setSelectedSlot] = useState("");
const [bookings, setBookings] = useState([]);
const [dateScrollIndex, setDateScrollIndex] = useState(0);
// Auth form state
const [authForm, setAuthForm] = useState({
email: "",
password: "",
confirmPassword: "",
});
// Booking form state
const [bookingForm, setBookingForm] = useState({
name: "",
phone: "",
amount: "",
sportType: "Football",
});
// Generate dates for next 14 days
const generateDates = () => {
const dates = [];
for (let i = 0; i < 14; i++) { const date=new Date(); date.setDate(date.getDate() + i); dates.push(date); } return
  dates; }; const dates=generateDates(); // Generate time slots const timeSlots=[ "7:00 AM - 8:00 AM"
  , "8:00 AM - 9:00 AM" , "9:00 AM - 10:00 AM" , "10:00 AM - 11:00 AM" , "11:00 AM - 12:00 PM" , "12:00 PM - 1:00 PM"
  , "1:00 PM - 2:00 PM" , "2:00 PM - 3:00 PM" , "3:00 PM - 4:00 PM" , "4:00 PM - 5:00 PM" , "5:00 PM - 6:00 PM"
  , "6:00 PM - 7:00 PM" , "7:00 PM - 8:00 PM" , "8:00 PM - 9:00 PM" , "9:00 PM - 10:00 PM" , "10:00 PM - 11:00 PM" , ];
  const sportTypes=[ "Football" , "Cricket" , "Basketball" , "Tennis" , "Badminton" , "Volleyball" , ]; useEffect(()=> {
  // Check if admin is logged in
  const adminData = localStorage.getItem("turfAdmin");
  if (adminData) {
  setIsLoggedIn(true);
  }
  // Load bookings
  const savedBookings = localStorage.getItem("turfBookings");
  if (savedBookings) {
  setBookings(JSON.parse(savedBookings));
  }
  }, []);
  const handleAuth = (e) => {
  e.preventDefault();
  if (isRegister) {
  if (authForm.password !== authForm.confirmPassword) {
  alert("Passwords do not match");
  return;
  }
  const adminData = {
  email: authForm.email,
  password: authForm.password,
  };
  localStorage.setItem("turfAdmin", JSON.stringify(adminData));
  setIsLoggedIn(true);
  alert("Registration successful!");
  } else {
  const savedAdmin = localStorage.getItem("turfAdmin");
  if (savedAdmin) {
  const adminData = JSON.parse(savedAdmin);
  if (
  adminData.email === authForm.email &&
  adminData.password === authForm.password
  ) {
  setIsLoggedIn(true);
  } else {
  alert("Invalid credentials");
  }
  } else {
  alert("No admin account found. Please register first.");
  }
  }
  };
  const handleLogout = () => {
  setIsLoggedIn(false);
  setAuthForm({ email: "", password: "", confirmPassword: "" });
  };
  const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  });
  };
  const isSlotBooked = (slot, date) => {
  const dateStr = date.toDateString();
  return bookings.some(
  (booking) => booking.date === dateStr && booking.slot === slot
  );
  };
  const handleSlotClick = (slot) => {
  if (!isSlotBooked(slot, selectedDate)) {
  setSelectedSlot(slot);
  setShowBookingModal(true);
  }
  };
  const handleBookingSubmit = (e) => {
  e.preventDefault();
  const newBooking = {
  id: Date.now(),
  date: selectedDate.toDateString(),
  slot: selectedSlot,
  name: bookingForm.name,
  phone: bookingForm.phone,
  amount: bookingForm.amount,
  sportType: bookingForm.sportType,
  };
  const updatedBookings = [...bookings, newBooking];
  setBookings(updatedBookings);
  localStorage.setItem("turfBookings", JSON.stringify(updatedBookings));
  setShowBookingModal(false);
  setBookingForm({ name: "", phone: "", amount: "", sportType: "Football" });
  alert("Booking confirmed successfully!");
  };
  const getVisibleDates = () => {
  return dates.slice(dateScrollIndex, dateScrollIndex + 7);
  };
  const scrollDates = (direction) => {
  if (direction === "left" && dateScrollIndex > 0) {
  setDateScrollIndex(dateScrollIndex - 1);
  } else if (direction === "right" && dateScrollIndex < dates.length - 7) { setDateScrollIndex(dateScrollIndex + 1); }
    }; const getTodaysBookings=()=> {
    const dateStr = selectedDate.toDateString();
    return bookings.filter((booking) => booking.date === dateStr);
    };
    if (!isLoggedIn) {
    return (
    <div className="min-h-screen flex items-center justify-center p-4" style={styles.gradientBg}>
      <div className="bg-white rounded-4 shadow p-5 w-100" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <div className="bg-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
            style={{ width: "64px", height: "64px" }}>
            <i className="fas fa-futbol text-white fs-3"></i>
          </div>
          <h1 className="display-6 fw-bold text-dark mb-2">Turf Manager</h1>
          <p className="text-secondary">Admin Portal</p>
        </div>
        <form onSubmit={handleAuth} className="mb-4">
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" required className="form-control form-control-lg" placeholder="Enter your email"
              value={authForm.email} onChange={(e)=>
            setAuthForm({ ...authForm, email: e.target.value })
            }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input type="password" required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Enter your password" value={authForm.password} onChange={(e)=>
            setAuthForm({ ...authForm, password: e.target.value })
            }
            />
          </div>
          {isRegister && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input type="password" required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Confirm your password" value={authForm.confirmPassword} onChange={(e)=>
            setAuthForm({
            ...authForm,
            confirmPassword: e.target.value,
            })
            }
            />
          </div>
          )}
          <button type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors !rounded-button whitespace-nowrap cursor-pointer">
            {isRegister ? "Create Account" : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button onClick={()=> setIsRegister(!isRegister)}
            className="text-green-500 hover:text-green-600 font-medium cursor-pointer"
            >
            {isRegister
            ? "Already have an account? Sign In"
            : "Need an account? Register"}
          </button>
        </div>
      </div>
    </div>
    );
    }
    return (
    <div className="min-h-screen bg-gray-50" style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-futbol text-white text-lg"></i>
              </div>
              <h1 style={styles.logo}>Turf Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-700">
                <i className="fas fa-user-circle text-xl mr-2"></i>
                <span className="font-medium">Admin</span>
              </div>
              <button onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Date Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button onClick={()=> scrollDates("left")}
              disabled={dateScrollIndex === 0}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed
              cursor-pointer"
              >
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="flex space-x-2 overflow-hidden">
              {getVisibleDates().map((date, index) => (
              <button key={index} onClick={()=> setSelectedDate(date)}
                className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer
                !rounded-button ${
                selectedDate.toDateString() === date.toDateString()
                ? "bg-green-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                >
                <div className="text-sm">{formatDate(date)}</div>
                <div className="text-xs opacity-75">
                  {date.toDateString() === new Date().toDateString()
                  ? "Today"
                  : ""}
                </div>
              </button>
              ))}
            </div>
            <button onClick={()=> scrollDates("right")}
              disabled={dateScrollIndex >= dates.length - 7}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed
              cursor-pointer"
              >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Selected Date Display */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Available Slots for{" "}
            {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            })}
          </h2>
          <p className="text-gray-600">
            Click on any available slot to make a booking
          </p>
        </div>
        {/* Time Slots Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          {timeSlots.map((slot, index) => {
          const isBooked = isSlotBooked(slot, selectedDate);
          return (
          <button key={index} onClick={()=> handleSlotClick(slot)}
            disabled={isBooked}
            className={`p-4 rounded-xl border-2 transition-all font-medium text-center cursor-pointer !rounded-button
            whitespace-nowrap ${
            isBooked
            ? "bg-red-50 border-red-200 text-red-600 cursor-not-allowed opacity-60"
            : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 hover:shadow-md"
            }`}
            >
            <div className="text-sm font-semibold">{slot}</div>
            <div className="text-xs mt-1">
              {isBooked ? (
              <>
                <i className="fas fa-lock mr-1"></i>Booked
              </>
              ) : (
              <>
                <i className="fas fa-check-circle mr-1"></i>Available
              </>
              )}
            </div>
          </button>
          );
          })}
        </div>
        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              Today's Bookings ({getTodaysBookings().length})
            </h3>
          </div>
          {getTodaysBookings().length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sr No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Slot
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sport Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getTodaysBookings().map((booking, index) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.slot}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${booking.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {booking.sportType}
                    </span>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          ) : (
          <div className="text-center py-12">
            <i className="fas fa-calendar-times text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-500 text-lg">No bookings for this date</p>
            <p className="text-gray-400 text-sm">
              Bookings will appear here once slots are booked
            </p>
          </div>
          )}
        </div>
      </div>
      {/* Booking Modal */}
      {showBookingModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Book Slot
              </h3>
              <button onClick={()=> setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              })}{" "}
              • {selectedSlot}
            </p>
          </div>
          <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name
              </label>
              <input type="text" required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter customer name" value={bookingForm.name} onChange={(e)=>
              setBookingForm({ ...bookingForm, name: e.target.value })
              }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input type="tel" required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter phone number" value={bookingForm.phone} onChange={(e)=>
              setBookingForm({ ...bookingForm, phone: e.target.value })
              }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount ($)
              </label>
              <input type="number" required min="0" step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter amount" value={bookingForm.amount} onChange={(e)=>
              setBookingForm({ ...bookingForm, amount: e.target.value })
              }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sport Type
              </label>
              <div className="relative">
                <select required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
                  value={bookingForm.sportType} onChange={(e)=>
                  setBookingForm({
                  ...bookingForm,
                  sportType: e.target.value,
                  })
                  }
                  >
                  {sportTypes.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                  ))}
                </select>
                <i
                  className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button type="button" onClick={()=> setShowBookingModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50
                transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                >
                Cancel
              </button>
              <button type="submit"
                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
      )}
    </div>
    );
    };
    export default App;









    import React, { useState } from "react";

const Login = ({ onSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      localStorage.setItem(
        "turfAdmin",
        JSON.stringify({ email: form.email, password: form.password })
      );
      alert("Registration successful!");
      onSuccess();
    } else {
      const saved = JSON.parse(localStorage.getItem("turfAdmin"));
      if (saved?.email === form.email && saved?.password === form.password) {
        onSuccess();
      } else {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Turf Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="form-control"
            />
          </div>
          {isRegister && (
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                required
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                className="form-control"
              />
            </div>
          )}
          <button type="submit" className="btn btn-success w-100">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <div className="text-center mt-3">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="btn btn-link"
          >
            {isRegister
              ? "Already have an account? Login"
              : "No account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
