import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl w-[95%] max-w-3xl p-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
