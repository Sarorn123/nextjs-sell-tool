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

const Dropbox = ({ closeDropBox }: Props) => {
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
      className="w-[10rem] h-[8rem] absolute top-10 right-10 rounded-lg p-4 bg-gradient-to-t from-slate-300 to-cyan-500"
      onClick={closeDropBox}
    >
      <Link href={"/user/"+user?.id}>
        <div className=" px-2 py-1 rounded-lg  text-white flex items-center cursor-pointer border   mt-2 hover:bg-cyan-500 ">
          <AiOutlineUser />
          <h1 className="ml-2 ">Your Profile</h1>
        </div>
      </Link>

      <div className=" px-2 py-1 rounded-lg  text-white flex items-center cursor-pointer border 0 mt-2 hover:bg-cyan-500 " onClick={signOut}>
        <BiLogOutCircle />
        <h1 className="ml-2 ">Log Out</h1>
      </div>
    </div>
  );
};

export default Dropbox;
