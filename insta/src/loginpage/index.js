import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
export const Index = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState('')
  const jwtToken = Cookies.get("jwtToken");
  const navigate = useNavigate();
  const checkbox = document.getElementById("checkmark");

  const onSubmitSuccess = (token) => {

    const expiration = checkbox.checked ? { expires: 7 } : undefined;
    
    Cookies.set("jwtToken", token, expiration);

    navigate("/home");
  };

  const login = async (event) => {
    event.preventDefault();
    const userDetails = {username,password}
    
    const url =  "https://instaserver-c9tt.onrender.com/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    
    const data=await response.json()
   
    if (response.status===200) {
      onSubmitSuccess(data.jwt_token);
    }else{
      setError(data.error_msg)
      
    }
  };
  useEffect(() => {
    if (jwtToken) {
      navigate("/home");
    }
  }, [jwtToken, navigate]);

  return (
    <>
      <div className="flex items-center w-screen justify-around h-screen">
      <div className="hidden sm:inline ">
          <img className="min-w-[400px] max-w-[600px]" src="https://res.cloudinary.com/dbs9akgm5/image/upload/v1684052654/Layer2_mhy82v.png" alt="logo" />
        </div>
        <div className="flex sm:shadow-slate-500 sm:shadow-xl flex-col justify-end px-6 py-6  sm:w-[456px] w-screen">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="text-center flex items-center flex-col">
              <img src='https://res.cloudinary.com/dbs9akgm5/image/upload/v1684052534/StandardCollection8_t9pcbx.png' alt="logo"/>
              <b className="text-2xl mt-2">Insta Share</b>
            </div>
          </div>

          <div className="mt-10  p-4">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={login}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={username}
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    className=" bg-gray-200 block w-full border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="bg-gray-200 block w-full px-4 border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="p-1 flex justify-item-center text-left">
                <input
                  className="w-5 mr-1 px-3 h-5 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6"
                  id="checkmark"
                  type="checkbox"
                ></input>
                <label htmlFor="checkmark">Keep me login</label>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
                {error.length>0?<p className="text-red-600">*{error}</p>:null}
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </>
  );
};
