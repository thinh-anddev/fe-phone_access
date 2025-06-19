import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendNewPassWord } from "./api/sendNewPassword";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { Button } from "@chakra-ui/react";
import { resetPassword } from "./api/resetPassword";
import { useTranslation } from "react-i18next";

const ForgotPassPage = () => {
  const [isValidForgotPass, setIsValidForgotPass] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const [phase, setPhase] = useState(1);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { t } = useTranslation();

  const handleSendNewPassword = async () => {
    setIsLoading(true);
    const res = await sendNewPassWord(email);
    if (res.success) {
      showToast(t("otpSent"));
      setPhase(2);
    } else {
      showToast(res.message);
    }

    setIsLoading(false);
  };

  const handleResetPassWord = async () => {
    setIsLoading(true);
    const res = await resetPassword(email, code, newPassword);
    showToast(res.message);
    setIsLoading(false);
    navigate("/user");
  };

  useEffect(() => {
    if (email != "") setIsValidForgotPass(true);
    else setIsValidForgotPass(false);
  }, [email]);
  return (
    <div className="my-4 w-[600px] max-w-[90%] border border-line mx-auto rounded">
      <div className="relative">
        <p
          onClick={() => {
            navigate("/user");
          }}
          className="cursor-pointer absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 hover:text-blue-400 underline"
        >
          {t("back")}
        </p>
        <p className="text-center p-2 border-b-2 border-primary text-primary">
          {t("forgot_pass")}
        </p>
      </div>
      <div className="flex flex-col gap-y-3 p-3">
        {phase == 1 && (
          <>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border border-line rounded p-2"
              type="text"
              placeholder={t("enterEmail")}
            />
            <Button
              isLoading={isLoading}
              onClick={handleSendNewPassword}
              disabled={!isValidForgotPass}
              className={`p-2 bg-primary rounded hover:brightness-110 text-white ${
                !isValidForgotPass && "!bg-gray-400"
              }`}
            >
              {t("send")}
            </Button>
          </>
        )}
        {phase == 2 && (
          <>
            <div className="flex flex-col gap-y-2">
              <input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                className="border border-line rounded p-2"
                type="text"
                placeholder="OTP (*)"
              />
              <input
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                className="border border-line rounded p-2"
                type="password"
                placeholder={t("enterNewPass")}
              />
            </div>
            <Button
              isLoading={isLoading}
              onClick={handleResetPassWord}
              disabled={!isValidForgotPass}
              className={`p-2 bg-primary rounded hover:brightness-110 text-white ${
                !isValidForgotPass && "!bg-gray-400"
              }`}
            >
              {t("send")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassPage;
