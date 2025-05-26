import React from "react";

const PolicyPage: React.FC = () => {
    return (
        <div className="border border-tertiary-500 shadow-sm rounded-lg max-w-5xl mx-auto px-6 py-7">
            <h1 className="text-3xl font-bold mb-8">Chính sách đổi trả hàng hóa</h1>
            {/* Content */}
            <div className="space-y-6 text-gray-800 leading-relaxed">
                <section>
                    <h2 className="font-semibold text-lg mb-4">Chính sách đổi trả phụ kiện điện thoại</h2>
                    <ol className="list-decimal list-inside space-y-3">
                        <li>
                            <strong>Phạm vi áp dụng:</strong> Áp dụng cho tất cả sản phẩm phụ kiện điện thoại mua tại cửa hàng/website.
                        </li>
                        <li>
                            <strong>Điều kiện đổi trả:</strong> Sản phẩm còn nguyên tem, chưa qua sử dụng và không bị hư hỏng do khách hàng. Thời gian đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.
                        </li>
                        <li>
                            <strong>Quy trình đổi trả:</strong> Liên hệ bộ phận chăm sóc khách hàng để được hướng dẫn, cung cấp hóa đơn và mô tả lỗi (nếu có).
                        </li>
                        <li>
                            <strong>Lưu ý:</strong> Sản phẩm lỗi do nhà sản xuất sẽ được đổi mới hoặc hoàn tiền. Sản phẩm lỗi do khách hàng không thuộc phạm vi đổi trả. Chi phí vận chuyển do bên gây lỗi chịu.
                        </li>
                    </ol>
                </section>
            </div>
        </div>
    );
};

export default PolicyPage;
