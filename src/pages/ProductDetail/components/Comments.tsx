import { useState, useEffect, useContext, ChangeEvent } from "react";
import { LoginContext } from "@/hooks/LoginStatus/LoginContext";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { addComment, getCommentsByProduct } from "../api/comments";
import { useTranslation } from "react-i18next"; // ⬅️ Thêm dòng này

interface Comment {
    id: number;
    productId: number;
    username: string;
    content: string;
    createdAt: string;
}

interface CommentsProps {
    productId: number;
}

const Comments: React.FC<CommentsProps> = ({ productId }) => {
    const { t } = useTranslation(); // ⬅️ Hook dịch
    const { user } = useContext(LoginContext);
    const { showToast } = useContext(ToastContext);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const fetchComments = async () => {
        try {
            const response = await getCommentsByProduct(productId, page);
            if (response.success) {
                setComments(response.data.content);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            showToast(t("comments.fetch_error"));
        }
    };

    useEffect(() => {
        fetchComments();
    }, [productId, page]);

    const handleSubmitComment = async () => {
        if (!user) {
            showToast(t("comments.login_to_comment"));
            return;
        }
        if (!newComment.trim()) {
            showToast(t("comments.empty_comment_warning"));
            return;
        }

        try {
            const response = await addComment(productId, newComment.trim());
            if (response.success) {
                setComments([response.data, ...comments]);
                setNewComment("");
                showToast(t("comments.comment_success"));
            } else {
                showToast(response.message);
            }
        } catch (error) {
            showToast(t("comments.submit_error"));
        }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{t("comments.title")}</h3>
            {user ? (
                <div className="mb-6">
                    <textarea
                        value={newComment}
                        onChange={handleChange}
                        placeholder={t("comments.placeholder")}
                        className="w-full p-3 border border-gray-300 rounded-md resize-y focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                        rows={4}
                    />
                    <button
                        onClick={handleSubmitComment}
                        className="mt-2 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition"
                    >
                        {t("comments.submit")}
                    </button>
                </div>
            ) : (
                <p className="text-gray-600 mb-6">
                    {t("comments.login_prompt")}{" "}
                    <a href="/user" className="text-purple-500 hover:underline">
                        {t("comments.login_link")}
                    </a>
                    .
                </p>
            )}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {comments.length === 0 ? (
                    <p className="text-gray-500">{t("comments.no_comments")}</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 border-b border-gray-200 pb-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                                {comment.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-semibold text-gray-800">{comment.username}</span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(comment.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-gray-700">{comment.content}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 0}
                        className="mx-1 px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
                    >
                        {t("comments.prev")}
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index)}
                            className={`mx-1 px-3 py-1 rounded-md ${page === index
                                ? "bg-purple-500 text-white"
                                : "bg-gray-200"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages - 1}
                        className="mx-1 px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
                    >
                        {t("comments.next")}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Comments;
