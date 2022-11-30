import React, { ReactElement } from "react";
import Button from "../../../components/utils/Button";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { clientSideAuth } from "../../../utils/serversideAuthentication";
import { BsFilter } from "react-icons/bs";
import dynamic from "next/dynamic";
import Pagination from "../../../components/utils/Pagination";
import Filter from "./Filter";
const Table = dynamic(() => import("./Table"), {
  ssr: false,
});
import { motion as m } from "framer-motion";
import { getAllusers } from "../../../api_service/admin/user";
import { getUserState, setUsers } from "../../../redux/slice/admin/userSlice";

function Index(): ReactElement {

  const dispatch = useDispatch();
  const [filter, setFilter] = useState(false);
  const [params, setParams] = useState({});
  const [fullname, setFullname] = useState("");

  const changePage = (pageNumber: number) => {
    setParams({ ...params, pageNumber });
  };

  useEffect(() => {
    clientSideAuth(dispatch);
  }, []);

  useEffect(() => {
    setParams({ ...params, fullname });
  },[fullname]);

  const getUsers = async () => {
    const response = await getAllusers(params);
    dispatch(setUsers(response));
  };

  useEffect(() => {
    getUsers();
  }, [params]);

  const { user } = getUserState();

  return (
    <>
      <Filter open={filter} setOpen={setFilter} />
      <div className="bg-white dark:bg-gray-800 p-4 h-full overflow-auto rounded-lg pb-10 container mx-auto">
        <div className="flex flex-col items-end w-full">
          <p className="text-gray-500 text-sm dark:text-white">
            Login : 100 នាក់
          </p>
        </div>
        <div className="md:flex items-center justify-between">
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            exit={{ opacity: 1 }}
            className="flex items-center "
          >
            <Button action={() => {}} text="Export As Excel" />
          </m.div>
          <m.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.75 }}
            exit={{ opacity: 1, x: 0 }}
            className="flex items-center mt-4"
          >
            <input
              type="text"
              placeholder="Search By Name ..."
              className="border px-4 py-1 rounded-lg outline-none dark:bg-transparent dark:text-white text-gray-500"
              value={fullname}
              onChange={e => setFullname(e.target.value)}
            />
            <BsFilter
              className="text-gray-500 text-2xl dark:text-white ml-2 cursor-pointer"
              onClick={() => setFilter((pre: any) => !pre)}
            />
          </m.div>
        </div>
        <m.div
          initial={{ opacity: 0, y: "2rem" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          exit={{ opacity: 1, y: 0 }}
        >
          {user && (
            <>
              <Table />
              <Pagination pagination={user.paginate} changePage={changePage} />
            </>
          )}
        </m.div>
      </div>
    </>
  );
}

export default Index;
