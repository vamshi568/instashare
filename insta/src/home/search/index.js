import React, { useState } from 'react'
import { AiOutlineHeart,AiOutlineComment } from "react-icons/ai";
import { BsFillArrowThroughHeartFill } from "react-icons/bs";
import { TbShare3 } from "react-icons/tb";


export const SearchResults = (props) => {
    const {setPost}=props
    const [like,setlike]=useState(false)


    if (setPost.length<=0){
        return <div className='w-screen flex justify-center items-center h-screen '>
            <div className='w-11/12 flex flex-col justify-center items-center gap-4'>

            <img className='w-[250px] h-[200px] sm:h-[400px] sm:w-[500px]' src="https://res.cloudinary.com/dbs9akgm5/image/upload/v1684052535/Group_jc9l2b.png" alt='nosearch'/>
            <b className='text-2xl'>Search Not Found</b>
            <p className='text-xl'>Try different keyword or search again</p>
            </div>
        </div>
    }
  return (
    <>
    <div className='sm:flex w-screen hidden justify-center'>

    <b className='mt-12 mb-8 sm:w-11/12 max-w-[1040px] w-screen'>Search Results</b>
    </div>
    {setPost.map((e) => (
        <div className="flex flex-col items-center w-screen">
          <div className="flex gap-4 py-4 px-6 items-center sm:w-11/12 max-w-[1040px] w-screen border-solid border-b-0 border-2 border-[#DBDBDB] rounded-t-md">
            <div className="image-container">
              <img
                className="h-7 w-7  p-1 "
                src={e.profile_pic}
                alt={e.user_id}
                />
            </div>
            <p>{e.user_name}</p>
          </div>
          <img
            className="w-screen max-w-[1040px] sm:w-11/12 h-[610px]"
            src={e.post_details.image_url}
            alt={e.user_id}
            />
          <div className="gap-2 flex flex-col border-2 py-4 px-6 border-[#DBDBDB] mb-8 rounded-b-md border-solid w-screen max-w-[1040px] sm:w-11/12">
            <div className="flex gap-4 mb-3">

            {like?<BsFillArrowThroughHeartFill className="text-2xl" onClick={()=>setlike(false)}/>:<AiOutlineHeart className="text-2xl" onClick={()=>setlike(true)}/>}
            <AiOutlineComment className="text-2xl"/>
            <TbShare3 className="text-2xl"/>
            </div>
            <b>{e.likes_count} Likes</b>
            <p>{e.post_details.caption}</p>
            <p><b>{e.comments[0].user_name} </b> {e.comments[0].comment}</p>
            <p><b>{e.comments[1].user_name} </b> {e.comments[1].comment}</p>
            <p className="text-[#989898]">{e.created_at}</p>
          </div>
        </div>
      ))
    }
    </>
  )
}
