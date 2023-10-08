import { Link } from "react-router-dom";
// import styles from "./Login.module.css"; // Import the CSS module



const Login = () => {
  return (
    <div className="container">
        <div className="login-section">
            <div className="form-box login">
              <form action="" id="login">
                    <h2>¡Bienvenido!</h2>
                    <br/>
                    <div class="input-box">
                        <span class="icon"><i class='bx bxs-envelope'></i></span>
                        <input type="email" id="emailUsuario"/>
                        <label >Email</label>
                    </div>
                    <div class="input-box">
                        <span class="icon"><i class='bx bxs-lock-alt' ></i></span>
                        <input type="password" id="contrasenaUsuario"/>
                        <label>Contraseña</label>
                    </div>
                    <div class="button_group" id="login_button">
                        {/* <button class="btn"  id="submitIngresar">Iniciar sesión</button> */}
                        <Link to={"/dashboard"} className="btn" id="submitIngresar">
                          Iniciar sesión
                        </Link>
                      </div>
                    <div class="create-account">
                        <p>Olvido su contraseña? <a href="#" class="register-link">Click aquí</a></p>
                    </div>
                </form>
          </div>
          <div class="form-box register">
                <form action="">

                    <h2>Recuperar contraseña</h2>
                    <p>Ingrese su correo electrónico de recuperación</p>
                    <br/>
                    <div class="input-box">
                        <span class="icon"><i class='bx bxs-envelope'></i></span>
                        <input type="email"  id="Recuperer"/>
                        <label >Email</label>
                    </div>
                    <button class="btn" id="RecupererSumit">Enviar</button>
                    <div class="create-account">
                        <p><a href="#" class="login-link">Inicio</a></p>
                    </div>
                </form>
            </div>
        </div>
     </div>
  )
}

export default Login


// import { Link } from "react-router-dom";
// import styles from "./Login.module.css"; // Import the CSS module

// const Login = () => {
//   return (
//     <div className={styles.container}>
//       <div className={`${styles["login-section"]}`}>
//         <div className={`${styles["form-box"]} ${styles.login}`}>
//           <form action="" id="login">
//             <h2>¡Bienvenido!</h2>
//             <br />
//             <div className={styles["input-box"]}>
//               <span className={styles.icon}>
//                 <i className='bx bxs-envelope'></i>
//               </span>
//               <input type="email" id="emailUsuario" />
//               <label>Email</label>
//             </div>
//             <div className={styles["input-box"]}>
//               <span className={styles.icon}>
//                 <i className='bx bxs-lock-alt'></i>
//               </span>
//               <input type="password" id="contrasenaUsuario" />
//               <label>Contraseña</label>
//             </div>
//             <div className={styles["button_group"]} id="login_button">
//               <Link to={"/dashboard"} className={`btn ${styles.btn}`} id="submitIngresar">
//                 Iniciar sesión
//               </Link>
//             </div>
//             <div className={styles["create-account"]}>
//               <p>
//                 Olvidó su contraseña? <a href="#" className={styles["register-link"]}>Click aquí</a>
//               </p>
//             </div>
//           </form>
//         </div>
//         <div className={`${styles["form-box"]} ${styles.register}`}>
//           <form action="">
//             <h2>Recuperar contraseña</h2>
//             <p>Ingrese su correo electrónico de recuperación</p>
//             <br />
//             <div className={styles["input-box"]}>
//               <span className={styles.icon}>
//                 <i className='bx bxs-envelope'></i>
//               </span>
//               <input type="email" id="Recuperer" />
//               <label>Email</label>
//             </div>
//             <button className={`btn ${styles.btn}`} id="RecupererSumit">Enviar</button>
//             <div className={styles["create-account"]}>
//               <p><a href="#" className={styles["login-link"]}>Inicio</a></p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
