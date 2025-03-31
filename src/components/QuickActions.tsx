import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Calendar, 
  Settings, 
  Users, 
  ChefHat, 
  BarChart3,
  MessageSquare,
  HelpCircle,
  Utensils,
  Building2
} from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      title: "Main Mess Menu",
      description: "View today's menu in Main Mess",
      icon: <ChefHat className="h-6 w-6" />,
      link: "/menu-selection",
      color: "text-blue-500"
    },
    {
      title: "Anna Mess",
      description: "Check Anna Mess menu and schedule",
      icon: <Utensils className="h-6 w-6" />,
      link: "/anna-mess",
      color: "text-green-500"
    },
    {
      title: "Mess Reports",
      description: "Access mess reports and analytics",
      icon: <BarChart3 className="h-6 w-6" />,
      link: "/dashboard",
      color: "text-purple-500"
    },
    {
      title: "Mess Schedule",
      description: "View and manage meal schedules",
      icon: <Calendar className="h-6 w-6" />,
      link: "/schedule",
      color: "text-orange-500"
    },
    {
      title: "Student List",
      description: "Manage registered students",
      icon: <Users className="h-6 w-6" />,
      link: "/students",
      color: "text-pink-500"
    },
    {
      title: "Mess Settings",
      description: "Configure mess settings",
      icon: <Settings className="h-6 w-6" />,
      link: "/settings",
      color: "text-gray-500"
    },
    {
      title: "Mess Documents",
      description: "Access mess-related documents",
      icon: <FileText className="h-6 w-6" />,
      link: "/documents",
      color: "text-yellow-500"
    },
    {
      title: "Mess Support",
      description: "Get mess-related help",
      icon: <HelpCircle className="h-6 w-6" />,
      link: "/help",
      color: "text-red-500"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>VIT Mess Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 text-center hover:bg-muted/50"
              asChild
            >
              <Link to={action.link}>
                <div className={`${action.color}`}>
                  {action.icon}
                </div>
                <div>
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions; 