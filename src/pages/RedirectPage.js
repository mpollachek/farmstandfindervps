import { useNavigate} from "react-router-dom";


const RedirectPage = () => {

  const navigate = useNavigate()

  navigate(-2)

  return(
    <div>
      <h6>redirecting to previous page before login...</h6>
    </div>
    
    )
  
}

export default RedirectPage