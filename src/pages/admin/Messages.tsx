
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { MessageCircle, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Mock messages for demonstration
const initialMessages = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    message: "I'm interested in your web development services. Could you provide more information about your pricing?",
    date: "2023-09-15T10:30:00Z",
    isRead: true
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@example.com",
    message: "Hello, I would like to discuss a potential brand strategy project for my startup.",
    date: "2023-09-14T14:45:00Z",
    isRead: false
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    message: "Your portfolio looks impressive! I need help with a mobile app for my business. When can we schedule a call?",
    date: "2023-09-13T09:15:00Z",
    isRead: false
  }
];

const Messages = () => {
  const [messages, setMessages] = useState(() => {
    // Try to load messages from localStorage, or use initial mock data
    const savedMessages = localStorage.getItem("contactMessages");
    return savedMessages ? JSON.parse(savedMessages) : initialMessages;
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Simple auth check
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth") === "true";
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);
  
  // Save messages to localStorage when they change
  useEffect(() => {
    localStorage.setItem("contactMessages", JSON.stringify(messages));
  }, [messages]);
  
  const markAsRead = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, isRead: true } : msg
    ));
    
    toast({
      title: "Message marked as read",
      description: "The message has been marked as read.",
    });
  };
  
  const deleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
    
    toast({
      title: "Message deleted",
      description: "The message has been deleted.",
    });
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground">
              Manage contact form submissions
            </p>
          </div>
        </div>
        
        {messages.length === 0 ? (
          <Card>
            <CardContent className="py-10">
              <div className="text-center">
                <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">No messages</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You don't have any messages yet. They will appear here when visitors submit the contact form.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id} className={message.isRead ? "opacity-80" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{message.name}</CardTitle>
                      <CardDescription>{message.email}</CardDescription>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(message.date).toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 whitespace-pre-wrap">{message.message}</p>
                  <div className="flex justify-end gap-2">
                    {!message.isRead && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => markAsRead(message.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteMessage(message.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Messages;
