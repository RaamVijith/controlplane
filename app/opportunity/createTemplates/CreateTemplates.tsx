import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PiSignature } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TfiNewWindow } from "react-icons/tfi";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { BsThreeDots } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BiSolidEdit } from "react-icons/bi";
import { RiExpandUpDownLine, RiDeleteBin5Line } from "react-icons/ri";
import { CiExport } from "react-icons/ci";
import { FaRegFolderOpen } from "react-icons/fa";
import AddFolder from "./AddFolder";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiPlus } from "react-icons/fi";
import {
  FillButton,
  InverseFillButton,
} from "../../../components/libs/buttons";
import AssignFolder from "./AssignFolder";
import Delete from "@/app/components/common/Delete";

interface Template {
  id: number;
  name: string;
  content: string;
  createdBy: string;
  createdOn: string;
  modifiedBy: string;
  modifiedOn: string;
}

const CreateEmailTemplate: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [createdOn, setCreatedOn] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [modifiedOn, setModifiedOn] = useState("");

  const handleMenuItemClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const openModal = (template: Template | null = null) => {
    setCurrentTemplate(template);
    setTemplateName(template ? template.name : "");
    setTemplateContent(template ? template.content : "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTemplate(null);
    setTemplateName("");
    setTemplateContent("");
  };

  const handleSave = () => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace("T", " "); // Format to "YYYY-MM-DD HH:MM:SS"
    if (currentTemplate) {
      setTemplates(
        templates.map((t) =>
          t.id === currentTemplate.id
            ? {
                ...t,
                name: templateName,
                content: templateContent,
                createdBy: createdBy,
                createdOn: createdOn,
                modifiedBy: modifiedBy,
                modifiedOn: formattedDate,
              }
            : t
        )
      );
    } else {
      const newTemplate: Template = {
        id: Date.now(),
        name: templateName,
        content: templateContent,
        createdBy: createdBy,
        createdOn: formattedDate,
        modifiedBy: modifiedBy,
        modifiedOn: modifiedOn,
      };
      setCreatedOn(formattedDate);
      setTemplates([...templates, newTemplate]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setTemplates(templates.filter((t) => t.id !== id));
  };

  const handleExport = (template: Template) => {
    const blob = new Blob([template.content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.name}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-[70%] m-[10%]">
      <div className="text-lg font-medium">Templates</div>
      <hr className="my-2" />

      <div className="flex w-full justify-between items-center">
        {/* SearchBar */}
        <div className="relative w-[200px]">
          {/* Search Icon */}
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {/* Input Field */}
          <Input
            placeholder="Filter by Name"
            // value={searchInput}
            // onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <div className="flex flex-row">
          {/* Folder button */}

          <AddFolder
            trigger={
              <InverseFillButton className="flex flex-row items-center">
                <FaRegFolderOpen size={20} />
                <div className="text-sm">Folder</div>
              </InverseFillButton>
            }
          />

          {/* Add Template Button */}
          <InverseFillButton onClick={() => openModal()}>
            <div className="text-sm">Add Template</div>
          </InverseFillButton>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex gap-2 items-center">
                <Checkbox
                  className="border-gray-300"
                  // checked={row.getIsSelected()}
                  // onCheckedChange={(value) => row.toggleSelected(!!value)}
                  aria-label="Select row"
                />
                Name
              </div>
            </TableHead>
            <TableHead></TableHead>
            <TableHead>Folder</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead>Modified By</TableHead>
            <TableHead>Modified on</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell className="font-medium">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    className="border-gray-300"
                    // checked={row.getIsSelected()}
                    // onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                  />
                  <div className="capitalize text-sm">{template.name}</div>
                </div>
              </TableCell>
              <TableCell>
                <Select defaultValue="Active">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Deactive">Deactive</SelectItem>
                      <SelectItem value="Druff">Druff</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>/folder1</TableCell>
              <TableCell>
                <div className="flex gap-2 items-center">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={`/users/1.jpg`} alt="@shadcn" />
                  </Avatar>
                  <div className="capitalize text-sm">Alexandra Cox</div>
                </div>
              </TableCell>
              <TableCell>{template.createdOn}</TableCell>
              <TableCell>
                {template.modifiedOn ? (
                  <div>
                    <div className="flex gap-2 items-center">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={`/users/1.jpg`} alt="@shadcn" />
                      </Avatar>
                      <div className="capitalize text-sm">Alexandra Cox</div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </TableCell>
              <TableCell>{template.modifiedOn}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer rounded-full hover:bg-gray-200 h-8 w-8 p-0 flex items-center justify-center">
                      <BsThreeDots className="h-4 w-4" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={handleMenuItemClick}
                    >
                      {/* <CreateCompanyDialog
                      mode="edit"
                      trigger={
                        <span className="pl-2 gap-3 flex items-center justify-center">
                          <BiSolidEdit className="text-black" size={20} />
                          
                          Edit
                        </span>
                      }
                    /> */}
                      <span
                        onClick={() => openModal(template)}
                        className="pl-2 gap-3 flex items-center justify-start"
                      >
                        <BiSolidEdit className="text-black" size={20} />
                        Edit
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={handleMenuItemClick}
                    >
                      <AssignFolder
                        trigger={
                          <span className="pl-2 gap-3 flex items-center justify-start">
                            <FaRegFolderOpen className="text-black" size={18} />
                            Assign
                          </span>
                        }
                      />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span
                        onClick={() => handleExport(template)}
                        className="pl-2 gap-3 flex items-center justify-start"
                      >
                        <CiExport className="text-black" size={20} />
                        Export
                      </span>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem
                      className="cursor-pointer"
                      // onClick={handleMenuItemClick}
                    >
                      <span
                        onClick={() => handleDelete(template.id)}
                        className="pl-2 gap-3 flex items-center justify-center"
                      >
                        <RiDeleteBin5Line className="text-red-500" size={20} />
                        Delete
                      </span>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={handleMenuItemClick}
                    >
                      <Delete
                        trigger={
                          <span className="pl-2 gap-3 flex items-center justify-start">
                            <RiDeleteBin5Line
                              className="text-red-500"
                              size={20}
                            />
                            Delete
                          </span>
                        }
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              {/* <TableCell className="text-right">
                <button
                  onClick={() => openModal(template)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(template.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleExport(template)}
                  className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                >
                  Export
                </button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {/* <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow> */}
        </TableFooter>
      </Table>

      <div className="max-w-4xl mx-auto p-6">
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
              <h2 className="text-lg font-bold mb-2">
                {currentTemplate ? "Edit Template" : "Create Template"}
              </h2>
              {/* <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Template Name"
                className="w-full p-2 mb-4 border rounded"
              /> */}
              <div className="flex items-center border-b border-gray-300 px-3">
                <Input
                  type="text"
                  placeholder="Name :"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="flex-1 border-none outline-none text-gray-700"
                />
              </div>
              <div className="flex items-center  px-3">
                <Input
                  type="text"
                  placeholder="Subject :"
                  className="flex-1 border-none outline-none text-gray-700"
                />
              </div>
              <CKEditor
                editor={ClassicEditor}
                data={templateContent}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  // console.log("Editor is ready to use!", editor);
                  const rootElement = editor.editing.view.document.getRoot();
                  if (rootElement) {
                    editor.editing.view.change((writer) => {
                      writer.setStyle("height", "27rem", rootElement);
                    });
                  }
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setTemplateContent(data);
                }}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "underline",
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

{/* <CKEditor
              editor={ClassicEditor}
              // data={emailBody}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // console.log("Editor is ready to use!", editor);
                const rootElement = editor.editing.view.document.getRoot();
                if (rootElement) {
                  editor.editing.view.change((writer) => {
                    writer.setStyle("height", "27rem", rootElement);
                  });
                }
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                // setEmailBody(data);
              }}
              
              config={{// Optional: Redundant in this context.,
                toolbar: [
                 
                  "underline",
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
            /> */}
              
              <div className="flex flex-row text-sm gap-1 mt-1">
                <PiSignature size={20}/>
                Your signature will be included when you use this template. 
                <span className="text-gray-600 hover:underline cursor-pointer flex flex-row gap-1 ">Edit signature <TfiNewWindow size={16}/>
                </span>
              </div>
              <div className="mt-6 text-right">
                <Button
                  onClick={handleSave}
                  className=" text-white px-4 py-2 rounded mr-2 "
                >
                  Save Template
                </Button>
                <button
                  onClick={closeModal}
                  className="bg-gray-200 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEmailTemplate;

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
