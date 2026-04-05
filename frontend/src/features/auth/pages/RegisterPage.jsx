import { useState, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "../auth.context.jsx";

const RegisterPage = () => {
  const navigate = useNavigate();

  const {handleRegister} = useAuth();
  const context = useContext(AuthContext);

  const {loading} = context;

  const [newUser, setNewUser] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const handleSubmit = async(e) => {
    e.preventDefault();

    const {fullname, email, password} = newUser;
    const data = await handleRegister({fullname, email, password});

    if(data.success) {
      toast.success(data.message);
      navigate("/dashboard");
    } else {
      toast.error(data.error);
    }
  }

  return (
    <>
      <div className="h-screen w-full flex">
        {loading && (
          <div className="flex gap-3 items-center justify-center absolute top-1/2 left-[40%] -translate-[50%] z-[4]">
            <p className="text-xl font-semibold text-sky-600">Creating Account</p>
            <ThreeDots
              visible={true}
              height="30"
              width="50"
              color="blue"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        <div className="flex flex-col w-[50%] bg-sky-200 px-20 py-20 justify-between items-center">
          <div className="flex flex-col gap-10 h-1/2">
            <div className="flex flex-col">
              <h1 className="text-8xl text-sky-800">FileNest</h1>
              <span className="w-70 h-1 bg-cyan-800 rounded-full"></span>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-semibold text-sky-900">
                All your files, one secure home.
              </h1>
              <p className="text-sky-900">
                Awesome, we've created the perfect place for you to store all your documents.
              </p>
            </div>
          </div>
          <div className="w-90 h-90">
            <img className="object-cover" src="/file-pic.png" alt="" />
          </div>
        </div>
        <div className="flex flex-col px-20 py-40 w-[50%] bg-zinc-200">
          <div className="flex flex-col gap-8">
            <h1 className="text-3xl text-gray-800 font-semibold">Create Account</h1>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-gray-800">Full Name</label>
                <input value={newUser.fullname} name="fullname" onChange={(e) => setNewUser({...newUser, [e.target.name]: e.target.value})} type="text" placeholder="Enter your full name" required className="bg-gray-300 text-gray-500 outline-none rounded-md py-2 px-4 w-2/3" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-800">Email Address</label>
                <input type="email" name="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, [e.target.name]: e.target.value})} placeholder="Enter your email address" required className="bg-gray-300 text-gray-500 outline-none rounded-md py-2 px-4 w-2/3" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-800">Password</label>
                <input value={newUser.password} name="password" onChange={(e) => setNewUser({...newUser, [e.target.name]: e.target.value})} type="password" placeholder="Enter password" required className="bg-gray-300 text-gray-500 outline-none rounded-md py-2 px-4 w-2/3" />
              </div>
              <button type="submit" className="w-2/3 mt-5 px-5 py-2 rounded-full bg-blue-600 text-white cursor-pointer hover:bg-blue-700 active:scale-[95%] duration-250 ease-in-out">Create Account</button>
              <p className="text-sm">Already have an account? <span className="text-blue-600 cursor-pointer"><Link to="/">Log In</Link></span></p>
            </form>
            <ToastContainer position="top-left" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;