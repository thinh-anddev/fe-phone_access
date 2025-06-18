import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import addContact from "./api/addContact";

const ContactPage: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        content: "",
    });
    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        content: "",
    });

    const validateFullName = (value: string) => {
        if (!value.trim()) {
            return "Họ tên không được để trống";
        }
        if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(value)) {
            return "Họ tên chỉ được chứa chữ cái và khoảng trắng";
        }
        return "";
    };

    const validateEmail = (value: string) => {
        if (!value.trim()) {
            return "Email không được để trống";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Email không đúng định dạng";
        }
        return "";
    };

    const validateContent = (value: string) => {
        if (!value.trim()) {
            return "Nội dung không được để trống";
        }
        return "";
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let error = "";
        if (name === "fullName") {
            error = validateFullName(value);
        } else if (name === "email") {
            error = validateEmail(value);
        } else if (name === "content") {
            error = validateContent(value);
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const fullNameError = validateFullName(formData.fullName);
        const emailError = validateEmail(formData.email);
        const contentError = validateContent(formData.content);

        setErrors({
            fullName: fullNameError,
            email: emailError,
            content: contentError,
        });

        if (!fullNameError && !emailError && !contentError) {
            const result = await addContact(formData);
            console.log(result);

            // if(result.status == )
            alert(result.message);
            setFormData({ fullName: "", email: "", content: "" });
            setErrors({ fullName: "", email: "", content: "" });
        }
    };

    return (
        <div className="max-w mr-20 ml-20 px-4 py-12 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
                <div className="space-y-6 mb-12">
                    <div className="flex items-center gap-4 text-gray-700">
                        <svg
                            className="w-6 h-6 bg-tertiary text-primary"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z" />
                            <circle cx={12} cy={10} r={3} />
                        </svg>
                        <p>Trường đại học Nông Lâm TP. HCM</p>
                    </div>
                    <div className="flex items-center gap-4 text-gray-700">
                        <svg
                            className="w-6 h-6 bg-tertiary text-primary"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                        >
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 015.11 2h3a2 2 0 012 1.72 12.1 12.1 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.1 12.1 0 002.81.7A2 2 0 0122 16.92z" />
                        </svg>
                        <p>19006750</p>
                    </div>
                    <div className="flex items-center gap-4 text-gray-700">
                        <svg
                            className="w-6 h-6 bg-tertiary text-primary"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                        >
                            <path d="M4 4h16v16H4z" />
                            <path d="M22 6l-10 7L2 6" />
                        </svg>
                        <p>21130560@st.hcmuaf.edu.vn</p>
                    </div>
                </div>

                <hr className="my-8" />

                <div>
                    <h3 className="font-semibold text-lg mb-6">{t("contact_us")}</h3>
                    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                        <div>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                placeholder={t("full_name")}
                                className={`w-full px-4 py-3 border ${errors.fullName ? "border-red-500" : "border-gray-300"
                                    } rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400`}
                            />
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                placeholder="Email"
                                className={`w-full px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"
                                    } rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                placeholder={t("content")}
                                rows={5}
                                className={`w-full px-4 py-3 border ${errors.content ? "border-red-500" : "border-gray-300"
                                    } rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none`}
                            ></textarea>
                            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-primary hover:bg-purple-800 font-semibold rounded-lg px-8 py-3 transition"
                        >
                            {t("send_contact")}
                        </button>
                    </form>
                </div>
            </div>

            <div className="flex-1 min-h-[450px] rounded-lg overflow-hidden shadow-lg">
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.214594705106!2d106.78918677509009!3d10.871276389283361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOw7RuZyBMw6JtIFRQLiBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1748272383987!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    className="border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactPage;