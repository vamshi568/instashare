import {  useNavigate } from 'react-router-dom';
export  const NotFound=()=> {

  const navigate = useNavigate();
const renderlogin=()=>{
  navigate("/")
}

  return (
    <>
      <main className="grid h-screen place-items-center bg-white ">
        <div className="text-center flex flex-col items-center">
          <img className='sm:h-[300px] h-[175px]' src='https://res.cloudinary.com/dbs9akgm5/image/upload/v1684052535/erroring_1_knusmb.png' alt='404'/>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              onClick={renderlogin}
              className="rounded-md bg-[#4094EF] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#205b9b] focus-visible:outline cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
            
          </div>
        </div>
      </main>
    </>
  );
}
