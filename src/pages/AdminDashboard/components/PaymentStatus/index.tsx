import { PaymentStatus } from "@/utils/enum";
import { useTranslation } from "react-i18next";

interface PaymentStatusProps {
  status?: PaymentStatus;
}
const PaymentStatusComp: React.FC<PaymentStatusProps> = (props) => {
  const { status } = props;
  const { t } = useTranslation();
  return (
    <div className="w-1/2 mx-auto">
      {status === PaymentStatus.PAID && (
        <p className="p-1 mx-auto bg-green-500 w-fit rounded-2xl">
          {t('paid')}
        </p>
      )}
      {status === PaymentStatus.UNPAID && (
        <p className="p-1 mx-auto bg-gray-400 w-fit rounded-2xl">
          {t('unpaid')}
        </p>
      )}
    </div>
  );
};
export default PaymentStatusComp;
