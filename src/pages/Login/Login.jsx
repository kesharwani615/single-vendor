import React, { useEffect, useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserLoginSlice } from "../../redux/features/AuthSlice";

const onlyNumbersRegex = /^[0-9]*$/;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Data, setData] = useState({
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    password: "",
  });

  const [valid, setValid] = useState({
    lock: false,
    remberMe: false,
  });

  const {loading} = useSelector((state)=>state.Auth)

  useEffect(() => {
    const remberData = JSON.parse(localStorage.getItem("remberMe"));
    console.log("remberData:",remberData);
    if (remberData) {
      setData(remberData);
      valid.remberMe = true;
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && !onlyNumbersRegex.test(value)) return;

    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!Data.phone) {
      valid = false;
      newErrors.phone = "phone number is required";
    } else if (!/^[6-9][0-9]{9}$/.test(Data.phone)) {
      valid = false;
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    // Password validation
    if (!Data.password) {
      valid = false;
      newErrors.password = "Password is required";
    } else if (Data.password.length < 6) {
      valid = false;
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    console.log("valid.remberMe:",valid.remberMe)
    e.preventDefault();
    if (validate()) {
      dispatch(UserLoginSlice(Data)).then((res) => {
        console.log("res:",res);
        if (Object.entries(res?.payload?.data ?? {}).length > 0) {
          if (valid.remberMe) localStorage.setItem("remberMe", JSON.stringify(Data));
            
          navigate('/')
        }
      });
    }
  };

  return (
    <div className="LoginArea">
      <div className="LoginBox">
        <div className="LoginLeft">
          <h2>
            Single<span>Vendor</span>
          </h2>
          <h3>
            <span>Login your account</span>
          </h3>
          <h4>Enter your phone number to access the admin panel.</h4>
          <form onSubmit={handleSubmit}>
            {/* phone Number Field */}
            <div className="form-group">
              <label>phone Number (We'll send you a verification code)</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone Number"
                value={Data.phone}
                onChange={handleChange}
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              />
              {errors.phone && (
                <span className="error-text" style={{ color: "red" }}>
                  {errors.phone}
                </span>
              )}
              <span className="Icon">
                <i className="fa fa-phone" aria-hidden="true" />
              </span>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label>Password</label>
              <input
                type={valid.lock ? "text" : "password"}
                name="password"
                placeholder="********"
                value={Data.password}
                onChange={handleChange}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              {errors.password && (
                <span className="error-text" style={{ color: "red" }}>
                  {errors.password}
                </span>
              )}
              <span
                className="Icon"
                onClick={() =>
                  setValid((prev) => ({ ...prev, lock: !valid.lock }))
                }
              >
                {valid.lock ? <FaLockOpen /> : <FaLock />}
              </span>
            </div>

            {/* Terms and Conditions */}
            <div className="form-group">
              <p>
                By creating your account, you agree to our{" "}
                <strong>Terms &amp; conditions</strong>.
              </p>
            </div>

            {/* Remember Me */}
            <div className="Checkboxs">
              <label className="CheckBox">
                Remember Me
                <input
                  type="checkbox"
                  name="remberMe"
                  checked={valid.remberMe}
                  onChange={(e) =>
                    setValid((prev) => ({
                      ...prev,
                      [e.target.name]: !prev[e.target.name],
                    }))
                  }
                />
                <span className="checkmark" />
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="Login">
              Log In <i className="fa fa-sign-in" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
