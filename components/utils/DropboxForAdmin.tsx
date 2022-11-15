import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logOut } from "../../api_service/auth";
import { useAppSelector } from '../../redux/hook';
import { getAuthData, setAuth } from '../../redux/slice/authSlice';

interface Props {
  closeDropBox: any;
}

const DropboxForAdmin = ({ closeDropBox }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {user} = useAppSelector(getAuthData);

  const signOut = async () => {
    const response = await logOut();
    if(response.status === 201){
      dispatch(setAuth(null));
      router.push("/");
    }
  }

  return (
    <div
      className="z-40 w-[10rem] h-[8rem] absolute top-10 right-10 rounded-lg p-4 bg-gradient-to-t from-slate-300 to-cyan-500"
      onClick={closeDropBox}
    >
        <div className=" px-2 py-1 rounded-lg  text-white flex items-center cursor-pointer border   mt-2 hover:bg-cyan-500 " onClick={() => {
          router.push("/admin/user/detail/"+user.id);
          closeDropBox((pre:any) => !pre)
        }}>
          <AiOutlineUser />
          <h1 className="ml-2 ">Your Profile</h1>
        </div>

      <div className=" px-2 py-1 rounded-lg  text-white flex items-center cursor-pointer border 0 mt-2 hover:bg-cyan-500 " onClick={signOut}>
        <BiLogOutCircle />
        <h1 className="ml-2 ">Log Out</h1>
      </div>
    </div>
  );
};

export default DropboxForAdmin;
