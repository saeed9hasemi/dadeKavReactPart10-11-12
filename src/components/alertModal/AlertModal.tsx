import { createPortal } from "react-dom";
import Button from "../button/Button";

import { useAuth } from "../../contexts/AuthContext";

function AlertModal() {
  const { modal, closeModal } = useAuth();

  if (modal == null) {
    return null;
  }

  return createPortal(
    <div className="absolute inset-0 w-full h-screen z-50 text-slate-300 bg-white/5 backdrop-blur-lg">
      <div className="absolute left-1/2 top-1/2 -translate-1/2 rounded-lg bg-white/5 backdrop-blur-2xl p-4 flex flex-col gap-4 ">
        <div className="flex items-center gap-4">
          <button
            className="cursor-pointer size-6 rounded-full bg-white/10 flex items-center justify-center text-lg"
            onClick={() => closeModal()}
          >
            X
          </button>
          <p>{modal.content}</p>
        </div>
        <div className="flex items-center justify-around">
          <Button variant={modal.falseVariant} onClick={() => closeModal()}>
            {modal.falseButt}
          </Button>
          <Button
            variant={modal.trueVariant}
            onClick={() => {
              if (modal.param) {
                modal?.job(modal.param);
                closeModal();
              } else {
                modal?.job();
                closeModal();
              }
            }}
          >
            {modal.trueButt}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default AlertModal;
