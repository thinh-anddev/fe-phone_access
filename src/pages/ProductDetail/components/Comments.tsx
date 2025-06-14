import { useState, useEffect, useContext, ChangeEvent } from "react";
import { LoginContext } from "@/hooks/LoginStatus/LoginContext";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";

// Định nghĩa interface cho Comment
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

// API giả để lấy danh sách bình luận
const getComments = async (productId: number): Promise<{ success: boolean; comments: Comment[] }> => {
    const defaultComments: Comment[] = [
        {
            id: 1,
            productId,
            username: "Khách 1",
            content: "Sản phẩm chất lượng, rất đáng mua!",
            createdAt: new Date().toISOString(),
        },
        {
            id: 2,
            productId,
            username: "Khách 2",
            content: "Giao hàng nhanh, đóng gói cẩn thận.",
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
    ];
    return { success: true, comments: defaultComments };
};

// API giả để thêm bình luận
const addComment = async (
    productId: number,
    username: string,
    content: string
): Promise<{ success: boolean; comment: Comment }> => {
    const newComment: Comment = {
        id: Math.floor(Math.random() * 1000) + 3,
        productId,
        username,
        content,
        createdAt: new Date().toISOString(),
    };
    return { success: true, comment: newComment };
};

const Comments: React.FC<CommentsProps> = ({ productId }) => {
    const { user } = useContext(LoginContext);
    const { showToast } = useContext(ToastContext);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");

    const fetchComments = async () => {
        try {
            const response = await getComments(productId);
            if (response.success) {
                setComments(response.comments);
            } else {
                showToast("Không thể tải bình luận!");
            }
        } catch (error) {
            showToast("Lỗi khi tải bình luận!");
        }
    };

    useEffect(() => {
        fetchComments();
    }, [productId]);

    const handleSubmitComment = async () => {
        if (!user) {
            showToast("Vui lòng đăng nhập để bình luận!");
            return;
        }
        if (!newComment.trim()) {
            showToast("Bình luận không được để trống!");
            return;
        }

        try {
            const response = await addComment(productId, user.username, newComment.trim());
            if (response.success) {
                setComments([response.comment, ...comments]);
                setNewComment("");
                showToast("Bình luận đã được gửi!");
            } else {
                showToast("Không thể gửi bình luận!");
            }
        } catch (error) {
            showToast("Lỗi khi gửi bình luận!");
        }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };

    return (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Bình luận</h3>
            {user ? (
                <div className="mb-6">
          <textarea
              value={newComment}
              onChange={handleChange}
              placeholder="Viết bình luận của bạn..."
              className="w-full p-3 border border-gray-300 rounded-md resize-y focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              rows={4}
          />
                    <button
                        onClick={handleSubmitComment}
                        className="mt-2 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition"
                    >
                        Gửi bình luận
                    </button>
                </div>
            ) : (
                <p className="text-gray-600 mb-6">
                    Vui lòng <a href="/user" className="text-purple-500 hover:underline">đăng nhập</a> để bình luận.
                </p>
            )}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {comments.length === 0 ? (
                    <p className="text-gray-500">Chưa có bình luận nào.</p>
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
        </div>
    );
};

export default Comments;