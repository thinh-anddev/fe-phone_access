import { useEffect, useState, useContext } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import getAllContacts from "../Contact/api/getAllContact";
import { deleteContact } from "../Contact/api/deleteContact";

interface Contact {
    id: number;
    fullName: string;
    email: string;
    content: string;
    createdAt: string;
}

const ContactManagePage = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const toast = useContext(ToastContext);

    const fetchContacts = async () => {
        const response = await getAllContacts(sortOrder);
        if (response.success) {
            setContacts(response.data);
        } else {
            toast.showToast(response.message);
        }
    };

    const handleDeleteContact = async (id: number) => {
        const response = await deleteContact(id);
        if (response.success && response.message === "ok") {
            toast.showToast("Xóa liên hệ thành công");
            fetchContacts();
        } else {
            toast.showToast("Xóa liên hệ thất bại");
        }
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortOrder = e.target.value as "asc" | "desc";
        setSortOrder(newSortOrder);
    };

    const handleViewDetails = (contact: Contact) => {
        setSelectedContact(contact);
    };

    const handleCloseModal = () => {
        setSelectedContact(null);
    };

    useEffect(() => {
        fetchContacts();
    }, [sortOrder]);

    return (
        <div className="flex flex-col w-full gap-2 p-1 rounded shadow-sm">
            <div className="flex justify-between items-center">
                <div className="text-[25px]">Quản lý liên hệ</div>
                <div>
                    <label htmlFor="sortOrder" className="mr-2">Sắp xếp theo:</label>
                    <select
                        id="sortOrder"
                        value={sortOrder}
                        onChange={handleSortChange}
                        className="border border-gray-300 rounded-md p-1"
                    >
                        <option value="desc">Mới nhất</option>
                        <option value="asc">Muộn nhất</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="grid grid-cols-12 pb-2 border-b border-black text-nowrap text-stroke">
                    <div className="col-span-1">ID</div>
                    <div className="col-span-3">Họ tên</div>
                    <div className="col-span-3">Email</div>
                    <div className="col-span-3">Thời gian tạo</div>
                    <div className="col-span-2 text-center"></div>
                </div>

                {contacts.map((contact) => (
                    <div
                        key={contact.id}
                        className="grid items-center grid-cols-12 py-2 border-b border-stroke text-stroke"
                    >
                        <div className="col-span-1">#{contact.id}</div>
                        <div className="col-span-3">{contact.fullName}</div>
                        <div className="col-span-3">{contact.email}</div>
                        <div className="col-span-3">{new Date(contact.createdAt).toLocaleString()}</div>
                        <div className="flex items-center justify-center gap-3 col-span-2 text-xl">
                            <FaEye
                                className="cursor-pointer hover:text-primary"
                                title="Xem chi tiết"
                                onClick={() => handleViewDetails(contact)}
                            />
                            <RiDeleteBin5Line
                                className="cursor-pointer hover:text-red-500"
                                title="Xóa liên hệ"
                                onClick={() => handleDeleteContact(contact.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {selectedContact && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">Chi tiết phản hồi</h2>
                        <div className="space-y-2">
                            <p><strong>ID:</strong> #{selectedContact.id}</p>
                            <p><strong>Họ tên:</strong> {selectedContact.fullName}</p>
                            <p><strong>Email:</strong> {selectedContact.email}</p>
                            <p><strong>Nội dung:</strong> {selectedContact.content}</p>
                            <p><strong>Thời gian tạo:</strong> {new Date(selectedContact.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactManagePage;