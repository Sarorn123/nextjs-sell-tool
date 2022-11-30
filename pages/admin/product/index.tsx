import React, { ReactElement } from "react";
import Button from "../../../components/utils/Button";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { clientSideAuth } from "../../../utils/serversideAuthentication";
import { BsFilter } from "react-icons/bs";
import dynamic from "next/dynamic";
import Pagination from "../../../components/utils/Pagination";
import Filter from "./Filter";
import AddNew from "./addnew";
const Table = dynamic(() => import("./Table"), {
  ssr: false,
});
import { motion as m } from "framer-motion";
import {
  setLoading,
  setProduct,
  getAdminProductState,
  setCategory,
} from "../../../redux/slice/admin/productSlice";
import { getCategory, getProduct } from "../../../api_service/admin/product";

function Index(): ReactElement {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [params, setParams] = useState({});

  const changePage = (pageNumber: number) => {
    setParams({ ...params, pageNumber });
  };

  const dispatch = useDispatch();
  const [filter, setFilter] = useState(false);
  const [addNew, setAddnew] = useState(false);
  useEffect(() => {
    clientSideAuth(dispatch);
  }, []);

  const getAllProduct = async () => {
    dispatch(setLoading(true));
    const data = await getProduct(params);
    dispatch(setProduct(data));
    dispatch(setLoading(false));
  };

  // get category stor in redux
  const getAllCategory = async () => {
    const res = await getCategory();
    dispatch(setCategory(res.data));
  };

  const handleSearchFilter = () => {
    setParams({ ...params, name, categoryId });
  };

  useEffect(() => {
    handleSearchFilter();
  }, [name, categoryId]);

  useEffect(() => {
    getAllProduct();
    getAllCategory();
  }, [params]);

  const { loading, product } = getAdminProductState();
  return (
    <>
      <Filter open={filter} setOpen={setFilter} setCategoryId={setCategoryId} />
      <AddNew open={addNew} setOpen={setAddnew} />
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

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              exit={{ opacity: 1 }}
              className="flex items-center  mr-2 lg:mr-4"
            >
              <Button action={() => setAddnew((pre) => !pre)} text="Add New" />
            </m.div>
          </div>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <BsFilter
              className="text-gray-500 text-2xl dark:text-white ml-2 cursor-pointer"
              onClick={() => setFilter((pre: any) => !pre)}
            />
          </m.div>
        </div>
        {product && (
          <m.div
            initial={{ opacity: 0, y: "2rem" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            exit={{ opacity: 1, y: 0 }}
          >
            <Table />
            <Pagination pagination={product.paginate} changePage={changePage} />
          </m.div>
        )}
      </div>
    </>
  );
}

export default Index;
