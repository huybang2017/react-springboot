// ConfirmDeleteModal.jsx
import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium mb-4">Cảnh báo</h3>
                    <p className="text-center mb-4">Bạn có chắc chắn muốn xóa phản hồi này không?</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => { onConfirm(); onClose(); }}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg"
                        >
                            Xóa
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
