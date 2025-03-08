import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../Redux/slices/modalSlice";

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] md:w-[600px] relative text-black ">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={() => dispatch(closeModal())}
        >
          ✖
        </button>
        
        {children} 
      </div>
    </div>
  );
};

export default Modal;
