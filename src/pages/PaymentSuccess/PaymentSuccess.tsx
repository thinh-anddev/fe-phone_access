import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center animate-fade-in">
                <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {t("order_successful")}
                </h1>
                <p className="text-gray-600 mb-6">
                    {t("thank_you_for_your_purchase")}
                    <br />
                    {t("order_confirmation_sent")}
                </p>
                <button
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition duration-300"
                    onClick={() => navigate("/")}
                >
                    {t("back_to_home")}
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;