import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "VIT Mess Menu Update",
      message: "Special South Indian Thali added to tomorrow's lunch menu in Main Mess.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Waste Management Report",
      message: "Monthly mess waste report for VIT Vellore is ready for review.",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      title: "Mess Maintenance",
      message: "Main Mess will be under maintenance this weekend. Alternative arrangements in Anna Mess.",
      time: "2 days ago",
      read: true,
    },
    {
      id: 4,
      title: "New Mess Facility",
      message: "New food court opened in VIT Tech Park. Check out the menu!",
      time: "3 days ago",
      read: true,
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2 border-b">
          <h3 className="font-semibold">VIT Mess Notifications</h3>
        </div>
        {notifications.map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            className={`p-3 ${!notification.read ? 'bg-muted/50' : ''}`}
            onClick={() => {
              setNotifications(notifications.map(n =>
                n.id === notification.id ? { ...n, read: true } : n
              ));
            }}
          >
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <span className="font-medium">{notification.title}</span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
            </div>
          </DropdownMenuItem>
        ))}
        {notifications.length === 0 && (
          <div className="p-3 text-center text-muted-foreground">
            No notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationCenter; 