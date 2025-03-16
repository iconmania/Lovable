
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Service, getServices, saveServices, generateSlug } from "@/data/servicesData";
import { useToast } from "@/components/ui/use-toast";
import { PenSquare, Trash, Save, Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ServicesEditorProps {
  onSave: () => void;
}

const ServicesEditor: React.FC<ServicesEditorProps> = ({ onSave }) => {
  const [services, setServices] = useState<Service[]>(getServices());
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    saveServices(services);
    toast({
      title: "Services saved",
      description: "Services have been updated successfully."
    });
    onSave();
  };

  const handleEdit = (service: Service) => {
    setCurrentService({...service});
    setIsEditDialogOpen(true);
  };

  const handleAdd = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: "NEW SERVICE",
      slug: `new-service-${Date.now()}`,
      description: "Enter service description here.",
      fullDescription: "Enter detailed service description here.",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop",
      features: [
        { title: "Feature 1", description: "Feature description" }
      ]
    };
    
    setCurrentService(newService);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(service => service.id !== id));
      toast({
        title: "Service deleted",
        description: "The service has been removed."
      });
    }
  };

  const handleSaveService = () => {
    if (!currentService) return;
    
    // Generate a slug based on the title
    const updatedService = {
      ...currentService,
      slug: generateSlug(currentService.title)
    };
    
    // Check if we're updating an existing service or adding a new one
    if (services.some(service => service.id === updatedService.id)) {
      setServices(services.map(service => 
        service.id === updatedService.id ? updatedService : service
      ));
    } else {
      setServices([...services, updatedService]);
    }
    
    setIsEditDialogOpen(false);
    setCurrentService(null);
    
    toast({
      title: "Service saved",
      description: "The service has been updated."
    });
  };

  const updateServiceField = (field: keyof Service, value: string) => {
    if (!currentService) return;
    setCurrentService({
      ...currentService,
      [field]: value
    });
  };

  const updateFeature = (index: number, field: keyof Service['features'][0], value: string) => {
    if (!currentService || !currentService.features) return;
    
    const updatedFeatures = [...currentService.features];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      [field]: value
    };
    
    setCurrentService({
      ...currentService,
      features: updatedFeatures
    });
  };

  const addFeature = () => {
    if (!currentService) return;
    
    setCurrentService({
      ...currentService,
      features: [
        ...(currentService.features || []),
        { title: "New Feature", description: "Feature description" }
      ]
    });
  };

  const removeFeature = (index: number) => {
    if (!currentService || !currentService.features) return;
    
    const updatedFeatures = [...currentService.features];
    updatedFeatures.splice(index, 1);
    
    setCurrentService({
      ...currentService,
      features: updatedFeatures
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Services Manager</h2>
        <div className="space-x-2">
          <Button onClick={handleAdd} className="gap-1">
            <Plus size={16} />
            Add Service
          </Button>
          <Button onClick={handleSave} className="gap-1">
            <Save size={16} />
            Save All
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {services.map(service => (
          <Card key={service.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {service.image && (
                <div className="w-full md:w-1/4 bg-muted">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="h-40 md:h-full w-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">/{service.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleEdit(service)}
                    >
                      <PenSquare size={16} />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
                
                <p className="line-clamp-2 text-sm mb-2">{service.description}</p>
                
                {service.features && service.features.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mt-4 mb-2">Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-muted px-2 py-1 rounded-full"
                        >
                          {feature.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Service Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentService?.id ? 'Edit Service' : 'Add New Service'}</DialogTitle>
            <DialogDescription>
              Make changes to the service details below
            </DialogDescription>
          </DialogHeader>
          
          {currentService && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service-title">Service Title</Label>
                  <Input
                    id="service-title"
                    value={currentService.title}
                    onChange={(e) => updateServiceField("title", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service-slug">Slug (Auto-generated)</Label>
                  <Input
                    id="service-slug"
                    value={generateSlug(currentService.title)}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    The slug is automatically generated from the title
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service-description">Short Description</Label>
                <Textarea
                  id="service-description"
                  value={currentService.description}
                  onChange={(e) => updateServiceField("description", e.target.value)}
                  rows={2}
                />
                <p className="text-xs text-muted-foreground">
                  A brief summary of the service (displayed in the services list)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service-full-description">Full Description</Label>
                <Textarea
                  id="service-full-description"
                  value={currentService.fullDescription || ""}
                  onChange={(e) => updateServiceField("fullDescription", e.target.value)}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Detailed description of the service (displayed on the service detail page)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service-image">Image URL</Label>
                <Input
                  id="service-image"
                  value={currentService.image || ""}
                  onChange={(e) => updateServiceField("image", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                
                {currentService.image && (
                  <div className="mt-2 border rounded-md p-2 bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-2">Image Preview:</p>
                    <img 
                      src={currentService.image} 
                      alt="Service Preview" 
                      className="max-h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-4 border-t pt-4">
                <div className="flex justify-between items-center">
                  <Label>Service Features</Label>
                  <Button 
                    onClick={addFeature} 
                    size="sm" 
                    variant="outline"
                    className="gap-1"
                  >
                    <Plus size={16} />
                    Add Feature
                  </Button>
                </div>
                
                {currentService.features?.map((feature, index) => (
                  <div key={index} className="border rounded-md p-4 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 text-destructive"
                      onClick={() => removeFeature(index)}
                    >
                      <X size={16} />
                    </Button>
                    
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor={`feature-title-${index}`}>Feature Title</Label>
                        <Input
                          id={`feature-title-${index}`}
                          value={feature.title}
                          onChange={(e) => updateFeature(index, "title", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor={`feature-desc-${index}`}>Feature Description</Label>
                        <Textarea
                          id={`feature-desc-${index}`}
                          value={feature.description}
                          onChange={(e) => updateFeature(index, "description", e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveService}>
              Save Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesEditor;
