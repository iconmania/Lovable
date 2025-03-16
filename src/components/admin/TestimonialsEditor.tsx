
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Testimonial, getTestimonials, saveTestimonials } from "@/data/testimonialsData";
import { useToast } from "@/components/ui/use-toast";
import { PenSquare, Trash, Save, Plus, Quote, User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TestimonialsEditorProps {
  onSave: () => void;
}

const TestimonialsEditor: React.FC<TestimonialsEditorProps> = ({ onSave }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(getTestimonials());
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    saveTestimonials(testimonials);
    toast({
      title: "Testimonials saved",
      description: "Testimonials have been updated successfully."
    });
    onSave();
  };

  const handleEdit = (testimonial: Testimonial) => {
    setCurrentTestimonial({...testimonial});
    setIsEditDialogOpen(true);
  };

  const handleAdd = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      content: "Enter testimonial content here.",
      author: "Client Name",
      position: "Position",
      company: "Company Name",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    };
    
    setCurrentTestimonial(newTestimonial);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
      toast({
        title: "Testimonial deleted",
        description: "The testimonial has been removed."
      });
    }
  };

  const handleSaveTestimonial = () => {
    if (!currentTestimonial) return;
    
    // Check if we're updating an existing testimonial or adding a new one
    if (testimonials.some(testimonial => testimonial.id === currentTestimonial.id)) {
      setTestimonials(testimonials.map(testimonial => 
        testimonial.id === currentTestimonial.id ? currentTestimonial : testimonial
      ));
    } else {
      setTestimonials([...testimonials, currentTestimonial]);
    }
    
    setIsEditDialogOpen(false);
    setCurrentTestimonial(null);
    
    toast({
      title: "Testimonial saved",
      description: "The testimonial has been updated."
    });
  };

  const updateTestimonialField = (field: keyof Testimonial, value: string) => {
    if (!currentTestimonial) return;
    setCurrentTestimonial({
      ...currentTestimonial,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Testimonials Manager</h2>
        <div className="space-x-2">
          <Button onClick={handleAdd} className="gap-1">
            <Plus size={16} />
            Add Testimonial
          </Button>
          <Button onClick={handleSave} className="gap-1">
            <Save size={16} />
            Save All
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map(testimonial => (
          <Card key={testimonial.id} className="relative overflow-hidden">
            <div className="absolute top-4 right-4 flex gap-1">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                onClick={() => handleEdit(testimonial)}
              >
                <PenSquare size={14} />
              </Button>
              <Button 
                variant="destructive" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleDelete(testimonial.id)}
              >
                <Trash size={14} />
              </Button>
            </div>
            
            <CardHeader className="pb-2">
              <Quote className="text-primary opacity-20 h-10 w-10 mb-2" />
              <CardTitle className="text-lg">"{testimonial.content.substring(0, 60)}..."</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center mt-4 space-x-3">
                {testimonial.image ? (
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="h-10 w-10 rounded-full object-cover border-2 border-primary/20" 
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <User size={20} className="text-muted-foreground" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Testimonial Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentTestimonial?.id ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
            <DialogDescription>
              Make changes to the testimonial details below
            </DialogDescription>
          </DialogHeader>
          
          {currentTestimonial && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="testimonial-content">Testimonial Content</Label>
                <Textarea
                  id="testimonial-content"
                  value={currentTestimonial.content}
                  onChange={(e) => updateTestimonialField("content", e.target.value)}
                  rows={4}
                  placeholder="Enter the testimonial quote here..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="testimonial-author">Author Name</Label>
                  <Input
                    id="testimonial-author"
                    value={currentTestimonial.author}
                    onChange={(e) => updateTestimonialField("author", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="testimonial-position">Position</Label>
                  <Input
                    id="testimonial-position"
                    value={currentTestimonial.position}
                    onChange={(e) => updateTestimonialField("position", e.target.value)}
                    placeholder="CEO"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="testimonial-company">Company</Label>
                <Input
                  id="testimonial-company"
                  value={currentTestimonial.company}
                  onChange={(e) => updateTestimonialField("company", e.target.value)}
                  placeholder="Acme Inc."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="testimonial-image">Profile Image URL</Label>
                <Input
                  id="testimonial-image"
                  value={currentTestimonial.image}
                  onChange={(e) => updateTestimonialField("image", e.target.value)}
                  placeholder="https://example.com/profile.jpg"
                />
                
                {currentTestimonial.image && (
                  <div className="mt-2 border rounded-md p-2 bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-2">Image Preview:</p>
                    <div className="flex justify-center">
                      <img 
                        src={currentTestimonial.image} 
                        alt="Profile Preview" 
                        className="h-20 w-20 object-cover rounded-full border-2 border-primary/20"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTestimonial}>
              Save Testimonial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsEditor;
