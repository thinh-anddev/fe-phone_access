import { PaymentStatus } from "@/utils/enum";

interface PaymentStatusProps {
  status?: PaymentStatus;
}
const PaymentStatusComp: React.FC<PaymentStatusProps> = (props) => {
  const { status } = props;
  return (
    <div className="w-1/2 mx-auto">
      {status === PaymentStatus.PAID && (
        <p className="p-1 mx-auto bg-green-500 w-fit rounded-2xl">
          Đã thanh toán
        </p>
      )}
      {status === PaymentStatus.UNPAID && (
        <p className="p-1 mx-auto bg-gray-400 w-fit rounded-2xl">
          Chưa thanh toán
        </p>
      )}
    </div>
  );
};
export default PaymentStatusComp;
