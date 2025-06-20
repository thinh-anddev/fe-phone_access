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
    const [errors, setErrors] = useState({ userName: "", email: "", password: "", confirmPassword: "" });
    const { showToast } = useContext(ToastContext);
    const { setUser } = useContext(LoginContext);
    const [showPopupVerify, setShowPopupVerify] = useState(false);
    const [isLoadingVerify, setIsLoadingVerify] = useState(false);
    const [isLoadingRegister, setIsLoadingRegister] = useState(false);
    const navigator = useNavigate();
    const { t } = useTranslation();

    // Validation functions
    const validateUserName = (value) => {
        if (!value) {
            return t("full_name_required");
        }
        if (value.length < 2) {
            return t("fullNameTooShort");
        }
        return "";
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value) {
            return t("email_required");
        }
        if (!emailRegex.test(value)) {
            return t("email_invalid");
        }
        return "";
    };

    const validatePassword = (value) => {
        if (!value) {
            return t("passwordRequired");
        }
        if (value.length < 8) {
            return t("passwordTooShort");
        }
        // if (!/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
        //     return t("passwordComplexity");
        // }
        return "";
    };

    const validateConfirmPassword = (value) => {
        if (!value) {
            return t("passwordRequired");
        }
        if (value !== password) {
            return t("passwordMismatch");
        }
        return "";
    };

    const validateForm = () => {
        const userNameError = validateUserName(userName);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(confirmPassword);

        setErrors({
            userName: userNameError,
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError
        });

        return !userNameError && !emailError && !passwordError && !confirmPasswordError;
    };

    const handleRegister = async () => {
        if (!validateForm()) {
            showToast(t("invalidForm"));
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
            <div>
                <input
                    value={userName}
                    onChange={(e) => {
                        setUserName(e.target.value);
                        setErrors({ ...errors, userName: "" });
                    }}
                    onBlur={(e) => {
                        setErrors({ ...errors, userName: validateUserName(e.target.value) });
                    }}
                    className={`border border-line rounded p-2 w-full ${
                        errors.userName && "border-red-500"
                    }`}
                    type="text"
                    placeholder={t("fullName")}
                />
                {errors.userName && (
                    <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
                )}
            </div>
            <div>
                <input
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({ ...errors, email: "" });
                    }}
                    onBlur={(e) => {
                        setErrors({ ...errors, email: validateEmail(e.target.value) });
                    }}
                    className={`border border-line rounded p-2 w-full ${
                        errors.email && "border-red-500"
                    }`}
                    type="text"
                    placeholder="Email (*)"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
            </div>
            <div>
                <input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({ ...errors, password: "" });
                    }}
                    onBlur={(e) => {
                        setErrors({ ...errors, password: validatePassword(e.target.value) });
                    }}
                    className={`border border-line rounded p-2 w-full ${
                        errors.password && "border-red-500"
                    }`}
                    type="password"
                    placeholder={t("password")}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
            </div>
            <div>
                <input
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors({ ...errors, confirmPassword: "" });
                    }}
                    onBlur={(e) => {
                        setErrors({ ...errors, confirmPassword: validateConfirmPassword(e.target.value) });
                    }}
                    className={`border border-line rounded p-2 w-full ${
                        errors.confirmPassword && "border-red-500"
                    }`}
                    type="password"
                    placeholder={t("confirmPassword")}
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
            </div>
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