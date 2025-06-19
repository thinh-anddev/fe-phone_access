import { ShippingLabel, ShippingStatus } from "@/utils/enum";
import {useTranslation} from "react-i18next";

interface ShippingStatusProps {
  status: ShippingStatus;
}
const ShippingStatusComp: React.FC<ShippingStatusProps> = (props) => {
  const { status } = props;
  const { t } = useTranslation();
  return (
    <div className="w-1/2 mx-auto">
      {status === ShippingStatus.PENDING && (
        <p className="p-1 mx-auto bg-yellow-500 w-fit rounded-2xl">
          {t(ShippingLabel.PENDING)}
        </p>
      )}
      {status === ShippingStatus.PROCESSING && (
        <p className="p-1 mx-auto bg-blue-500 w-fit rounded-2xl">
          {t(ShippingLabel.PROCESSING)}
        </p>
      )}
      {status === ShippingStatus.CONFIRMED && (
        <p className="p-1 mx-auto bg-green-500 w-fit rounded-2xl">
          {t(ShippingLabel.CONFIRMED)}
        </p>
      )}
      {status === ShippingStatus.DELIVERY && (
        <p className="p-1 mx-auto bg-purple-400 w-fit rounded-2xl">
          {t(ShippingLabel.DELIVERY)}
        </p>
      )}
      {status === ShippingStatus.DELAYED && (
        <p className="p-1 mx-auto bg-red-500 w-fit rounded-2xl">
          {t(ShippingLabel.DELAYED)}
        </p>
      )}
      {status === ShippingStatus.RETURNED && (
        <p className="p-1 mx-auto bg-gray-500 w-fit rounded-2xl">
          {t(ShippingLabel.RETURNED)}
        </p>
      )}
      {status === ShippingStatus.CANCELLED && (
        <p className="p-1 mx-auto bg-gray-700 w-fit rounded-2xl">
          {t(ShippingLabel.CANCELLED)}
        </p>
      )}
      {status === ShippingStatus.FAIL && (
        <p className="p-1 mx-auto bg-red-950 w-fit rounded-2xl">
          {t(ShippingLabel.FAIL)}
        </p>
      )}
      {status === ShippingStatus.SUCCESS && (
        <p className="p-1 mx-auto bg-green-700 w-fit rounded-2xl text-sm font-medium">
          {t(ShippingLabel.SUCCESS)}
        </p>
      )}
    </div>
  );
};
export default ShippingStatusComp;
