import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPen, FaSearch } from "react-icons/fa";
import { ChangeEvent, useContext, useState } from "react";
import updateProduct from "../../api/updateProduct";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import addProduct from "../../api/addProduct";
import { submitData } from "@/api/PinFileToIpfs";
import deleteProduct from "../../api/deleteProdct";
import { ProductType } from "@/utils/models.ts";
import { useTranslation } from "react-i18next";

interface ManageDashboardProps {
  subjectName: string;
  prouducts: ProductType[];
  updateList: () => void;
  onSearch: (name: string) => void;
}
interface RowProps {
  item: any;
  setShowEdit: (edit: boolean) => void;
  setEditingProduct: (product: any) => void;
  updateList: () => void;
}

const Row: React.FC<RowProps> = ({
  item,
  setShowEdit,
  setEditingProduct,
  updateList,
}) => {
  const { showToast } = useContext(ToastContext);
  const handleEdit = (item: any) => {
    setShowEdit(true);
    setEditingProduct(item);
  };
  const { t } = useTranslation();

  const handleDelete = async (item: any) => {
    console.log(item.id);


    const res = await deleteProduct(item.id);
    if (res.success) {
      updateList();
    }showToast(t("delete_failed"))
  };

  return (
    <tr className="">
      <td className="px-4 py-2">
        <img src={item?.images?.length > 0 && item?.images[0].url} alt="" />
      </td>
      <td className="px-4">
        <p className="line-clamp-1">{item.name}</p>
      </td>
      <td className="px-4">
        <p>{item.price}</p>
      </td>
      <td className="px-4">
        <p className="line-clamp-2">{item.description}</p>
      </td>
      <td className=" text-center px-4">
        <p>{item.quantity}</p>
      </td>
      <td className=" text-center px-4">
        <p>{item.sold}</p>
      </td>
      <td className="text-center px-4">
        <p>{item.status == 1 ? "Hiện" : "Ẩn"}</p>
      </td>
      <td className="px-4">
        <FaPen
          onClick={() => handleEdit(item)}
          className="cursor-pointer hover:text-primary"
        />
      </td>
      <td className="px-4">
        <RiDeleteBin5Line
          onClick={() => handleDelete(item)}
          className="cursor-pointer hover:text-primary"
        />
      </td>
    </tr>
  );
};

interface FormEditProps {
  item: any;
  hide: () => void;
  updateList: () => void;
}

const FormEdit: React.FC<FormEditProps> = ({ item, hide, updateList }) => {
  const [formData, setFormData] = useState<any>({ ...item });
  const { showToast } = useContext(ToastContext);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]:
        name === "price" ||
          name === "discount" ||
          name === "quantity" ||
          name === "sold" ||
          name === "categoryId" ||
          name === "status"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    updateProduct(formData);
    updateList();
    showToast(t("edit_success"))
    hide();
  };
  const { t } = useTranslation();


  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-2xl mb-4">{t("edit")}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Discount
          </label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {t("sold")}
          </label>
          <input
            type="number"
            name={t("sold")}
            value={formData.sold}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {t("category")} ID
          </label>
          <input
            type="number"
            name="Category ID"
            value={formData.category.id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {t("status")}
          </label>
          <input
            type="number"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={hide}
            className="mr-2 bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  );
};

interface FormAddProps {
  hide: () => void;
}

const FormAdd: React.FC<FormAddProps> = ({ hide }) => {
  const initialFormData: ProductFormData = {
    id: 0,
    name: "",
    description: "",
    price: 0,
    discount: 0,
    quantity: 0,
    sold: 0,
    createAt: new Date().toISOString(),
    images: [],
    categoryId: 0,
    status: 0,
    phoneCategoryIds: [],
  };

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [files, setFiles] = useState<(FileList | null)[]>([null, null, null]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "price" ||
          name === "discount" ||
          name === "quantity" ||
          name === "sold" ||
          name === "categoryId" ||
          name === "status"
          ? Number(value)
          : value,
    }));
  };

  const handleUploadImage = async () => {
    const uploadedLinks: string[] = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i] && files[i][0]) {
        try {
          const link = await submitData(files[i][0], files[i][0].name);
          uploadedLinks.push(link);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    }
    return uploadedLinks;
  };

  const handleSubmit = async () => {
    try {
      const listImg = await handleUploadImage();
      const res = await addProduct(formData, listImg);
      console.log("Product added successfully:", res);
      hide();
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files;
    setFiles(newFiles);
  };
  const { t } = useTranslation();


  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/2 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl mb-4 font-bold">{t("add")}</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {files.map((_, index) => (
              <input
                key={index}
                type="file"
                onChange={(e) => handleChangeImg(e, index)}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("product_name")}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("description")}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("price")}
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("discount")}
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("quantity")}
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("sold")}
            </label>
            <input
              type="number"
              name="sold"
              value={formData.sold}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("category")} ID
            </label>
            <input
              type="number"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("status")}
            </label>
            <input
              type="number"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={hide}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
            >
              {t("cancel")}
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              {t("save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const ManageDashboard: React.FC<ManageDashboardProps> = (props) => {
  const { subjectName, prouducts, updateList, onSearch } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductType | undefined>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { t } = useTranslation();

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div className="flex flex-col w-full gap-2 p-6 m-2 rounded shadow-sm">
      {showEdit && (
        <FormEdit
          item={editingProduct}
          hide={() => setShowEdit(false)}
          updateList={updateList}
        />
      )}
      {showAdd && <FormAdd hide={() => setShowAdd(false)} />}
      <div className="text-[25px]">{t("manage") +" " + subjectName}</div>
      <div className="flex items-center justify-end gap-2">
        {/* <input
          type="search"
          className="px-4 py-2 mx-2 text-base border border-black rounded outline-none h-fit opacity-80"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyPress}
        /> */}
        <div className="relative w-full max-w-xs">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            placeholder={t("search_orders")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyPress}
          />
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="focus:outline-none text-white bg-primary hover:bg-purple-800 font-medium rounded-lg text-base px-4 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-300"
        >
          {t("add")}
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <table>
          <thead>
            <tr>
              <th className="px-4 w-20"></th>
              <th>{t("product_name")}</th>
              <th>{t("price")}</th>
              <th>{t("description")}</th>
              <th>{t("quantity")}</th>
              <th>{t("sold")}</th>
              <th>{t("status")}</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {prouducts.map((item: ProductType) => {
              return (
                <Row
                  key={item.id}
                  item={item}
                  setShowEdit={setShowEdit}
                  setEditingProduct={setEditingProduct}
                  updateList={updateList}
                />
              );
            })}
          </tbody>
        </table>
        <div className="grid grid-cols-12 pb-2 border-b border-black text-nowrap opacity-80">
          <input type="checkbox" className="w-6 col-span-1" />
          <div className="flex col-span-1 gap-2 text-xl"></div>
        </div>
      </div>
    </div>
  );
};
export default ManageDashboard;
