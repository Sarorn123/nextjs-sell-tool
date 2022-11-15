import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../../../components/utils/Button";
import Drawer from "../../../../components/utils/Drawer";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import {
  editProduct,
  getCategory,
  getSingleProduct,
} from "../../../../api_service/admin/product";
import { useDispatch } from "react-redux";
import { clientSideAuth } from "../../../../utils/serversideAuthentication";
import {
  setSingleProduct,
  getAdminProductState,
  setCategory,
} from "../../../../redux/slice/admin/productSlice";
import {motion as m } from "framer-motion"

type Props = {};

function Detail({}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    clientSideAuth(dispatch);
  }, []);

  const getSingle = async () => {
    const id = router.query.id;
    if (!id) {
      router.push("/admin/product");
      return;
    }
    const res = await getSingleProduct(id);
    dispatch(setSingleProduct(res?.data));
    getAllCategory();
  };

  useEffect(() => {
    getSingle();
  }, []);

  const { singleProduct, category } = getAdminProductState();

  const [editMode, setEditMode] = useState(false);

  const [file, setFile] = useState<File>();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [descriptionKH, setDescriptioKH] = useState("");
  const [descriptionEN, setDescriptionEN] = useState("");

  const handleSetEditMode = () => {
    setPrice(singleProduct.price);
    setName(singleProduct.name);
    setCategoryId(singleProduct.categoryId.toString());
    setDescriptioKH(singleProduct.description_kh);
    setDescriptionEN(singleProduct.description_en);

    setEditMode(true);
  };

  // get category stor in redux
  const getAllCategory = async () => {
    const res = await getCategory();
    dispatch(setCategory(res.data));
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    setFile(files![0]);
  };

  const handleEdit = async () => {
    const data = {
      image: file,
      name,
      price,
      categoryId: categoryId.toString(),
      description_en: descriptionEN,
      description_kh: descriptionKH,
    };

    const id = router.query.id;
    const res = await editProduct(data, id);

    if (res?.status === 200) {
      dispatch(setSingleProduct(res.data.data));
      setEditMode(false);
      toast.success("Edit Success 😇");
    } else {
      toast.error("Update Error 😒");
    }
  };

  const customInput = (value: string, onChange: any, placeHolder: string) => {
    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className="border py-1 px-3 rounded-lg dark:bg-transparent dark:text-white outline-none"
      />
    );
  };

  return (
    <>
      <ToastContainer />
      {singleProduct && (
        <m.div 
        
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        exit={{ opacity: 1 }}

        className="container mx-auto bg-white dark:bg-gray-800 h-full pb-10 rounded-lg overflow-auto ">
          <div className="flex justify-end mt-4">
            {editMode ? (
              <div className="flex items-center">
                <div className="mr-2">
                  <Button text="Cancel" action={() => setEditMode(false)} />
                </div>
                <Button text="Save" action={handleEdit} />
              </div>
            ) : (
              <Button text="Edit Mode" action={handleSetEditMode} />
            )}
          </div>

          <div className="md:flex mt-4">
            {editMode ? (
              <input
                type="file"
                className="bg-cyan-500 text-white rounded-lg cursor-pointer"
                onChange={handleFileSelected}
              />
            ) : (
              <img
                src={singleProduct.image_url}
                className="w-full md:h-32 lg:h-40 md:w-32 lg:w-40 object-cover rounded-lg"
              />
            )}
            <div className="ml-0 md:ml-4 lg:ml-8">
              {editMode ? (
                customInput(
                  name,
                  (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
                  "Name..."
                )
              ) : (
                <h1 className="mt-2 text-2xl font-semibold capitalize dark:text-white">
                  {singleProduct.name}
                </h1>
              )}
              <h1 className="mt-2 text-slate-500 dark:text-white">
                តម្លៃ :{" "}
                {editMode
                  ? customInput(
                      price,
                      (e: ChangeEvent<HTMLInputElement>) =>
                        setPrice(e.target.value),
                      "Price..."
                    )
                  : singleProduct.price}{" "}
                ​​រ
              </h1>
              <h1 className="mt-2 text-slate-500 dark:text-white">
                ប្រភេទ :{" "}
                {editMode ? (
                  <select
                    name=""
                    id=""
                    className="border py-1 px-3 rounded-lg dark:bg-transparent outline-none"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    {category.map((catego: any) => (
                      <option
                        value={catego.id}
                        className="dark:bg-gray-800"
                        key={catego.id}
                        defaultChecked={singleProduct.categoryId == catego.id ? true : false}
                      >
                        {catego.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  singleProduct.category.name
                )}
              </h1>
            </div>
          </div>
          <p className="text-slate-500 font-semibold mt-4 dark:text-white">
            Description
          </p>

          <p className="mt-4 text-slate-500 dark:text-white">
            {editMode ? (
              <textarea
                cols={40}
                rows={5}
                className="border dark:bg-transparent p-2 outline-cyan-500 rounded-lg"
                placeholder="Description KH..."
                value={descriptionKH}
                onChange={(e) => setDescriptioKH(e.target.value)}
              ></textarea>
            ) : (
              singleProduct.description_kh
            )}
          </p>

          <p className="mt-4 text-slate-500 dark:text-white">
            {editMode ? (
              <textarea
                cols={40}
                rows={5}
                className="border dark:bg-transparent p-2 outline-cyan-500 rounded-lg"
                placeholder="Description EN..."
                value={descriptionEN}
                onChange={(e) => setDescriptionEN(e.target.value)}
              ></textarea>
            ) : (
              singleProduct.description_en
            )}
          </p>
        </m.div>
      )}
    </>
  );
}

export default Detail;
