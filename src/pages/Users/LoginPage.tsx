import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { LoginContext } from "@/hooks/LoginStatus/LoginContext";
import { login } from "./api/login";
import { useTranslation } from "react-i18next";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isValidLogin, setIsValidLogin] = useState(false);
    const [errors, setErrors] = useState({ userName: "", password: "" });
    const navigate = useNavigate();
    const { showToast } = useContext(ToastContext);
    const { setUser } = useContext(LoginContext);
    const { t } = useTranslation();

    // Validation functions
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

    const validateForm = () => {
        const userNameError = validateEmail(userName);
        const passwordError = validatePassword(password);

        setErrors({
            userName: userNameError,
            password: passwordError
        });

        return !userNameError && !passwordError;
    };

    const handleLogin = async () => {
        if (!validateForm()) {
            showToast(t("invalidForm"));
            return;
        }

        const res = await login(userName, password);
        if (res.success) {
            setUser(res.user);
            if (res.user.role === 1) {
                navigate("/admin_dashboard");
            } else {
                navigate("/");
            }
            showToast(t("success"));
        } else {
            showToast(res.message);
        }
    };

    useEffect(() => {
        setIsValidLogin(userName !== "" && password !== "");
    }, [userName, password]);

    return (
        <div className="flex flex-col gap-y-3">
            <div>
                <input
                    value={userName}
                    onChange={(e) => {
                        setUserName(e.target.value);
                        setErrors({ ...errors, userName: "" }); // Clear error on change
                    }}
                    onBlur={(e) => {
                        setErrors({ ...errors, userName: validateEmail(e.target.value) });
                    }}
                    className={`p-2 border rounded border-line w-full ${
                        errors.userName && "border-red-500"
                    }`}
                    type="text"
                    placeholder={t("enterEmail")}
                />
                {errors.userName && (
                    <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
                )}
            </div>
            <div>
                <input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({ ...errors, password: "" }); // Clear error on change
                    }}
                    onBlur={(e) => {
                        setErrors({ ...errors, password: validatePassword(e.target.value) });
                    }}
                    className={`p-2 border rounded border-line w-full ${
                        errors.password && "border-red-500"
                    }`}
                    type="password"
                    placeholder={t("password")}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
            </div>
            <button
                disabled={!isValidLogin}
                onClick={handleLogin}
                className={`p-2 bg-primary rounded hover:brightness-110 text-white ${
                    !isValidLogin && "!bg-gray-400"
                }`}
            >
                {t("loginBtn")}
            </button>
            <p
                onClick={() => navigate("/forgot_pass")}
                className="underline cursor-pointer text-end hover:text-blue-400"
            >
                {t("forgot_pass")}
            </p>
        </div>
    );
};

export default Login;