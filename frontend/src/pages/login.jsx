import { useState,useEffect } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

function patient(){
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const result = await axios.post("http://localhost:8080/api/auth/login", {
            phone: phone,
            password: password
        },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(result)
            sessionStorage.setItem('name', result.data.user[0].name)
            sessionStorage.setItem('userid', result.data.user[0].pid)
            sessionStorage.setItem('role', result.data.user[0].role)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div className="container flex flex-col gap-6">
            <div className="header flex justify-center">
                <span className="text-blue-600 text-3xl">Login</span>
            </div>
            <div className="grid grid-cols-1 gap-4 m-3 ml-10 border border-gray-500 rounded-lg p-5">
                <div className="personal space-y-3">
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