import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import CardComponent from "./component.card";

export default function DialogComponent(
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  title: string,
  content: JSX.Element
) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog className="dark relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {CardComponent(
                <Dialog.Panel className="max-w-md transform overflow-hidden p-6  transition-all">
                  <Dialog.Title className="text-xl font-bold dark:text-white">
                    {title}
                  </Dialog.Title>
                  {content}
                </Dialog.Panel>
              )}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
