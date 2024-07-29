import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { FaExpandAlt } from "react-icons/fa";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { RiAttachment2 } from "react-icons/ri";
import { FillButton, InverseFillButton, OutlineButton } from "./libs/buttons";
import { IoSendSharp } from "react-icons/io5";

const Email = ({ onClose }: { onClose: () => void }) => {
  const [showCC, setShowCC] = useState(false);
  const [showBCC, setShowBCC] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const toggleCC = () => setShowCC(!showCC);
  const toggleBCC = () => setShowBCC(!showBCC);
  const onDrop = (acceptedFiles) => {
    setAttachments([...attachments, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    // console.log({ to, cc, bcc, subject, message, attachments });
  };
  // Calculate height based on CC and BCC visibility
  // Calculate height based on CC and BCC visibility
  const emailBodyBoxHeight =
    showCC && showBCC ? "45%" : showCC || showBCC ? "55%" : "62%";

  return (
    <form onSubmit={handleSubmit}>
      {/* <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-md p-3 w-[90%] h-full  md:h-full md:w-[90%] lg:w-[750px] lg:h-[700px] xl:w-[750px] xl:h-[700px] md:bottom-0"> */}
      <div
        className={`fixed bottom-4 right-4 bg-white shadow-lg rounded-md p-3 w-[90%] sm:h-[80%] md:w-[80%] lg:w-[750px] lg:h-[700px] xl:w-[750px] xl:h-[700px] ${
          showCC || showBCC ? "h-[90%]" : "h-[100%]"
        }`}
      >
        <div className="bg-blue-600 text-white rounded-t-md py-4">
          <div className="flex justify-between items-center px-2">
            <h6 className="text-sm font-semibold">Create new email</h6>
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200"
              >
                <FaExpandAlt size={12} />
              </button>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200"
              >
                <IoIosClose size={26} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-3">
          {/* First Text Field */}
          <div className="flex items-center border-b border-gray-300 mb-2">
            <Image
              src="/users/4.jpg"
              alt="First Icon"
              className="rounded-full mr-2"
              width={20}
              height={20}
            />
            <Input
              type="text"
              placeholder="First Text Field"
              className="flex-1 border-none outline-none  text-gray-700"
            />
          </div>

          {/* Second Text Field */}
          <div className="gap-2 flex items-center justify-between border-b border-gray-300 ">
            <div className="flex w-full items-center gap-1">
              <p className="text-sm mr-2">To</p>
              <Image
                src="/users/2.jpg"
                alt="Second Icon"
                className="rounded-full mr-2"
                width={16}
                height={16}
              />
              <Input
                type="text"
                placeholder="Second Text Field"
                className="flex-1 w-full border-none outline-none p-2 text-gray-700"
              />
            </div>
            <div className="text-sm flex items-center gap-1">
              <p className="text-sm cursor-pointer" onClick={toggleCC}>
                CC
              </p>
              <p className="text-sm cursor-pointer" onClick={toggleBCC}>
                BCC
              </p>
            </div>
          </div>
          {/* CC Field */}
          {showCC && (
            <div className="flex w-full items-center gap-1 mt-2">
              <p className="text-sm mr-2">CC</p>
              <Image
                src="/users/2.jpg"
                alt="Second Icon"
                className="rounded-full mr-2"
                width={16}
                height={16}
              />
              <Input
                type="text"
                placeholder="CC"
                className="flex-1 w-full border-none outline-none p-2 text-gray-700"
              />
            </div>
          )}
          {/* BCC Field */}
          {showBCC && (
            <div className="flex w-full items-center gap-1 mt-2">
              <p className="text-sm mr-2">BCC</p>
              <Image
                src="/users/2.jpg"
                alt="Second Icon"
                className="rounded-full mr-2"
                width={16}
                height={16}
              />
              <Input
                type="text"
                placeholder="BCC"
                className="flex-1 w-full border-none outline-none p-2 text-gray-700"
              />
            </div>
          )}
        </div>
        <div className="gap-2 flex items-center justify-between border-b border-gray-300 mb-2">
          <Input
            type="text"
            placeholder="Subject"
            className="flex-1 w-full border-none outline-none text-gray-700"
          />
        </div>

        {/* Email Body Box */}
        <div
          className={`flex flex-col border border-gray-300 mb-2 ${
            showCC || showBCC ? "md:h-[90%]" : "md:h-[100%]"
          }`}
          style={{ height: emailBodyBoxHeight }}
        >
          <textarea
            placeholder="Type your email here..."
            className="flex-1 w-full h-full border-none outline-none text-gray-700 p-2 resize-none"
          />
        </div>
        <div className="flex justify-between items-center pb-2">
          <div>
            <div {...getRootProps()} className="cursor-pointer">
              <input {...getInputProps()} />
              <RiAttachment2 size={20} />
            </div>
            <ul className="flex gap-2 mt-2 text-sm">
              {attachments.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
          {/* Send Button */}
          <div>
            <FillButton
              //   type="submit"
              className="text-white rounded-md text-sm"
            >
              Send <IoSendSharp size={10} />
            </FillButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Email;
