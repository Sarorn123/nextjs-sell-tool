import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { getAllusers } from "../../../api_service/admin/user";
import { AiOutlineClose } from "react-icons/ai";

interface User {
  full_name: string;
  email: string;
  id: number;
}

type Props = {
  setValue: any;
  placeholder: string;
};

export default function AutoCompleteUser({ setValue, placeholder }: Props) {
  const [options, setOptions] = useState<readonly User[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState("");

  const getOptions = async (params: any) => {
    setLoading(true);
    const res = await getAllusers(params);
    setOptions(res.data);
    setLoading(false);
  };

  useEffect(() => {
    const params = { fullname };
    getOptions(params);
  }, [fullname]);

  return (
    <>
      <div className="relative">
        <div className="flex items-center mt-2">
          <input
            type="text"
            className="placeholder:text-gray-500 dark:placeholder:text-white border bg-transparent   px-4 py-2 rounded-lg w-full transition-all text-gray-500 outline-none dark:text-white dark:bg-gray-800"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
          />
          <AiOutlineClose
            className="-ml-8 text-gray-500 dark:text-white text-lg hover:text-red-500"
            onClick={() => {
              setValue("");
              setFullname("");
              setOpen(false);
            }}
          />
        </div>

        {open && (
          <div className="absolute top-12 left-0 w-full rounded-lg overflow-auto bg-white z-50 dark:bg-gray-800 border ">
            {options.length === 0 && !loading && (
              <p className="p-2 border-b-2">No Data</p>
            )}
            {loading && <p className="p-2 border-b-2">Loading ...</p>}
            {options.map((user: User) => (
              <p
                className="py-2 px-4 border-b-2 cursor-pointer hover:bg-slate-200 dark:text-white dark:hover:bg-slate-600"
                key={user.id}
                onClick={() => {
                  setValue(user.id);
                  setFullname(user.full_name);
                  setOpen(false);
                }}
              >
                {user.full_name}
                <br />
                <span className="text-gray-500 dark:text-white">{user.email}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}