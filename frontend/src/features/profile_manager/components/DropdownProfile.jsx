import { useState, useEffect, useRef, useContext } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../auth/hooks/useAuth";
import { useProfileManager } from "../hooks/useProfileManager";
import { ProfileManagerContext } from "../profile_manager.context";
import { AuthContext } from "../../auth/auth.context";

const DropdownProfile = () => {
	const [open, setOpen] = useState(false);

	const {handleLogout} = useAuth();
	const {handleAccountDelete, handleUploadUserProfile, handleGetUserProfile, handleRemoveUserProfile} = useProfileManager();

	const profileContext = useContext(ProfileManagerContext);
	const {profile} = profileContext;

	const context = useContext(AuthContext);
	const {user} = context;

	const profileImageInputFieldRef = useRef();

	const deleteAccount = async() => {
		const data = await handleAccountDelete();

		const {success, message} = data;
		if(success) {
			toast.success(message);
		} else {
			toast.error(message);
		}
	}

	const handleUserProfile = async() => {
		const file = profileImageInputFieldRef.current.files[0];
		if(!file) return;

		const data = await handleUploadUserProfile({file});

		const {success, message} = data;

		if(success) {
			toast.success(message);
		} else {
			toast.error(message);
		}
	}

	useEffect(() => {
		handleGetUserProfile();
	}, []);

	return (
		<div className="relative flex flex-col gap-1 rounded-md z-[2]">
		<button
			type="button"
			onClick={() => setOpen(!open)}
			className="px-5 py-1 rounded-md shadow-sm hover:scale-103 duration-300 ease-in-out shadow-black/30 cursor-pointer bg-white active:scale-95"
		>
			👋 {user?.fullname}
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
				<p className="text-xs text-black/60 mb-5">{user?.email}</p>

				<img src={
				profile === "" ? "https://ik.imagekit.io/AbdulGhani/filenest/default_profile.jpg?updatedAt=1775324017230" : profile
				} className="h-25 w-25 rounded-full p-2 object-cover" alt="" />

				{profile ?
				(<p className="text-xs cursor-pointer py-0.5 px-3 bg-red-500 text-white rounded-lg" onClick={async() => {
					await handleRemoveUserProfile();
				}}>Remove profile</p>) :
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
				onClick={deleteAccount}
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
