import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-[30px]">Đặt hàng thành công</h1>
      <button className="px-2 py-1 bg-primary" onClick={() => navigate("/")}>
        Quay về trang chủ
      </button>
    </div>
  );
};

export default PaymentSuccess;
