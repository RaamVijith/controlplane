import React, { useState, Suspense } from "react";
import { IoIosClose } from "react-icons/io";
import { FaExpandAlt } from "react-icons/fa";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { RiAttachment2 } from "react-icons/ri";
import { FillButton } from "./libs/buttons";
import { IoSendSharp } from "react-icons/io5";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// const CKEditor = React.lazy(() =>
//   import("@ckeditor/ckeditor5-react").then((mod) => ({ default: mod.CKEditor }))
// );

// interface EmailProps {
//   onClose: () => void;
// }

const EmailTwo = ({ onClose }: { onClose: () => void }) => {
  const [content, setContent] = useState<string>("");
  const [showCC, setShowCC] = useState(false);
  const [showBCC, setShowBCC] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [emailBody, setEmailBody] = useState("");

  const handleContentChange = (reason: any) => {
    setContent(reason);
  };
  const toggleCC = () => setShowCC(!showCC);
  const toggleBCC = () => setShowBCC(!showBCC);
  const onDrop = (acceptedFiles: File[]) => {
    setAttachments((prevAttachments) => [...prevAttachments, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    // console.log({ to, cc, bcc, subject, message, attachments });
  };
  // Calculate height based on CC and BCC visibility
  const emailBodyBoxHeight =
    showCC && showBCC ? "50%" : showCC || showBCC ? "55%" : "62%";

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`fixed bottom-4 right-4 bg-white shadow-sm rounded-md z-[9999] ${
          isExpanded
            ? "h-[90%] w-[70%]"
            : "h-[80%] sm:h-[80%] md:w-[80%] lg:w-[55%] lg:h-[65%] xl:w-[50%] xl:h-[80%]"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="bg-[#f7f7f7] text-black rounded-t-md py-4">
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={toggleExpand}
                className=" hover:text-gray-200"
              >
                <FaExpandAlt className="text-black" size={14} />
              </button>
              <h6 className="text-sm font-semibold cursor-default">
                Create New Email
              </h6>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={onClose} className="hover:text-gray-200">
                <IoIosClose className="text-black" size={26} />
              </button>
            </div>
          </div>
        </div>
        <hr className="my-1 border-t border-gray-300" />
        <div className="p-3">
          {/* First Text Field */}
          <div className="flex items-center border-b border-gray-300 mb-2">
            <Image
              src="/users/4.jpg"
              alt="First Icon"
              className="rounded-full mr-2"
              width={24}
              height={24}
            />
            <Input
              type="text"
              placeholder="Create New Email"
              className="flex-1 border-none outline-none  text-gray-700"
            />
          </div>

          {/* Second Text Field */}
          <div className="gap-2 flex items-center justify-between border-b border-gray-300 ">
            <div className="flex w-full items-center gap-1">
              <p className="text-xs mr-2">To</p>
              <Image
                src="/users/2.jpg"
                alt="Second Icon"
                className="rounded-full mr-2"
                width={24}
                height={24}
              />
              <Input
                type="text"
                placeholder="Second Text Field"
                className="flex-1 w-full border-none outline-none p-2 text-gray-700"
              />
            </div>
            <div className="text-sm flex items-center gap-1">
              <p className="text-sm cursor-pointer" onClick={toggleCC}>
                Cc
              </p>
              <p className="text-sm cursor-pointer" onClick={toggleBCC}>
                Bcc
              </p>
            </div>
          </div>
          {/* CC Field */}
          {showCC && (
            <div className="flex w-full items-center gap-1 mt-2 border-b border-gray-300">
              <p className="text-xs mr-2">Cc</p>
              <Image
                src="/users/2.jpg"
                alt="Second Icon"
                className="rounded-full mr-2"
                width={24}
                height={24}
              />
              <Input
                type="text"
                placeholder="Cc"
                className="flex-1 w-full border-none outline-none p-2 text-gray-700"
              />
            </div>
          )}
          {/* BCC Field */}
          {showBCC && (
            <div className="flex w-full items-center gap-1 mt-2 border-b border-gray-300">
              <p className="text-xs mr-2">Bcc</p>
              <Image
                src="/users/2.jpg"
                alt="Second Icon"
                className="rounded-full mr-2"
                width={24}
                height={24}
              />
              <Input
                type="text"
                placeholder="Bcc"
                className="flex-1 w-full border-none outline-none p-2 text-gray-700"
              />
            </div>
          )}
        </div>
        <div className="gap-2 flex items-center justify-between border-b border-gray-300 mb-2 px-3">
          <Input
            type="text"
            placeholder="Subject"
            className="flex-1 w-full border-none outline-none text-gray-700"
          />
        </div>

        {/* Email Body Box */}
        <div
          className="flex flex-col border-b-1 border-gray-300 overflow-y-auto mb-2"
          style={{ height: emailBodyBoxHeight }}
        >
          <CKEditor
            editor={ClassicEditor}
            data={emailBody}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEmailBody(data);
            }}
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "insertTable",
                "tableColumn",
                "tableRow",
                "mergeTableCells",
                "undo",
                "redo",
                "alignment",
                "fontSize",
                "fontColor",
                "fontBackgroundColor",
                "highlight",
                "codeBlock",
                "imageUpload",
                "mediaEmbed",
                "removeFormat",
                "horizontalLine",
                "strikethrough",
                "subscript",
                "superscript",
                "underline",
                "code",
              ],
              extraPlugins: [
                // Add plugins here if needed
              ],
            }}
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
              className="text-white rounded-md text-sm py-1 px-2"
            >
              Send <IoSendSharp size={10} />
            </FillButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmailTwo;
