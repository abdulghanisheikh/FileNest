import { useState, useRef, useContext, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/useAuth.js";
import { AuthContext } from "../auth.context.jsx";
import { useProfileManager } from "../hooks/useProfileManager.js";
import DeleteConfirmation from "../../file_manager/components/DeleteConfirmation.jsx";
import ToggleMenu from "./ToggleMenu.jsx";

const DropdownProfile = () => {
	const [open, setOpen] = useState(false);
	const [openDoubleCheck, setOpenDoubleCheck] = useState(false);
	const deleteBoxRef = useRef(null);

	const { handleLogout } = useAuth();

	const {
		handleUploadUserProfile,
		handleRemoveProfile,
		handleDeleteAccount
	} = useProfileManager();

	const context = useContext(AuthContext);
	const { user, loading } = context;

	const profileImageInputFieldRef = useRef();
	const dropdownProfileReference = useRef();

	const handleUserProfile = async () => {
		const file = profileImageInputFieldRef.current.files[0];
		if (!file) return;

		await handleUploadUserProfile(file);
	}

	const handleConfirmAccountDelete = async () => {
		await handleDeleteAccount();
	}

	useEffect(() => {
		const clickOutsideDelete = (e) => {
			if (deleteBoxRef.current && !deleteBoxRef.current.contains(e.target)) {
				setOpenDoubleCheck(false);
			}
		}

		const clickOutsideDropdownProfile = (e) => {
			if (dropdownProfileReference.current && !dropdownProfileReference.current.contains(e.target)) {
				setOpen(false);
			}
		}

		// run callbacks on every click anywhere on the webpage
		document.addEventListener("mousedown", clickOutsideDelete);
		document.addEventListener("mousedown", clickOutsideDropdownProfile);

		// remove listener when DropdownProfile component disappears
		return () => {
			document.removeEventListener("mousedown", clickOutsideDelete);
			document.removeEventListener("mousedown", clickOutsideDropdownProfile);
		}
	}, []);

	return (
		<div
		ref={dropdownProfileReference}
		className="relative flex flex-col gap-1 rounded-md z-[2]">

			<div className="flex items-center justify-center gap-1.5">
				<div className="px-5 py-1 rounded-md">
					👋 {user?.username}
				</div>

				<ToggleMenu 
				toggle={() => setOpen(!open)}
				open={open} />
			</div>

			{open && (
				<div
					className="absolute top-13 right-0 h-90 w-90 flex flex-col gap-1 justify-between p-5 text-black bg-white rounded-md shadow-sm shadow-black/20 text-center font-semibold">

					<div className="flex flex-col items-center">
						<input type="file" name="profile" onChange={handleUserProfile} hidden ref={profileImageInputFieldRef} />
						<p className="text-xs text-black/60 mb-5">{user?.email}</p>

						<img src={
							user?.profilePicture === "" ? "https://ik.imagekit.io/AbdulGhani/filenest/default_profile.jpg?updatedAt=1775324017230" : user?.profilePicture
						} className="h-25 w-25 rounded-full p-2 object-cover" alt="" />

						{user?.profilePicture ?
							(<p className="text-xs cursor-pointer py-0.5 px-3 bg-red-500 text-white rounded-lg" onClick={
								async() => await handleRemoveProfile()
							}>{
									loading === "remove profile" ? "Removing..." : "Remove profile"
								}</p>) :
							(<p
								className="text-xs cursor-pointer py-0.5 px-3 bg-blue-500 text-white rounded-lg"
								onClick={() => profileImageInputFieldRef.current.click()}>
								{loading === "profile" ? "Setting profile..." : "Select profile"}
							</p>)
						}
					</div>

					<div className="flex flex-col gap-2">
						<div
							className="text-red-500 px-5 py-1 rounded-md shadow-md shadow-black/10 text-sm cursor-pointer hover:bg-red-500 border-2 border-red-400 active:scale-[95%] hover:border-0 hover:text-white duration-300 ease-in-out"
							onClick={handleLogout}
						>
							<p>{loading === "logout" ? "Logging out..." : "Log Out"}</p>
						</div>

						<div
							onClick={() => setOpenDoubleCheck(true)}
							className="text-red-500 shadow-md shadow-black/10 px-5 py-1 rounded-md text-sm cursor-pointer border-2 border-red-400 active:scale-[95%] hover:border-0 hover:bg-red-500 hover:text-white duration-300 ease-in-out"
						>
							<p>{loading === "delete account" ? "Deleting..." : "Delete Account"}</p>
						</div>

						{openDoubleCheck && (
							<div ref={deleteBoxRef} className="absolute left-1/2 top-50 -translate-1/2 z-[5]">
								<DeleteConfirmation
									isOpen={openDoubleCheck}
									loading={loading}
									onConfirm={() => handleConfirmAccountDelete()}
									onCancel={() => setOpenDoubleCheck(false)}
								/>
							</div>
						)}

					</div>
					<ToastContainer position="top-left" />
				</div>
			)}
		</div>
	);
};

export default DropdownProfile;
