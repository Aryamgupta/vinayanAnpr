import React, { useEffect, useState } from "react";
import logoImg from "../../../Images/logo.svg";
import { useNavigate } from "react-router-dom";
import policeLogo from "./Icons/iconLogo.svg";
import axios from "axios";

const Login = ({ setIsNavBar }) => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [loginPassword, setloginPassword] = useState("");

  useEffect(() => {
    setIsNavBar(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();



  const handleRefresh = () => {
    window.location.reload();
  };

  const login = async () => {
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login/`,
        { username:selectedUser, password:loginPassword },
        {
          headers: {
            'Content-Type': 'application/json',
            'key': '1qwAqeItyffArinSc133e3Adefdu3aaf799a84a6a3a048',
          },
        }
      );


      sessionStorage.setItem('admin_key', response.data.data.admin_key);


      setIsNavBar(true)
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
     
    }
  };

  return (
    <div className="loginMainBox">
      <div className="loginMainInfo">
        {/* <img alt="imae" src={logoImg} /> */}
        <div className="loginDetails">
          <h3>
            Log In <span>As</span>
          </h3>
          <h5>Welcome Back! Log in to continue</h5>
          <div>
            <label className="userName">Username</label>
            <select
              value={selectedUser}
              onChange={(e) => {
                setSelectedUser(e.target.value);
              }}
              id="selectUser"
            >
              <option value={0}>Select username</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="userName">Password</label>

            <input
              value={loginPassword}
              type="password"
              onClick={(e) => {
                // setIsDialPadOpen(true);
              }}
              //  style={{borderBottom:"1px solid rgba(42, 82, 152, 0.3)",width:"100%",height:"50px"}}
              placeholder="Enter Password"
              onChange={(e) => {
                e.preventDefault();
                setloginPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              onClick={(e) => {
                login();
              }}
              style={{ cursor: "pointer" }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>

      <div className="dailPadMain">
        <img alt="imae"
          src={logoImg}
          onClick={() => {
            handleRefresh();
          }}
          style={{ cursor: "pointer" }}
        />
        <p className="vinayanName">
          VINAYAN (INDIA) CONSULTING AND SERVICES PVT. LTD.
        </p>
        <div className="otherDialPad">
          <img alt="imae" src={policeLogo} />
          <p>DELHI TRAFFIC POLICE</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
