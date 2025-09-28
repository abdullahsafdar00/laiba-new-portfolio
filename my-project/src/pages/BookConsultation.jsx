import React, { useState, useRef, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookConsultation = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [selectedDate, setSelectedDate] = useState(null); // date-only
  const [selectedTime, setSelectedTime] = useState(null); // time string like '09:00'
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]); // array of ISO strings
  const [serverAvailable, setServerAvailable] = useState(true);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate date + time selection
      if (!selectedDate || !selectedTime) {
        toast.error('Please pick a date and a time slot.');
        setLoading(false);
        return;
      }
      // construct Date object from selectedDate + selectedTime (local)
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const slot = new Date(selectedDate);
      slot.setHours(hours, minutes, 0, 0);
      if (slot < new Date()) {
        toast.error('Please choose a future slot.');
        setLoading(false);
        return;
      }

      const slotISO = slot.toISOString();
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

      // Check availability via server
      try {
        const checkRes = await fetch(`http://localhost:5000/api/bookings/availability?slot=${encodeURIComponent(slotISO)}`);
        const checkJson = await checkRes.json();
        if (!checkRes.ok || checkJson.available === false) {
          toast.error(checkJson.message || 'Requested slot is not available. Please pick another time.');
          setLoading(false);
          // refresh slots for the month/day
          fetchBookedSlots(selectedDate || new Date());
          return;
        }
      } catch (err) {
        console.error('Availability check failed', err);
        toast.error('Could not verify availability. Try again later.');
        setLoading(false);
        return;
      }

      navigate("/purchase-plan", {
        state: {
          plan: {
            name: "30-min Personal Consultation Call",
            price: "$20",
            billing: "one-time",
            note: "A 30-minute video call with our expert designer.",
          },
          user: { name: form.name, email: form.email },
          bookingDateTime: slotISO,
          bookingTimezone: timezone,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch booked slots for a given month range (visible month)
  const fetchBookedSlots = async (visibleDate) => {
    try {
      const start = new Date(visibleDate.getFullYear(), visibleDate.getMonth(), 1);
      const end = new Date(visibleDate.getFullYear(), visibleDate.getMonth() + 1, 0, 23, 59, 59);
      const res = await fetch(`http://localhost:5000/api/bookings/slots?start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`);
      const json = await res.json();
      if (res.ok && json.slots) {
        setBookedSlots(json.slots || []);
        setServerAvailable(true);
      } else {
        setBookedSlots([]);
      }
    } catch (err) {
      console.error('Failed to fetch booked slots', err);
      setBookedSlots([]);
      setServerAvailable(false);
    }
  };

  useEffect(() => {
    // initial fetch for current month
    fetchBookedSlots(new Date());
  }, []);

  // helpers for react-datepicker
  const isTimeDisabled = (date) => {
    // date is a Date object representing a time on the selected day
    const iso = new Date(date).toISOString();
    // Normalize to minute precision
    const trimmed = iso.slice(0,16); // YYYY-MM-DDTHH:mm
    return bookedSlots.some(s => s.slice(0,16) === trimmed);
  };

  const handleMonthChange = (date) => {
    fetchBookedSlots(date);
  };

  // Generate time slots between business hours (09:00 - 18:00) at 30-min intervals for a date
  const generateTimeSlots = (date) => {
    const slots = [];
    const start = new Date(date);
    start.setHours(9,0,0,0);
    const end = new Date(date);
    end.setHours(18,0,0,0);
    let cur = new Date(start);
    while (cur <= end) {
      slots.push(new Date(cur));
      cur = new Date(cur.getTime() + 30 * 60 * 1000);
    }
    return slots;
  };

  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <section className="min-h-screen bg-white px-4 py-20 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl items-center justify-center">
        {/* Form Card */}
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl z-30 p-10">
          <h1 className="text-4xl font-bold text-pink-600 mb-4 text-center">Book a Consultation</h1>
          {!serverAvailable && (
            <div className="mb-4 border-l-4 border-red-400 bg-red-50 p-3 text-sm text-red-700">
              Booking server is unreachable. Live availability checks are disabled.
              <button
                type="button"
                onClick={() => { setServerAvailable(true); fetchBookedSlots(new Date()); }}
                className="ml-3 underline text-red-700"
              >Retry</button>
            </div>
          )}
          <p className="text-center text-gray-600 mb-8">
            Get a <span className="font-semibold text-pink-500">30-minute personal call</span> for just <span className="font-bold">$20</span>.
            <br />
            Ask anything about design, branding, or your project!
          </p>
            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Preferred Date & Time</label>
              <DatePicker
                selected={selectedDate}
                onChange={(d) => { setSelectedDate(d); setSelectedTime(null); }}
                dateFormat="MMMM d, yyyy"
                placeholderText="Pick a date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                minDate={new Date()}
                onMonthChange={handleMonthChange}
                inline={false}
              />
              {/* Time selection grid */}
              <div className="mt-4">
                <div className="text-sm font-medium mb-2">Available Times <span className="text-xs text-gray-400">({Intl.DateTimeFormat().resolvedOptions().timeZone})</span></div>
                {selectedDate ? (
                  <div className="grid grid-cols-3 gap-2 max-h-64 overflow-auto">
                    {generateTimeSlots(selectedDate).map(ts => {
                      const iso = ts.toISOString();
                      const disabled = bookedSlots.some(s => s.slice(0,16) === iso.slice(0,16));
                      const label = ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      const isSelected = selectedTime === `${String(ts.getHours()).padStart(2,'0')}:${String(ts.getMinutes()).padStart(2,'0')}`;
                      return (
                        <button
                          key={iso}
                          type="button"
                          disabled={disabled}
                          onClick={() => setSelectedTime(`${String(ts.getHours()).padStart(2,'0')}:${String(ts.getMinutes()).padStart(2,'0')}`)}
                          className={`px-3 py-2 text-sm rounded ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : isSelected ? 'bg-pink-600 text-white' : 'bg-white border border-gray-200 hover:bg-pink-50'}`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">Pick a date to see available times.</div>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition"
            >
              {loading ? "Booking..." : "Book Now for $20"}
            </button>
          </form>
          <div className="mt-8 text-center">
            <span className="text-gray-500 text-sm">You and the admin will receive a confirmation email after booking.</span>
          </div>
        </div>

        {/* Profile Card */}
        <div
          ref={divRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className="relative w-full max-w-sm h-96 rounded-xl p-0.5 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-2xl z-50 cursor-pointer"
        >
          {visible && (
            <div
              className="pointer-events-none blur-xl bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 size-60 absolute z-0 transition-opacity duration-300"
              style={{ top: position.y - 120, left: position.x - 120 }}
            />
          )}
          <div className="relative z-10 bg-white p-6 h-full w-full rounded-[10px] flex flex-col items-center justify-center text-center">
            <img
              src="/laiba.jpg"
              alt="Profile Avatar"
              className="w-24 h-24 rounded-full shadow-md my-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Laiba Safdar</h2>
            <p className="text-sm text-pink-500 font-medium mb-4">Graphic Designer</p>
            <p className="text-sm text-gray-500 mb-4 px-4">
              Professional Amazon Listing Images Designer 
            </p>
            <div className="flex space-x-4 mb-4 text-xl text-pink-600">
              {/* Replace # with your actual URLs */}
              <a href="#" target="_blank" className="hover:-translate-y-0.5 transition">
                {/* GitHub icon */}
                <svg className="size-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* LinkedIn icon */}
              <a href="#" target="_blank" className="hover:-translate-y-0.5 transition">
                <svg className="size-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                    clipRule="evenodd"
                  />
                  <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                </svg>
              </a>
              {/* Twitter icon */}
              <a href="#" target="_blank" className="hover:-translate-y-0.5 transition">
                <svg className="size-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookConsultation;
