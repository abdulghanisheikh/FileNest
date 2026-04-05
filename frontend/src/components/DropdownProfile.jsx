import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const DropdownProfile = () => {
  const [open, setOpen] = useState(false);

  const userLS = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const username = userLS.fullname;
  const email = userLS.email;

  const navigate = useNavigate();

  const [profile, setProfile] = useState("");
  const profileImageInputFieldRef = useRef();

  let baseUrl;
  if(import.meta.env.VITE_ENVIRONMENT === "development") {
    baseUrl = "http://localhost:3000"
  } else {
    baseUrl = import.meta.env.VITE_BASE_URL;
  }

  async function handleLogout() {
    try {
      const res = await axios.post(
        `${baseUrl}/auth/logout`,
        {},
        {
          withCredentials: true, //to send httpOnly cookie to backend
        },
      );
      const { success, message } = res.data;
      if (success) {
        toast.success(message);
        localStorage.removeItem("loggedInUser");
        setTimeout(() => {
          navigate("/login-page");
        }, 2000);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  }

  async function handleAccountDelete() {
    try {
      const res = await axios.delete(`${baseUrl}/user/deleteAccount`, {
        withCredentials: true,
      });
      const { success, message } = res.data;
      if (success) {
        localStorage.clear();
        toast.success(message);
        setTimeout(() => {
          navigate("/signup-page");
        }, 2000);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  const handleUserProfile = async() => {
    const file = profileImageInputFieldRef.current.files[0];

    if(!file) return;

    const formData = new FormData();
    formData.append("profile", file);

    const {data} = await axios.post(`${baseUrl}/user/uploadProfile`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    if(data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  }

  const getUserProfile = async() => {
    const {data} = await axios.get(`${baseUrl}/user/getProfile`, {
      withCredentials: true
    });

    const {success, profileUrl} = data;

    if(success) {
      setProfile(profileUrl);
    }
  }

  const handleProfileRemove = async() => {
    const {data} = await axios.delete(`${baseUrl}/user/removeProfile`, {
      withCredentials: true
    });

    if(data.success) {
      setProfile("");
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="relative flex flex-col gap-1 rounded-md z-[2]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="px-5 py-1 rounded-md shadow-sm hover:scale-103 duration-300 ease-in-out shadow-black/30 cursor-pointer bg-white active:scale-95"
      >
        👋 {username}
      </button>

      {open && (
        <div className="absolute top-10 right-10 h-90 w-90 flex flex-col gap-1 justify-between p-5 text-black bg-white rounded-md shadow-sm shadow-black/20 text-center font-semibold">
          <div
            onClick={() => setOpen(!open)}
            className="absolute hover:bg-red-500 hover:text-white duration-300 ease-in-out rounded-full top-5 right-5 cursor-pointer text-red-500"
          >
            <IoMdCloseCircleOutline size={22} />
          </div>

          <div className="flex flex-col items-center">
            <input type="file" name="profile" onChange={handleUserProfile} hidden ref={profileImageInputFieldRef} />
            <p className="text-xs text-black/60 mb-5">{email}</p>

            <img src={
              profile === "" ? "https://ik.imagekit.io/AbdulGhani/filenest/default_profile.jpg?updatedAt=1775324017230" : profile
            } className="h-25 w-25 rounded-full p-2 object-cover" alt="" />

            {profile ?
            (<p className="text-xs cursor-pointer py-0.5 px-3 bg-red-500 text-white rounded-lg" onClick={handleProfileRemove}>Remove profile</p>) :
            (<p className="text-xs cursor-pointer py-0.5 px-3 bg-blue-500 text-white rounded-lg" onClick={() => profileImageInputFieldRef.current.click()}>Select profile</p>)}
          </div>

          <div className="flex flex-col gap-2">
            <div
              className="text-red-500 px-5 py-1 rounded-md shadow-md shadow-black/10 text-sm cursor-pointer hover:bg-red-500 border-2 border-red-400 active:scale-[95%] hover:border-0 hover:text-white duration-300 ease-in-out"
              onClick={handleLogout}
            >
              <p>Log Out</p>
            </div>

            <div
              onClick={handleAccountDelete}
              className="text-red-500 shadow-md shadow-black/10 px-5 py-1 rounded-md text-sm cursor-pointer border-2 border-red-400 active:scale-[95%] hover:border-0 hover:bg-red-500 hover:text-white duration-300 ease-in-out"
            >
              <p>Delete Account</p>
            </div>

          </div>
          <ToastContainer position="top-left" />
        </div>
      )}
    </div>
  );
};

export default DropdownProfile;
