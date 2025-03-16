
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, PenSquare, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Simple auth check (in a real app, use a proper auth system)
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth") === "true";
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const stats = [
    {
      title: "Total Messages",
      value: "24",
      icon: MessageSquare,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
      link: "/admin/messages"
    },
    {
      title: "Content Items",
      value: "12",
      icon: PenSquare,
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
      link: "/admin/editor"
    },
    {
      title: "Settings",
      value: "5",
      icon: Settings,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
      link: "/admin/settings"
    },
    {
      title: "Users",
      value: "1",
      icon: Users,
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
      link: "/admin/settings"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(stat.link)}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-full ${stat.color}`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You have 3 unread messages. Click below to view all messages.
              </p>
              <Button className="mt-4" onClick={() => navigate("/admin/messages")}>
                View Messages
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => navigate("/admin/editor")}
              >
                <PenSquare className="mr-2 h-4 w-4" />
                Edit Content
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => navigate("/admin/settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                System Settings
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => navigate("/")}
              >
                View Website
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
