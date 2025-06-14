import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div>
            <h1 className="text-[30px]">{t("order_successful")}</h1>
            <button className="px-2 py-1 bg-primary" onClick={() => navigate("/")}>
                {t("back_to_home")}
            </button>
        </div>
    );
};

export default PaymentSuccess;
