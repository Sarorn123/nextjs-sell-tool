import React from "react";
import { MdDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import { RiComputerFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import ProductImage from "../../../images/productImage.svg";
import { useState } from "react";
import Button from "../../../components/utils/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAdminProductState,
  setLoading,
  setProduct,
} from "../../../redux/slice/admin/productSlice";
import { addProduct, getProduct } from "../../../api_service/admin/product";
import { useDispatch } from "react-redux";

type Props = {
  open: boolean;
  setOpen: any;
};

const AddNew = ({ open, setOpen }: Props) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState<File>();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [descriptionKH, setDescriptionKH] = useState("");
  const [descriptionEN, setDescriptionEN] = useState("");

  const { category } = getAdminProductState();

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    setFile(files![0]);
  };

  const hanldeAddNewProduct = async () => {
    if (
      !file ||
      !name ||
      !price ||
      !categoryId ||
      !descriptionEN ||
      !descriptionKH
    ) {
      toast.error("Pleae Input All Field !");
      return;
    }

    const data = {
      image: file,
      name,
      price,
      categoryId: categoryId.toString(),
      description_en: descriptionEN,
      description_kh: descriptionKH,
    };
    const res = await addProduct(data);
    if (res.status === 201) {
      const data = await getProduct({});
      dispatch(setProduct(data));
      toast.success("Add Success");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className={`z-40 transition-all overflow-y-auto overflow-x-hidden duration-300 ease-in-out h-screen fixed top-0 right-0 w-[80%] md:w-[60%] xl:w-[20%] border-l shadow-lg p-4 ${
          !open && "translate-x-full"
        } bg-white dark:bg-slate-800`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-gray-500 dark:text-gray-300 font-semibold text-sm xl:text-md">
            Add New
          </h1>
          <AiOutlineClose
            className="font-bold text-red-500 text-lg hover:scale-125 cursor-pointer transition-all"
            onClick={() => setOpen((pre: any) => !pre)}
          />
        </div>

        {/* <div className="w-10 h-10 mt-4 bg-cyan-500 rounded-lg  overflow-hidden">
        <Image src={ProductImage} />
      </div> */}
        <div className="mt-2">
          <input onChange={handleFileSelected} type="file" />
        </div>

        <input
          type="text"
          placeholder="Name..."
          className=" border bg-transparent mt-2 dark:text-white px-4 py-2 rounded-lg w-full outline-cyan-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Price..."
          className=" border bg-transparent mt-2 dark:text-white px-4 py-2 rounded-lg w-full outline-cyan-500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          className=" border bg-transparent mt-2  px-4 py-2 rounded-lg w-full  transition-all text-gray-500 outline-none dark:dark:text-white dark:bg-gray-800"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="" disabled defaultChecked>Choose A Category</option>
          {category.map((result: any) => (
            <option value={result.id} key={result.id}>
              {result.name}
            </option>
          ))}
        </select>

        <textarea
          cols={10}
          rows={5}
          placeholder="Description KH"
          className=" border bg-transparent mt-2 dark:text-white px-4 py-2 rounded-lg w-full outline-cyan-500"
          value={descriptionKH}
          onChange={(e) => setDescriptionKH(e.target.value)}
        ></textarea>

        <textarea
          cols={10}
          rows={5}
          placeholder="Description EN"
          className=" border bg-transparent mt-2 dark:text-white px-4 py-2 rounded-lg w-full outline-cyan-500"
          value={descriptionEN}
          onChange={(e) => setDescriptionEN(e.target.value)}
        ></textarea>

        <div className="mt-2">
          <Button text="Create" action={hanldeAddNewProduct} />
        </div>
      </div>
    </>
  );
};

export default AddNew;
