import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function header(){
    const navigate = useNavigate();
    useEffect(()=>{
        if(!sessionStorage.getItem('role')){
            navigate('/login')
        }
    },[])
    const adminMenu = [
        {path: "/doctor", label: "Doctor"},
    ];
    const patientMenu = [
        {path: "/appointment", label: "appointment"},
    ];

    const isPatient = sessionStorage.getItem('role') === 'patient' ? patientMenu : adminMenu

    return(
        <div className="header w-screen p-5 bg-white items-center h-20 flex flex-row justify-between">
            <div className="log">
                <h1 className="font-black text-blue-700 antialiased text-2xl">ST.LUKE</h1>
            </div>
            <div className="menu flex flex-row gap-3">
                <Link to={"/"} className="hover:text-blue-900 text-1xl">Home</Link>
                {sessionStorage.getItem('role') === 'patient' ? (
                    <>
                        <Link to={"/appointment"} className="hover:text-blue-900 text-1xl">appointment</Link>
                    </>
                ) : (
                    <>
                        <Link to={"/doctor"} className="hover:text-blue-900 text-1xl">doctor</Link>
                    </>
                )}
            </div>
            <div className="actions flex flex-row gap-3">
                <Link to={"/logout"} className="login bg-blue-600 rounded-lg px-5 py-2 text-white">Logout</Link>
            </div>
        </div>
    )
}

export default header