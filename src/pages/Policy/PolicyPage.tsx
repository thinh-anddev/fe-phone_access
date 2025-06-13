import React from "react";
import { useTranslation } from "react-i18next";

const PolicyPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="border border-tertiary-500 shadow-sm rounded-lg max-w-5xl mx-auto px-6 py-7">
            <h1 className="text-3xl font-bold mb-8">{t("policy_title")}</h1>

            <div className="space-y-6 text-gray-800 leading-relaxed">
                <section>
                    <h2 className="font-semibold text-lg mb-4">
                        {t("policy_accessories_title")}
                    </h2>
                    <ol className="list-decimal list-inside space-y-3">
                        <li>{t("policy_scope")}</li>
                        <li>{t("policy_condition")}</li>
                        <li>{t("policy_process")}</li>
                        <li>{t("policy_note")}</li>
                    </ol>
                </section>
            </div>
        </div>
    );
};

export default PolicyPage;
