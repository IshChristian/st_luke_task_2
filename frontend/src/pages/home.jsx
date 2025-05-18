import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
function Home(){
    const navigate = useNavigate();
    useEffect(()=>{
        if(!sessionStorage.getItem('name')){
            navigate('/login')
        }
    },[])
    return(
    <div className="container h-100 flex flex-col justify-center items-center">
            <h1 className="font-black text-blue-800 text-3xl">WELCOME TO ST.LUKE {sessionStorage.getItem('name')}</h1>
        </div>
    )
}

export default Home