import { useEffect,useState } from "react";
const useWindowSize=()=>{
    const[windowSize,setWindowSize]=useState({
        width:undefined,
        height:undefined
    })
    useEffect(()=>{
        const handleResize=()=>{
            setWindowSize({
                width:window.innerHeight,
                height:window.innerHeight
            })


        }
        handleResize()
        window.addEventListener('resize',handleResize());
        const cleanup=()=>{
            console.log("welcome")
            window.addEventListener('resize',handleResize);
        }

return cleanup()
}


    ,[])
    return windowSize

}
export default useWindowSize