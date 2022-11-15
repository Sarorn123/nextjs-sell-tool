import Link from "next/link";
import React from "react";
import Button from "./Button";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hook";
import { getAuthData, setAuth } from "../../redux/slice/authSlice";
import { editUser } from "../../api_service/auth/index";
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  closeDrawer: any;
};

function EditUserDrawer({ closeDrawer }: Props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const [image, setImage] = useState<File>();
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const { user } = useAppSelector(getAuthData);

  useEffect(() => {
    setFullname(user.full_name);
    setPhone(user.phone_number);
    setGender(user.gender);
    setEmail(user.email);
  }, []);

  const updateUser = async () => {
    if (password && conPassword && password !== conPassword) {
      toast.error("Password and Confirm Password Not Match");
      return;
    }
    setLoading(true);

    const data = {
      image: image,
      full_name: fullname,
      phone_number: phone,
      gender: gender.toString(),
      email: email,
      old_password: oldPassword,
      new_password: password,
    };
    const res = await editUser(user.id, data);
    if (res?.status === 200) {
      dispatch(setAuth(res.data.data));
      toast.success("Update Success");
    } else {
      toast.error("Update Error");
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div
        className="bg-black opacity-50 fixed h-screen w-full top-0 left-0 z-10 overflow-hidden "
        onClick={closeDrawer}
      ></div>
      <div className="container mx-auto text-white overflow-auto  z-40 fixed  rounded-lg p-8 border top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[90%] lg:w-[50%]  h-[50vh] lg:h-[70vh] bg-gradient-to-t from-slate-400 to-cyan-500">
        <div className="">
          <p>ព័តមានផ្ទាល់ខ្លួន</p>

          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files![0]);
            }}
            className="mt-2"
          />

          <input
            type="text"
            placeholder="Full name..."
            className="placeholder:text-white border bg-transparent mt-2 text-white px-4 py-2 rounded-lg w-full"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone..."
            className="placeholder:text-white border bg-transparent mt-2 text-white px-4 py-2 rounded-lg w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <select
            className="placeholder:text-white border bg-transparent mt-2 text-white px-4 py-2 rounded-lg w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="1" className="bg-cyan-500 py-2">
              Male
            </option>
            <option value="2" className="bg-cyan-500 py-2">
              Female
            </option>
          </select>

          <p className="my-4">ព័តមាន Login</p>

          <input
            type="text"
            placeholder="Email..."
            className="placeholder:text-white border bg-transparent mt-2 text-white px-4 py-2 rounded-lg w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Old Password..."
            className="placeholder:text-white border bg-transparent mt-2 text-white px-4 py-2 rounded-lg w-full"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password..."
            className="placeholder:text-white border bg-transparent mt-2 text-white px-4 py-2 rounded-lg w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm New Password..."
            className="placeholder:text-white border bg-transparent mt-2 text-white px-4 py-2 rounded-lg w-full"
            value={conPassword}
            onChange={(e) => setConPassword(e.target.value)}
          />

          <div className="mt-4">
            {!loading ? (
              <Button text="Update" action={updateUser} />
            ) : (
              <Button text="Updating..." action={() => {}} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUserDrawer;
