import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { ChangeEvent, useContext, useState } from "react";
import updateProduct from "../../api/updateProduct";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import addProduct from "../../api/addProduct";
import { submitData } from "@/api/PinFileToIpfs";
import deleteProduct from "../../api/deleteProdct";

interface ManageDashboardProps {
  subjectName: string;
  prouducts: any;
  updateList: () => void;
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

  const handleDelete = async (item: any) => {
    console.log(item.id);

    const res = await deleteProduct(item.id);
    if (res.success) {
      updateList();
    } else showToast("Xoá thất bại");
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
    showToast("Product editted successfully");
    hide();
  };

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-2xl mb-4">Edit Product</h2>
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
            Sold
          </label>
          <input
            type="number"
            name="sold"
            value={formData.sold}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category ID
          </label>
          <input
            type="number"
            name="categoryId"
            value={formData.category.id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Status
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
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Save
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
  const initialFormData: any = {
    id: 0, // ID sẽ được tạo tự động
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

  const [formData, setFormData] = useState<any>(initialFormData);
  const [files, setFiles] = useState<any | null[]>([null, null, null]);

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

  const handleUploadImage = async () => {
    const uploadedLinks: string[] = [];
    for (let i = 0; i < files.length; i++) {
      console.log(files[i].FileList[0].file);
      if (files[i]) {
        try {
          const link = await submitData(
            files[i].FileList[0].file,
            files[i].FileList[0].file.name
          );
          uploadedLinks.push(link + "");
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    }
    console.log(uploadedLinks);

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
    console.log(e);

    const newFiles = [...files];
    newFiles[index] = e.target.files;
    console.log(newFiles);
    setFiles(newFiles);
  };

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-2xl mb-4">Add Product</h2>
        <div>
          <input type="file" onChange={(e) => handleChangeImg(e, 0)} />
          <input type="file" onChange={(e) => handleChangeImg(e, 1)} />
          <input type="file" onChange={(e) => handleChangeImg(e, 2)} />
        </div>
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
            Sold
          </label>
          <input
            type="number"
            name="sold"
            value={formData.sold}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category ID
          </label>
          <input
            type="number"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Status
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
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageDashboard: React.FC<ManageDashboardProps> = (props) => {
  const { subjectName, prouducts, updateList } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editingProduct, setEditingProduct] = useState();

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
      <div className="text-[25px]">{"Quản lý " + subjectName}</div>
      <div className="flex items-center justify-end gap-2">
        <input
          type="search"
          className="px-4 py-2 mx-2 text-base border border-black rounded outline-none h-fit opacity-80"
          placeholder="Tìm kiếm..."
        />
        <button
          onClick={() => setShowAdd(true)}
          className="focus:outline-none text-white bg-primary hover:bg-purple-800  font-medium rounded-lg text-base px-4 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-300"
        >
          Thêm
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <table>
          <tr>
            <th className="px-4 w-20"></th>
            <th className="px-4 w-40">Tên</th>
            <th className="px-4 w-10">Giá</th>
            <th className="px-4">Mô tả</th>
            <th className="px-4 w-10">Số lượng</th>
            <th className="px-4 w-10">Đã bán</th>
            <th className="px-4 w-10">Trạng thái</th>
            <th></th>
            <th></th>
          </tr>

          {prouducts.map((item: any, index: number) => {
            return (
              <Row
                key={index}
                item={item}
                setShowEdit={setShowEdit}
                setEditingProduct={setEditingProduct}
                updateList={updateList}
              />
            );
          })}
        </table>
        <div className="grid grid-cols-12 pb-2 border-b border-black text-nowrap opacity-80 ">
          <input type="checkbox" className="w-6 col-span-1" />

          <div className="flex col-span-1 gap-2 text-xl"></div>
        </div>
      </div>
    </div>
  );
};
export default ManageDashboard;
