import { Dialog, Transition } from "@headlessui/react"
import React, { ReactElement } from "react"
import { Fragment } from "react"

interface ModalProps {
    className?: string
    open: boolean
    onClose: () => void
    children: ReactElement[] | ReactElement
}

function modalPropsAreEqual(prevModal, nextModal) {
    //se modal tiver aberto dá refresh em qualquer coisa
    if (prevModal.open) return false
    //se estado tiver diferente do antigo dá refresh
    if (prevModal.open != nextModal.open) return false
    return true
}

function Modal({ className = "max-w-md", open, onClose, children }: ModalProps) {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={onClose}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className={`${className} mt-24 lg:mt-6 my-6 inline-block w-full p-6 text-left align-middle transition-all transform bg-white border shadow-md rounded-2xl`}>
                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default React.memo(Modal, modalPropsAreEqual)