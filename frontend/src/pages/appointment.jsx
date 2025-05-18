import { useState, useEffect } from "react";
import axios from "axios";

function Appointment() {
  // State management
  const [form, setForm] = useState({
    date: "",
    reason: "",
    note: "",
    doctorId: ""
  });
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  // API config
  const API_URL = "http://localhost:8080/api";

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [doctorsRes, appointmentsRes] = await Promise.all([
        axios.get(`${API_URL}/doctor/doctors`),
        axios.get(`${API_URL}/appointment/appointments`)
      ]);
      setDoctors(doctorsRes.data.data);
      setAppointments(appointmentsRes.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        pid: 1, // Replace with actual patient ID
        status: "scheduled"
      };

      if (editId) {
        await axios.put(`${API_URL}/appointment/appointments/${editId}`, payload);
      } else {
        await axios.post(`${API_URL}/appointment/appointments`, payload);
      }

      fetchData(); // Refresh data
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || "Request failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await axios.delete(`${API_URL}/appointment/appointments/${id}`);
        fetchData(); // Refresh data
      } catch (err) {
        setError("Failed to delete");
      }
    }
  };

  const resetForm = () => {
    setForm({
      date: "",
      reason: "",
      note: "",
      doctorId: doctors[0]?.id || ""
    });
    setEditId(null);
  };

  // Calculate queue position
  const queuePosition = appointments.filter(
    app => ["scheduled", "pending"].includes(app.status)
  ).length + 1;

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-xl font-semibold">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-red-500 text-xl font-semibold">Error: {error}</div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Appointment Management</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Appointment Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Appointment" : "Create New Appointment"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
            <select
              name="doctorId"
              value={form.doctorId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  Dr. {doctor.name} ({doctor.specialization})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
            >
              {editId ? "Update Appointment" : "Create Appointment"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Queue Position */}
      <div className="bg-blue-50 rounded-lg p-4 mb-8 text-center">
        <h2 className="text-lg font-medium text-blue-800">Your Queue Position</h2>
        <div className="text-5xl font-bold text-blue-600 my-2">{queuePosition}</div>
        <p className="text-gray-600">
          {queuePosition === 1 
            ? "You're next in line!" 
            : `There are ${queuePosition - 1} patients ahead of you`}
        </p>
      </div>

      {/* Appointments List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
        
        {appointments.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center text-gray-500">
            No appointments found
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => {
              const doctor = doctors.find(d => d.id === appointment.did);
              return (
                <div key={appointment.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">Doctor</h3>
                      <p>{doctor ? `Dr. ${doctor.name}` : 'Unknown'}</p>
                      <p className="text-sm text-gray-500">{doctor?.specialization}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900">Date & Time</h3>
                      <p>{new Date(appointment.appointment_date).toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900">Status</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">Reason</h3>
                      <p>{appointment.reason}</p>
                    </div>
                    
                    {appointment.notes && (
                      <div>
                        <h3 className="font-medium text-gray-900">Notes</h3>
                        <p>{appointment.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setForm({
                          date: appointment.appointment_date,
                          reason: appointment.reason,
                          note: appointment.notes,
                          doctorId: appointment.did
                        });
                        setEditId(appointment.id);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(appointment.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Appointment;