import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./index.css";
import Cookies from "js-cookie";
import { FcNext, FcPrevious } from "react-icons/fc";
import { AiOutlineHeart,AiOutlineComment } from "react-icons/ai";
import { BsFillArrowThroughHeartFill } from "react-icons/bs";
import { TbShare3 } from "react-icons/tb";
import {  useDispatch } from 'react-redux';
import {  setUserId,setIsLoggedIn} from '../../app/counterslice';
import { Discuss } from "react-loader-spinner";



function Nextarrow(props) {
  const { className, style, onClick } = props;
  return (
    <FcNext
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function Prevarrow(props) {
  const { className, style, onClick } = props;
  return (
    <FcPrevious
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

export const Status = () => {
  const [renderStories, setStories] = useState([]);
  const [renderPosts, setPosts] = useState([]);
  const [like,setlike]=useState([])
  const dispatch = useDispatch();
  const [isloading,setloader]=useState(false)
  const [isClicked, setIsClicked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
const [userprofileimg,setuserimg]=useState(null)
const [username,setusername]=useState(null)


  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <Nextarrow />,
    prevArrow: <Prevarrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    setloader(true)
    async function renderstories() {
      const url = "https://instaserver-c9tt.onrender.com/stories";
      const responce = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ jwtToken: Cookies.get("jwtToken") }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await responce.json();
      setStories(data.users_stories);
      const urlpost = "https://instaserver-c9tt.onrender.com/posts";
      const postresponce = await fetch(urlpost, {
        method: "POST",
        body: JSON.stringify({ jwtToken: Cookies.get("jwtToken") }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const postdata = await postresponce.json();
      setPosts(postdata.posts);
      
      setloader(false)
    }
    renderstories();
  }, [setStories]);

 
  

  const renderuser=(e)=>{
    dispatch(setUserId(e))
    dispatch(setIsLoggedIn(true))
  }

const renderstatus=(url,userid)=>{
  
  setSelectedImage(url);
  setIsClicked(true)
  for (let i of renderPosts){
    if (userid===i.user_id){
      setuserimg(i.profile_pic)
      setusername(i.user_name)
    }
  }
}
const updatedlike=(index)=>{
  const likearray=[...like]
  likearray[index] = false; // Update the value at the clicked index to true
  setlike(likearray);
}

const dislike=(index)=>{
  const likearray=[...like]
  likearray[index] = true; // Update the value at the clicked index to true
  setlike(likearray); 
}


  if (isloading){
    return (
      <div className="flex justify-center items-center h-[80vh] w-screen">
    <Discuss />
      </div>
    )
    
  }

  return (
    <>
    
    {isClicked && (
        <div className="selected-image-overlay flex flex-col p-2" onClick={() => setIsClicked(false)}>
          <div className="flex items-center sm:w-8/12 max-w-[1040px] w-screen gap-3 mt-3 mb-2">
            <img className="rounded-full h-12 w-12" src={userprofileimg} alt='hdsj'/>
            <b className="text-white">{username}</b>
          </div>
          <img src={selectedImage} alt="SelectedImage" className="selected-image" />
        </div>
      )}
      <div className="flex justify-center w-screen ">
        <div className=" py-10 px-8 sm:w-11/12 max-w-[1040px] w-screen">
          <Slider {...settings}>
            {renderStories.map((e) => (
              <div key={e.user_id} className=" text-center p-2">
                <img
                  className="rounded-full w-20 h-20"
                  src={e.story_url}
                  alt={e.user_id}
                  onClick={()=>renderstatus(e.story_url,e.user_id)}
                />
                <p>{e.user_name}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      
      {renderPosts.map((e,index) => (
        
        <div className="flex flex-col items-center w-screen" key={e.post_id}>
          <div className="flex gap-4 py-4 px-6 items-center sm:w-11/12 max-w-[1040px] w-screen border-solid border-b-0 border-2 border-[#DBDBDB] rounded-t-md">
            <div className="image-container">
              <img
                className="h-7 w-7  p-1 "
                src={e.profile_pic}
                alt={e.user_id}
                onClick={() =>
                  renderuser(e.user_id)
                  
                }
              />
            </div>
            <p onClick={() =>
                  renderuser(e.user_id)
                }>{e.user_name}</p>
          </div>
          <img
            className="w-screen max-w-[1040px] sm:w-11/12 sm:h-[710px] h-[400px]"
            src={e.post_details.image_url}
            alt={e.user_id}
          />
          <div className="gap-2 flex flex-col border-2 py-4 px-6 border-[#DBDBDB] mb-8 rounded-b-md border-solid w-screen max-w-[1040px] sm:w-11/12">
            <div className="flex gap-4 mb-3">

            {like[index]?<BsFillArrowThroughHeartFill className="text-2xl" onClick={()=>updatedlike(index)}/>:<AiOutlineHeart className="text-2xl" onClick={()=>dislike(index)}/>}
            <AiOutlineComment className="text-2xl"/>
            <TbShare3 className="text-2xl"/>
            </div>
            <b>{like[index]===true?e.likes_count +1 : e.likes_count}  Likes</b>
            <p>{e.post_details.caption}</p>
            <p><b>{e.comments[0].user_name} </b> {e.comments[0].comment}</p>
            <p><b>{e.comments[1].user_name} </b> {e.comments[1].comment}</p>
            <p className="text-[#989898]">{e.created_at}</p>
          </div>
        </div>
      ))}
    </>
  );
};
