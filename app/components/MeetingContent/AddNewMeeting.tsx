import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiPlus } from "react-icons/fi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputWithButton from "./InputWithButton";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimePickerDemo } from "../../components/common/dateTimePicker/Time-picker-demo";
import AddGuestDialog from "./AddGuestDialog";

interface Meeting {
  trigger: React.ReactNode;
  meetingData?: {
    id: string;
    name: string;
    avatar: string;
  };
}

const AddNewMeeting: React.FC<Meeting> = ({ trigger, meetingData }) => {
  const [eventName, setEventName] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState("3h 45m");
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState([
    { id: "1", name: "Guest 1", avatar: "/users/8.jpg" },
    { id: "2", name: "Guest 2", avatar: "/users/2.jpg" },
    { id: "3", name: "Guest 3", avatar: "/users/3.jpg" },
    { id: "4", name: "Guest 4", avatar: "/users/4.jpg" },
    { id: "5", name: "Guest 5", avatar: "/users/1.jpg" },
    { id: "6", name: "Guest 6", avatar: "/users/7.jpg" },
  ]);
  const [newGuest, setNewGuest] = useState("");
  const [notifications, setNotifications] = useState({
    email: true,
    slack: false,
  });
  const [reminder, setReminder] = useState("1 hour before event");
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    description ? setIsHovered(true) : setIsHovered(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="fixed bg-white p-4 rounded-md shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[650px] overflow-y-scroll max-h-screen">
        <DialogTitle className="text-lg font-medium">
          Create New Meeting
        </DialogTitle>
        <hr className="my-2" />
        <DialogDescription className="mt-2 mb-4 text-sm text-gray-500">
          <form className="space-y-4">
            {/* Event Name */}
            <div
              className="w-full"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Label
                htmlFor="eventName"
                className="block text-sm font-medium text-black mb-1"
              >
                Event Name
              </Label>
              <div>
                <Input
                  type="text"
                  id="eventName"
                  placeholder="Enter event name"
                  name="eventName"
                />
              </div>

              {/* Hover Button */}
              <div
                className={`mt-2 transition-opacity duration-100 ease-out ${
                  isHovered ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
                }`}
              >
                <div className="w-full">
                  <Label
                    htmlFor="addDescription"
                    className="block text-sm font-medium text-black mb-1"
                  >
                    Add Description
                  </Label>
                  <Input
                    type="text"
                    id="addDescription"
                    placeholder="Add description hear"
                    name="addDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Date */}
            <div className="flex space-x-4 justify-between">
              <div className="flex-1">
                <Label
                  htmlFor="date"
                  className="block text-sm font-medium  text-black mb-1"
                >
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " justify-start text-left font-normal ",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex-1 ">
                <Label
                  htmlFor="time"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Time
                </Label>
                <div>                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal w-full gap-2 pl-[1px]",
                          !time && "text-muted-foreground"
                        )}
                      >
                        <Clock className="ml-2 h-4 w-4" />
                        <span>
                          {time
                            ? time.toLocaleString().slice(11, 20)
                            : "No date provided"}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-1">
                      <TimePickerDemo date={time} setDate={setTime} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
             
              <div className="flex-1">
                <Label
                  htmlFor="eventName"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Duration
                </Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="2h">2 hours</SelectItem>
                    <SelectItem value="3h 45m">3 hours 45 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-full">
              <Label
                htmlFor="location"
                className="block text-sm font-medium text-black mb-1"
              >
                Location
              </Label>
              <Input
                type="text"
                id="location"
                placeholder="Choose location"
                name="location"
              />
            </div>

            <div>
              <div className="w-full">
                <Label
                  htmlFor="eventName"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Add Guests
                </Label>
                <div className="flex justify-between pr-2 rounded-md border items-center border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <Input
                    className="border-none w-3/4"
                    placeholder="contact@example.com"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AddGuestDialog 
                         trigger={
                          <FiPlus className="cursor-pointer" size={18} />

                         }
                        />
                        
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add Guests</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>{" "}
                </div>
              </div>
              <div className="flex mt-2 space-x-1">
                {guests.slice(0, 5).map((guest) => (
                  <Avatar key={guest.id}>
                    <AvatarImage src={guest.avatar} alt={guest.name} />
                    <AvatarFallback>{guest.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
                {guests.length > 5 && (
                  <Avatar>
                    <AvatarFallback>+{guests.length - 5}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-5">
              <div className="">
                <Label
                  htmlFor="eventName"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Notification
                </Label>

                <Tabs defaultValue="email" className="w-[150px]">
                  <TabsList className="grid w-full grid-cols-2 rounded-md">
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="slack">Slack</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="">
                <Label
                  htmlFor="eventName"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Set Remainder
                </Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="2h">2 hours</SelectItem>
                    <SelectItem value="3h 45m">3 hours 45 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label
                htmlFor="eventName"
                className="block text-sm font-medium text-black mb-1"
              >
                Upload Attachments
              </Label>
              <Input
                id="attachments"
                type="file"
                onChange={(e) =>
                  setAttachments(Array.from(e.target.files || []))
                }
              />
            </div>

            {/* <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Create Event</Button>
            </div> */}
          </form>
        </DialogDescription>
        <div className="mt-4 flex flex-col md:flex-row justify-end md:space-x-2">
          <DialogClose asChild>
            <button className="px-4 py-2 bg-gray-200 text-black rounded-md w-full md:w-1/2">
              Cancel
            </button>
          </DialogClose>
          <button className="px-4 py-2 bg-black text-white rounded-md w-full md:w-1/2">
            Create Event
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewMeeting;
