import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';

interface Guest {
  id: string;
  name: string;
  avatar: string;
}

const CreateEventForm: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('14:00');
  const [duration, setDuration] = useState('3h 45m');
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState<Guest[]>([
    { id: '1', name: 'Guest 1', avatar: '/avatar1.jpg' },
    { id: '2', name: 'Guest 2', avatar: '/avatar2.jpg' },
    { id: '3', name: 'Guest 3', avatar: '/avatar3.jpg' },
    { id: '4', name: 'Guest 4', avatar: '/avatar4.jpg' },
    { id: '5', name: 'Guest 5', avatar: '/avatar5.jpg' },
    { id: '6', name: 'Guest 6', avatar: '/avatar6.jpg' },
  ]);
  const [newGuest, setNewGuest] = useState('');
  const [notifications, setNotifications] = useState({ email: true, slack: false });
  const [reminder, setReminder] = useState('1 hour before event');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Event created:', { eventName, date, time, duration, location, guests, notifications, reminder, attachments });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      
      <div>
        <Label htmlFor="eventName">Event name</Label>
        <Input id="eventName" placeholder="Enter event name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
      </div>
      
      <div className="flex space-x-4">
        <div className="flex-1">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">{date ? format(date, 'PPP') : 'Pick a date'}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex-1">
          <Label htmlFor="time">Time</Label>
          <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className="flex-1">
          <Label htmlFor="duration">Duration</Label>
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
        <Label htmlFor="location">Location</Label>
        <Input id="location" placeholder="Choose Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      
      <div>
        <Label>Add guests</Label>
        <div className="flex space-x-2">
          <Input placeholder="contact@example.com" value={newGuest} onChange={(e) => setNewGuest(e.target.value)} />
          <Button onClick={() => {
            if (newGuest) {
              setGuests([...guests, { id: String(guests.length + 1), name: newGuest, avatar: '' }]);
              setNewGuest('');
            }
          }}>Add</Button>
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
      
      <div>
        <Label>Notification</Label>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="email" checked={notifications.email} onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked as boolean })} />
            <label htmlFor="email">Email</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="slack" checked={notifications.slack} onCheckedChange={(checked) => setNotifications({ ...notifications, slack: checked as boolean })} />
            <label htmlFor="slack">Slack</label>
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="reminder">Set reminder</Label>
        <Select value={reminder} onValueChange={setReminder}>
          <SelectTrigger>
            <SelectValue placeholder="Select reminder time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30m">30 minutes before event</SelectItem>
            <SelectItem value="1h">1 hour before event</SelectItem>
            <SelectItem value="1d">1 day before event</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="attachments">Upload attachments</Label>
        <Input id="attachments" type="file" onChange={(e) => setAttachments(Array.from(e.target.files || []))} />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Create Event</Button>
      </div>
    </form>
  );
};

export default CreateEventForm;
