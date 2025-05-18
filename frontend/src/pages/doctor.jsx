import { useState, useEffect } from 'react';

function Doctor() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentDoctor, setCurrentDoctor] = useState({
        id: '',
        name: '',
        specialization: '',
        contact: '',
        email: ''
    });

    // Fetch all doctors
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http:localhost:8080/api/doctor/doctors');
                if (!response.ok) {
                    throw new Error('Failed to fetch doctors');
                }
                const data = await response.json();
                setDoctors(data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentDoctor(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = isEditing 
                ? `http:localhost:8080/api/doctor/doctors/${currentDoctor.id}`
                : 'http:localhost:8080/api/doctor/doctors';
                
            const method = isEditing ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentDoctor)
            });
            
            if (!response.ok) {
                throw new Error(`Failed to ${isEditing ? 'update' : 'create'} doctor`);
            }
            
            // Refresh doctors list
            const newResponse = await fetch('http:localhost:8080/api/doctor/doctors');
            const newData = await newResponse.json();
            setDoctors(newData.data);
            
            // Reset form
            setCurrentDoctor({
                id: '',
                name: '',
                specialization: '',
                contact: '',
                email: ''
            });
            setIsEditing(false);
            
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (doctor) => {
        setCurrentDoctor(doctor);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http:localhost:8080/api/doctor/doctors/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete doctor');
            }
            
            // Refresh doctors list
            const newResponse = await fetch('http:localhost:8080/api/doctor/doctors');
            const newData = await newResponse.json();
            setDoctors(newData.data);
            
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading doctors...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Doctor Management</h1>
            
            {/* Doctor Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">
                    {isEditing ? 'Edit Doctor' : 'Add New Doctor'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={currentDoctor.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Specialization</label>
                            <input
                                type="text"
                                name="specialization"
                                value={currentDoctor.specialization}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact</label>
                            <input
                                type="text"
                                name="contact"
                                value={currentDoctor.contact}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={currentDoctor.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setCurrentDoctor({
                                        id: '',
                                        name: '',
                                        specialization: '',
                                        contact: '',
                                        email: ''
                                    });
                                }}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                            >
                                Cancel
                            </button>
                        )}
                        
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            {isEditing ? 'Update Doctor' : 'Add Doctor'}
                        </button>
                    </div>
                </form>
            </div>
            
            {/* Doctors List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Doctor List</h2>
                
                {doctors.length === 0 ? (
                    <p>No doctors found</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {doctors.map((doctor) => (
                                    <tr key={doctor.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{doctor.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{doctor.specialization}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{doctor.contact}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{doctor.email || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                            <button
                                                onClick={() => handleEdit(doctor)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(doctor.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Doctor;