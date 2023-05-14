import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { BiSearchAlt, BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Status } from "../statusbar";
import { Profile } from "../Profile";
import { SearchResults } from "../search";
import { useDispatch } from "react-redux";
import { setUserId, setIsLoggedIn } from "../../app/counterslice";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../app/counterslice";
import { Discuss } from "react-loader-spinner";

export const Navbar = () => {
  const [seacrhInput, setSeacrhInput] = useState("");
  const [renderPost, setPost] = useState([]);
  const [searchresult, setresults] = useState(false);
  const [showmenu, setIsActive] = useState(false);
  const [showsearch, setshowserch] = useState(false);
  let [count, setcount] = useState(0);
  const dispatch = useDispatch();
  const isActive = useSelector(selectIsLoggedIn);
  const jwtToken = Cookies.get("jwtToken");
  const [isloading,setloader]=useState(false)

  const handleHomeClick = () => {
    dispatch(setIsLoggedIn(false));
  };

  const handleProfileClick = () => {
    dispatch(setUserId(null));

    dispatch(setIsLoggedIn(true));
  };
  const navigate = useNavigate();
  const logingOut = () => {
    Cookies.remove("jwtToken");
    navigate("/");
  };

  const getSearch = async () => {
    setloader(true)
    const jwtToken = Cookies.get("jwtToken");
    const body = { searchInput: seacrhInput, jwtToken: jwtToken };
    const response = await fetch(`http://localhost:3000/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    setPost(data.posts);
    setloader(false)
    setresults(true);
    setcount(0);
  };
  const showsearchrender = () => {
    setshowserch(true);
    setIsActive(false);
  };
  const handelmenu = () => {
    setIsActive(true);
    setshowserch(false);
  };

  if (seacrhInput.length <= 0 && count < 2) {
    setresults(false);
    setcount((count += 1));
  }

  useEffect(() => {
    const token = Cookies.get("jwtToken");

    if (!token) {
      // Navigate to login page
      navigate("/");
    }
  }, []);

  const Loader = () => {
    return (
      <div className="h-[90vh] w-screen flex justify-center items-center">
      <Discuss
      
      visible={true}
      height="80"
      width="80"
      ariaLabel="comment-loading"
      wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#F4442E"
        />
        </div>
    );
  };
  

  return (
    <>
      <div className="flex flex-col items-center w-screen">
        <div className="flex justify-between  sm:w-11/12 max-w-[1040px] w-11/12 items-center  py-6">
          <div className="flex items-end">
            <img
              src="https://res.cloudinary.com/dbs9akgm5/image/upload/v1684052534/StandardCollection8_t9pcbx.png"
              alt="logo"
            />
            <b className="text-2xl ml-2">Insta Share</b>
          </div>
          <div className="inline text-2xl sm:hidden">
            <BiMenuAltRight onClick={handelmenu} />
          </div>
          <div className="sm:flex  gap-4 items-center hidden ">
            <div className="flex">
              <input
                className="rounded-l px-3 w-3/4 border-gray-300 border-solid border-2"
                type="search"
                placeholder="Search Caption"
                value={seacrhInput}
                onChange={(e) => setSeacrhInput(e.target.value)}
              />
              <button
                type="button"
                className="bg-gray-300 w-6 p-1"
                onClick={getSearch}
              >
                <BiSearchAlt className="text-gray-700" />
              </button>
            </div>
            <h2
              onClick={handleHomeClick}
              style={{ color: isActive ? "black" : "blue", cursor: "pointer" }}
            >
              Home
            </h2>
            <h2
              onClick={handleProfileClick}
              style={{ color: isActive ? "blue" : "black", cursor: "pointer" }}
            >
              Profile
            </h2>
            <button
              className="rounded-md bg-blue-500 text-white text-centera py-1 px-4"
              type="button"
              onClick={logingOut}
            >
              Logout
            </button>
          </div>
        </div>
        {showmenu && (
          <div className="sm:hidden pb-7 gap-4 items-center justify-between w-11/12  flex ">
            <h2
              onClick={handleHomeClick}
              style={{ color: isActive ? "black" : "blue", cursor: "pointer" }}
            >
              Home
            </h2>
            <h2 onClick={showsearchrender}>Search</h2>
            <h2
              onClick={handleProfileClick}
              style={{ color: isActive ? "blue" : "black", cursor: "pointer" }}
            >
              Profile
            </h2>
            <button
              className="rounded-md bg-blue-500 text-white text-centera py-1 px-4"
              type="button"
              onClick={logingOut}
            >
              Logout
            </button>
            <AiOutlineClose onClick={() => setIsActive(false)} />
          </div>
        )}
        {showsearch && (
          <div className="flex">
            <input
              className="rounded-l px-3 w-3/4 border-gray-300 border-solid border-2"
              type="search"
              placeholder="Search Caption"
              value={seacrhInput}
              onChange={(e) => setSeacrhInput(e.target.value)}
            />
            <button
              type="button"
              className="bg-gray-300 w-6 p-1"
              onClick={getSearch}
            >
              <BiSearchAlt className="text-gray-700" />
            </button>
          </div>
        )}
      </div>

      <hr className="border-1 border-solid border-gray-500" />


      {isloading? <Loader/> :isActive ? (
        <Profile />
      ) : searchresult ? (
        <SearchResults setPost={renderPost} />
      ) : (
        <Status />
      )}
    </>
  );
};
