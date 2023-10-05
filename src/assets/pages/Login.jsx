import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div>
      <h1> Login </h1>

      <Link to={"/dashboard"}> Iniciar </Link>
    </div>
  )
}

export default Login
