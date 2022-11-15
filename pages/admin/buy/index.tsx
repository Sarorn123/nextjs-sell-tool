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
import { getBuys } from "../../../api_service/admin/buy/index";
import { setBuy, getBuyData } from "../../../redux/slice/admin/buySlice";

function index(): ReactElement {
  const dispatch = useDispatch();
  const [params, setParams] = useState({});
  const [filter, setFilter] = useState(false);
  useEffect(() => {
    clientSideAuth(dispatch);
  }, []);

  const changePage = (pageNumber: number) => {
    setParams({ ...params, pageNumber });
  };

  const handleFilter = (
    user_id: string,
    product_id: string,
    start_date: string,
    end_date: string
  ) => {
    setParams({
      ...params, 
      user_id, 
      product_id, 
      start_date, 
      end_date 
    });
  };

  const getBuy = async () => {
    const response = await getBuys(params);
    dispatch(setBuy(response));
  };

  useEffect(() => {
    getBuy();
  }, [params]);

  const { buy } = getBuyData();

  return (
    <>
      <Filter
        open={filter}
        setOpen={setFilter}
        handleFilterBuy={handleFilter}
      />
      <div className="bg-white dark:bg-gray-800 p-4 h-full overflow-auto rounded-lg pb-10 container mx-auto">
        <div className="md:flex items-center justify-between">
          <div className="flex items-center ">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              exit={{ opacity: 1 }}
              className="flex items-center  mr-2 lg:mr-4"
            >
              <Button action={() => {}} text="Export As Excel" />
            </m.div>
          </div>
          <div className="flex items-center mt-4">
            <BsFilter
              className="text-gray-500 text-2xl dark:text-white ml-2 cursor-pointer"
              onClick={() => setFilter((pre: any) => !pre)}
            />
          </div>
        </div>
        <m.div
          initial={{ opacity: 0, y: "2rem" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          exit={{ opacity: 1, y: 0 }}
        >
          <Table />
          <Pagination pagination={buy?.paginate} changePage={changePage} />
        </m.div>
      </div>
    </>
  );
}

export default index;
