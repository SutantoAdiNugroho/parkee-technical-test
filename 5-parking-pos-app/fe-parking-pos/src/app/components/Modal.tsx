import React, { ReactNode } from 'react';

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-70 transition-opacity duration-300">
            <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl transition-transform transform scale-95 duration-300 text-gray-900">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
