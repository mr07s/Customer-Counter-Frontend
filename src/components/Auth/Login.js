import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import Errormessage from "../Alerts/Errormessage";
import HashLoader from "react-spinners/CircleLoader";
import Sucessmessages from "../Alerts/Sucessmessages";
import loginImage from "../images/loginImage.jpg";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userstate = useSelector((state) => state.authReducer);
  console.log(userstate);

  const { loading, data, error, user } = userstate;
  console.log(data);

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }, navigate));
  };

  return (
    <div className="holder">
      <div className="outerbox">
        <div className="formholder">
          {/* {user && <Sucessmessages data={"Logged in sucessfully"}/>}
{error && <Errormessage data={data}/>}
{loading&& <h4>Loading... <HashLoader color="#36d7b7"  display="flex" margin-left="20px"/></h4>}
   */}
          <div className="Errorholder">
            {
              (user && <Sucessmessages data={"Logged in sucessfully"} />) ||
                (error && <Errormessage data={data} />)
              // (loading&& <h4>Loading... <HashLoader color="#36d7b7"  display="flex" margin-left="20px"/></h4>)
            }
          </div>

          {loading ? (
            <h4>
              Loading...{" "}
              <HashLoader color="black" display="flex" margin-left="20px" />
            </h4>
          ) : (
            <form action="" className="authform">
              <label htmlFor="email">
                <h6>Email</h6>
                <input
                  type="Email"
                  placeholder="Type your email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label htmlFor="password">
                <h6>Password</h6>
                <input
                  type="Password"
                  placeholder="Type your Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <div id="buttondiv">
                <button className="createaccount" onClick={handlesubmit}>
                  LogIn
                </button>
              </div>
            </form>
          )}
        </div>

        <div>{/* <img src={loginImage} alt="" srcset="" /> */}</div>
      </div>
    </div>
  );
};

export default Login;
