import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../hooks/ToastMessage/ToastContext";
import { regitser } from "./api/register";
import { Button } from "@chakra-ui/react";
import { verify } from "./api/verify";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "@/hooks/LoginStatus/LoginContext";
import { useTranslation } from "react-i18next";

const Register = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isValidRegister, setIsValidRegister] = useState(false);
    const { showToast } = useContext(ToastContext);
    const { setUser } = useContext(LoginContext);
    const [showPopupVerify, setShowPopupVerify] = useState(false);
    const [isLoadingVerify, setIsLoadingVerify] = useState(false);
    const [isLoadingRegister, setIsLoadingRegister] = useState(false);
    const navigator = useNavigate();
    const { t } = useTranslation();

    const handleRegister = async () => {
        if (confirmPassword !== password) {
            showToast(t("register.passwordMismatch"));
            return;
        }
        setIsLoadingRegister(true);
        const res = await regitser(userName, email);
        if (res.status === "ok") {
            setShowPopupVerify(true);
        } else {
            showToast(res.message);
        }
        setIsLoadingRegister(false);
    };

    const PopupVerify = () => {
        const [code, setCode] = useState("");
        const handleVerify = async () => {
            setIsLoadingVerify(true);
            const res = await verify(code, userName, email, password);
            if (res.status === "ok") {
                setUser(res.user);
                navigator("/");
                setIsLoadingVerify(false);
            } else {
                showToast(t("register.invalidVerifyCode"));
            }
        };

        return (
            <div>
                <div className="w-screen h-screen bg-black/30 fixed z-[1] top-0 left-0"></div>
                <div className="flex bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded p-4 justify-center flex-col gap-y-4 z-[2]">
                    <p className="text-[40px]">{t("register.verifyCodeTitle")}</p>
                    <input
                        className="border rounded"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        type="text"
                    />
                    <Button onClick={handleVerify} isLoading={isLoadingVerify}>
                        {t("register.verifyBtn")}
                    </Button>
                </div>
            </div>
        );
    };

    useEffect(() => {
        setIsValidRegister(userName && email && password && confirmPassword ? true : false);
    }, [userName, email, password, confirmPassword]);

    return (
        <div className="flex flex-col gap-y-3">
            {showPopupVerify && <PopupVerify />}
            <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border border-line rounded p-2"
                type="text"
                placeholder={t("fullName")}
            />
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-line rounded p-2"
                type="text"
                placeholder="Email (*)"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-line rounded p-2"
                type="password"
                placeholder={t("password")}
            />
            <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-line rounded p-2"
                type="password"
                placeholder={t("confirmPassword")}
            />
            <Button
                isLoading={isLoadingRegister}
                onClick={handleRegister}
                disabled={!isValidRegister}
                className={`p-2 bg-primary rounded hover:brightness-110 text-white ${
                    !isValidRegister && "!bg-gray-400"
                }`}
            >
                {t("register")}
            </Button>
        </div>
    );
};

export default Register;
