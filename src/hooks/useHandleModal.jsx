import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../Redux/slices/modalSlice";


const useHandleModal = () => {
  const dispatch = useDispatch();

  return {
    open: () => dispatch(openModal()),
    close: () => dispatch(closeModal()),
  };
};

export default useHandleModal;
