import { useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import "./login.css";
import "./register.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showHide, setShowHide] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [registerForm, setRegisterForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const border = () => {
    document.querySelectorAll("input").forEach((input) => {
      input.style.border = "1px solid #999";
    });
  };

  const handleToggle = () => setShowHide(!showHide);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email || !password) {
      setErrorMsg("Email and Password are required.");
      return;
    }

    try {
      const response = await axios.post("/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      console.log("Token stored:", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg(
        error.response?.data?.message || "Invalid email or password."
      );
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { username, firstname, lastname, email, password } = registerForm;

    if (!username || !firstname || !lastname || !email || !password) {
      setErrorMsg("Please provide all required information.");
      return;
    }

    try {
      await axios.post("/users/register", {
        username,
        firstname,
        lastname,
        email,
        password,
      });
      setErrorMsg("Registration successful! Please log in.");
      handleToggle();
    } catch (error) {
      setErrorMsg(error.response?.data?.msg || "Registration failed.");
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <Layout>
      <div
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="login_full_container"
      >
        <div className="container">
          <div className="row login_container flex-row">
            <div className="col-sm-12 d-flex col-md-6">
              <div className="login_box pt-4 align-items-center">
                <div className="login_width">
                  {showHide ? (
                    <div className="login">
                      {errorMsg && (
                        <div className="login_invalid">{errorMsg}</div>
                      )}

                      <h3 className="login_title">Login to your account</h3>
                      <div className="login_new d-flex">
                        <div className="mx-auto">Don't have an account?</div>
                        <div
                          className="mx-auto"
                          onClick={handleToggle}
                          style={{ color: "#F04400", cursor: "pointer" }}
                        >
                          Create a new account
                        </div>
                      </div>

                      <form onSubmit={handleLogin} className="login_form_input">
                        <div>
                          <input
                            className="login_email"
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={border}
                          />
                        </div>
                        <br />

                        <div className="siconContainer">
                          <input
                            className="login_password passwordInput"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={border}
                          />
                          <div
                            className="iconContainer"
                            onClick={togglePasswordVisibility}
                          >
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                              color="#FE8402"
                            />
                          </div>
                        </div>
                        <button type="submit">Login</button>
                      </form>
                    </div>
                  ) : (
                    <div id="register">
                      {errorMsg && (
                        <div className="login_invalid">{errorMsg}</div>
                      )}
                      <h1 className="register_login_title">Join the network</h1>
                      <div>
                        <div className="d-flex mx-auto">
                          Already have an account?
                          <div onClick={handleToggle} className="already">
                            Sign in
                          </div>
                        </div>
                      </div>

                      <form
                        onSubmit={handleRegister}
                        className="register_login_form_input"
                      >
                        <div>
                          <div>
                            <input
                              className="register_email"
                              type="email"
                              name="email"
                              placeholder="Email"
                              value={registerForm.email}
                              onChange={handleRegisterChange}
                              onFocus={border}
                            />
                          </div>

                          <br />
                          <div className="register_first_last gap-2">
                            <div>
                              <input
                                className="register_first"
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                value={registerForm.firstname}
                                onChange={handleRegisterChange}
                                onFocus={border}
                              />
                            </div>

                            <div>
                              <input
                                className="register_last"
                                type="text"
                                name="lastname"
                                placeholder="Last Name"
                                value={registerForm.lastname}
                                onChange={handleRegisterChange}
                                onFocus={border}
                              />
                            </div>
                          </div>
                          <br />
                          <div>
                            <input
                              className="register_user"
                              type="text"
                              name="username"
                              placeholder="Username"
                              value={registerForm.username}
                              onChange={handleRegisterChange}
                              onFocus={border}
                            />
                          </div>

                          <br />

                          <div className="siconContainer">
                            <input
                              className="register_password passwordInput"
                              type={showPassword ? "text" : "password"}
                              name="password"
                              placeholder="Password"
                              value={registerForm.password}
                              onChange={handleRegisterChange}
                              onFocus={border}
                            />

                            <div
                              className="iconContainer_register"
                              onClick={togglePasswordVisibility}
                            >
                              <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                color="#FE8402"
                              />
                            </div>
                          </div>

                          <br />

                          <button type="submit">Agree and Join</button>
                          <small>
                            I agree to the <Link to="#">privacy policy</Link>
                            <span> and </span>
                            <Link to="#">terms of service.</Link>
                          </small>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-sm-12 d-none d-md-block d-lg-block col-md-6">
              <div className="Evangadi_description">
                <div className="padd-text fadeInLeft">
                  <div style={{ color: "#FE8303" }}>About</div>
                  <h2 className="title_ev">Evangadi Networks Q&A</h2>
                  <p>
                    No matter what stage of life you are in, whether you’re just
                    starting elementary school or being promoted to CEO of a
                    Fortune 500 company, you have much to offer to those who are
                    trying to follow in your footsteps.
                  </p>
                  <p className="font-p mg-bt-30">
                    Whether you are willing to share your knowledge or you are
                    just looking to meet mentors of your own, please start by
                    joining the network here.
                  </p>
                  <div className="login_btn">
                    <div onClick={handleToggle}>How It works</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
