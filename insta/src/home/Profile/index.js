import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { RiCamera2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { selectuser } from "../../app/counterslice";
import { Discuss } from "react-loader-spinner";


export const Profile = () => {
  const userid = useSelector(selectuser);
  const [isloading,setloader]=useState(false)
  const [isClicked, setIsClicked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userprofileimg,setuserimg]=useState(null)
  const [username,setusername]=useState(null)
  const [myprofile, setprofile] = useState({
    followers_count: 29,
    following_count: 24,
    id: "f611888f-ceb6-432a-a53a-a9d0788f6378",
    posts: [
      {
        id: "1a698dc4-sdf6e83-4ede-998e-638305f7aee6",
        image:
          "https://assets.ccbp.in/frontend/react-js/instagram…ject/posts/instagram-mini-project-post-31-img.png",
      },

      {
        id: "1a698dc4-sdf6e83-4e222de-sdfsdf998e-638305f7aee6",
        image:
          "https://assets.ccbp.in/frontend/react-js/instagram…ject/posts/instagram-mini-project-post-32-img.png",
      },

      {
        id: "1a698dc4-sdf6e83-4ess1222de-sdfsdf998e-638305f7aee6",
        image:
          "https://assets.ccbp.in/frontend/react-js/instagram…ject/posts/instagram-mini-project-post-33-img.png",
      },
    ],

    posts_count: 3,
    profile_pic: "https://assets.ccbp.in/frontend/react-js/male-avatar-img.png",
    stories: [
      {
        id: "5HJ25nUNJ",
        image:
          "https://assets.ccbp.in/frontend/react-js/instagram…/instagram-mini-project-previous-story-34-img.png",
      },

      {
        id: "4pXoYRUDq",
        image:
          "https://assets.ccbp.in/frontend/react-js/instagram…/instagram-mini-project-previous-story-35-img.png",
      },

      {
        id: "B9m0do5mN",
        image:
          "https://assets.ccbp.in/frontend/react-js/instagram…/instagram-mini-project-previous-story-36-img.png",
      },
    ],

    user_bio: "Lead Software Developer and AI-ML expert",
    user_id: "rahul",
    user_name: "Rahul",
  });

  useEffect(() => {
    async function renderstories() {
      setloader(true)
      const url = "https://instaserver-c9tt.onrender.com/myprofile";
      const responce = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ jwtToken: Cookies.get("jwtToken") }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await responce.json();
      setprofile(data.profile);
      
      setloader(false)
    }
    async function renderuser() {
      setloader(true)
      const url = "https://instaserver-c9tt.onrender.com/userprofile";
      const responce = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ jwtToken: Cookies.get("jwtToken"),userId:userid }),
        headers: {
          "Content-Type": "application/json",
        },
        
      });
      const data = await responce.json();
      setprofile(data.user_details);
      
      setloader(false)
    }
    if (userid===null){
      renderstories();

    }else{
      renderuser()
    }  }, [setprofile]);

    if (isloading){
      return (
        <div className="flex justify-center items-center h-[80vh] w-screen">
      <Discuss />
        </div>
      )
      
    }
    const renderstatus=(url)=>{
  
      setSelectedImage(url);
      setIsClicked(true)
          setuserimg(myprofile.profile_pic)
          setusername(myprofile.user_name)
        

      
     
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
      <div className="  w-screen flex items-center flex-col">
      <p className="text-3xl mt-2 sm:hidden inline w-11/12 text-gray-500">{myprofile.user_name}</p>

        <div className=" px-4 flex sm:gap-x-20 gap-x-3 items-center justify-start sm:mt-9 mt-2 max-w-[1040px] sm:w-11/12 w-screen">

          <img
            className="sm:h-44 h-20 rounded-full"
            src={myprofile.profile_pic}
            alt={myprofile.user_id}
            
          />
          <div className="flex flex-col">
            <p className="text-4xl mb-6 sm:inline hidden">{myprofile.user_name}</p>
            <div className="flex gap-4 flex-wrap justify-center  mb-4 text-center">
              <p className="sm:inline flex flex-col"><span className="font-medium">{myprofile.posts_count}</span> posts</p>
              <p className="sm:inline flex flex-col"><span className="font-medium ">{myprofile.followers_count}</span> followers</p>
              <p className="sm:inline flex flex-col"><span className="font-medium">{myprofile.following_count}</span> following</p>
            </div>
            <p className="font-medium mb-2 sm:inline hidden">{myprofile.user_id}</p>
            <p className="font-normal sm:inline hidden">{myprofile.user_bio}</p>
          </div>
        </div>
        <p className="font-medium mb-2 mt-2 sm:hidden inline w-11/12">{myprofile.user_id}</p>
            <p className="font-normal sm:hidden inline w-11/12">{myprofile.user_bio}</p>


        <div className="px-4 flex flex-wrap gap-9 max-w-[1040px] sm:w-11/12 w-screen mt-16">
          {myprofile.stories.map((e) => (
            <div key={e.id}>
              <img
                className="h-20 w-20 border-2 border-solid border-[#DBDBDB] p-1 rounded-full"
                src={e.image}
                alt={e.id}
                onClick={()=>renderstatus(e.image)}
              />
            </div>
          ))}
        </div>
        <hr className="sm:w-11/12 w-screen  border-[#C6C6C8] mt-9 max-w-[1040px]" />
        <div className="px-4 sm:w-11/12 w-screen max-w-[1040px] flex items-start gap-4 mt-9">
          <BsFillPostcardHeartFill className="text-3xl" />
          <p className="text-4xl font-medium">Posts</p>
        </div>
        {myprofile.posts.length > 0 ? (
          <div className="flex flex-wrap sm:w-11/12 w-screen sm:gap-6 pl-2 max-w-[1040px] gap-1 mt-6 mb-11">
            {myprofile.posts.map((e) => (
              <img key={e.id} className=" w-[32%] h-[30%]  sm:h-[31%] sm:w-[31%]" src={e.image} alt={e.id} onClick={()=>renderstatus(e.image)} />
            ))}
          </div>
        ) : (
          <div className="h-[40vh] flex justify-center flex-col items-center gap-4">
            <RiCamera2Fill className="rounded-full border-black border-solid border-2 p-3 text-6xl" />
            <p className="text-2xl ">No Posts Yet</p>
          </div>
        )}
      </div>
    </>
  );
};
