import { useNavigate} from "react-router-dom";
import { useEffect } from "react";


const RedirectPage = () => {

  const navigate = useNavigate()

  console.log("navigate(-1)", navigate(-1))
  console.log("navigate(-2)", navigate(-2))
  console.log("navigate(-3)", navigate(-3))
  console.log("navigate(-4)", navigate(-4))

  useEffect(() => {
    navigate(-2)
  }, [])
  

  return(
    <div>
      <h6>redirecting to previous page before login...</h6>
    </div>
    
    )
  
}

export default RedirectPage