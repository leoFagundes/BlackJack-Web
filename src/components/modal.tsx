import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import background from "../../public/images/bg-secondary.png";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  return (
    <>
      {isOpen && (
        <section className="flex justify-center items-center fixed top-0 right-0 h-screen w-screen bg-black/30 backdrop-blur-sm z-50">
          <div
            className="relative min-h-[300px] p-4 min-w-[300px] max-w-[90%] max-h-[90%] bg-cover bg-no-repeat rounded-lg shadow-card scroll overflow-y-scroll"
            style={{ backgroundImage: `url(${background.src})` }}
          >
            {children}
            <IoClose
              onClick={onClose}
              size={26}
              className="absolute top-4 right-4 hover:cursor-pointer hover:text-zinc-50"
            />
          </div>
        </section>
      )}
    </>
  );
}
