import { useState,useEffect } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
function patient(){
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault;
        const payload = {
            name: name,
            dob: dob,
            gender: gender,
            phone: phone,
            password: password,
            role: "patient"
        };
        try{
            const result = axios.post("http://localhost:8080/api/auth/register", payload, {
                headers: {
                    "content-type": "application/json"
                }
            })
            navigate("/login")
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div className="container flex flex-col gap-6">
            <div className="header flex justify-center">
                <span className="text-blue-600 text-3xl">Create Account</span>
            </div>
            <div className="grid grid-cols-1 gap-4 m-3 ml-10 border border-gray-500 rounded-lg p-5">
                <div className="personal space-y-3">
                    <div className="form-group flex flex-col">
                        <label htmlFor="name">name</label>
                        <input type="text" name="name" onChange={(e) => setName(e.target.value)} id="" className="border rounded-lg"/>
                    </div>
                    <div className="form-group flex flex-col">
                        <label htmlFor="date">Birth of date</label>
                        <input type="date" name="" onChange={(e) => setDob(e.target.value)}  id="" />
                    </div>
                    <div className="form-group flex flex-col">
                        <label htmlFor="date">gender</label>
                        <select name="" id="" onChange={(e) => setGender(e.target.value)} >
                            <option value="">select your gender ---</option>
                            <option value="Female">female</option>
                            <option value="Male">male</option>
                        </select>
                    </div>
                    <div className="form-group flex flex-col">
                        <label htmlFor="date">Phone</label>
                        <input type="text" name="" id="" onChange={(e) => setPhone(e.target.value)}  className="border rounded-lg" />
                    </div>
                    <div className="form-group flex flex-col">
                        <label htmlFor="date">Password</label>
                        <input type="text" name="" id="" onChange={(e) => setPassword(e.target.value)}  className="border rounded-lg" />
                    </div>
                    <div className="form-group flex flex-col">
                        <button type="submit" onClick={handleSubmit} className="bg-blue-700 rounded-lg p-1 text-white">register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default patient