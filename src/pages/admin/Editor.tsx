
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import WebsiteEditor from "@/components/admin/WebsiteEditor";
import ServicesEditor from "@/components/admin/ServicesEditor";
import TestimonialsEditor from "@/components/admin/TestimonialsEditor";

const Editor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Simple auth check
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth") === "true";
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);
  
  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your content changes have been saved successfully.",
    });
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Content Editor</h1>
            <p className="text-muted-foreground">
              Edit website content, services, testimonials, and portfolio
            </p>
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
        
        <Tabs defaultValue="website">
          <TabsList className="w-full border-b pb-0">
            <TabsTrigger value="website">Website Content</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>
          
          <TabsContent value="website" className="pt-4">
            <WebsiteEditor onSave={handleSave} />
          </TabsContent>
          
          <TabsContent value="services" className="pt-4">
            <ServicesEditor onSave={handleSave} />
          </TabsContent>
          
          <TabsContent value="testimonials" className="pt-4">
            <TestimonialsEditor onSave={handleSave} />
          </TabsContent>
          
          <TabsContent value="portfolio" className="pt-4">
            {/* <PortfolioEditor onSave={handleSave} /> */}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Editor;
