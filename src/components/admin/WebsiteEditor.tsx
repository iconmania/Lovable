
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { WebsiteContent, getWebsiteContent, saveWebsiteContent } from "@/data/websiteContent";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Minus, Save } from "lucide-react";

interface WebsiteEditorProps {
  onSave: () => void;
}

const WebsiteEditor: React.FC<WebsiteEditorProps> = ({ onSave }) => {
  const [content, setContent] = useState<WebsiteContent>(getWebsiteContent());
  const { toast } = useToast();

  // Save content to localStorage when it changes
  const handleSave = () => {
    saveWebsiteContent(content);
    toast({
      title: "Content saved",
      description: "Website content has been updated successfully."
    });
    onSave();
  };

  // Update a specific section field
  const updateSectionField = (
    section: keyof WebsiteContent,
    field: string,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Update a specific number in the keyNumbers section
  const updateKeyNumber = (index: number, field: string, value: string) => {
    const updatedNumbers = [...content.keyNumbers.numbers];
    updatedNumbers[index] = {
      ...updatedNumbers[index],
      [field]: value
    };

    setContent((prev) => ({
      ...prev,
      keyNumbers: {
        ...prev.keyNumbers,
        numbers: updatedNumbers
      }
    }));
  };

  // Add a new key number
  const addKeyNumber = () => {
    setContent((prev) => ({
      ...prev,
      keyNumbers: {
        ...prev.keyNumbers,
        numbers: [
          ...prev.keyNumbers.numbers,
          { title: "New Statistic", value: "0", icon: "Star" }
        ]
      }
    }));
  };

  // Remove a key number
  const removeKeyNumber = (index: number) => {
    const updatedNumbers = [...content.keyNumbers.numbers];
    updatedNumbers.splice(index, 1);

    setContent((prev) => ({
      ...prev,
      keyNumbers: {
        ...prev.keyNumbers,
        numbers: updatedNumbers
      }
    }));
  };

  // Update a pricing plan
  const updatePricingPlan = (index: number, field: string, value: any) => {
    const updatedPlans = [...content.pricing.plans];
    updatedPlans[index] = {
      ...updatedPlans[index],
      [field]: value
    };

    setContent((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        plans: updatedPlans
      }
    }));
  };

  // Update a pricing plan feature
  const updatePlanFeature = (planIndex: number, featureIndex: number, value: string) => {
    const updatedPlans = [...content.pricing.plans];
    const updatedFeatures = [...updatedPlans[planIndex].features];
    updatedFeatures[featureIndex] = value;

    updatedPlans[planIndex] = {
      ...updatedPlans[planIndex],
      features: updatedFeatures
    };

    setContent((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        plans: updatedPlans
      }
    }));
  };

  // Add a feature to a pricing plan
  const addPlanFeature = (planIndex: number) => {
    const updatedPlans = [...content.pricing.plans];
    updatedPlans[planIndex] = {
      ...updatedPlans[planIndex],
      features: [...updatedPlans[planIndex].features, "New Feature"]
    };

    setContent((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        plans: updatedPlans
      }
    }));
  };

  // Remove a feature from a pricing plan
  const removePlanFeature = (planIndex: number, featureIndex: number) => {
    const updatedPlans = [...content.pricing.plans];
    const updatedFeatures = [...updatedPlans[planIndex].features];
    updatedFeatures.splice(featureIndex, 1);

    updatedPlans[planIndex] = {
      ...updatedPlans[planIndex],
      features: updatedFeatures
    };

    setContent((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        plans: updatedPlans
      }
    }));
  };

  // Update a contact item
  const updateContactItem = (index: number, field: string, value: string) => {
    if (!content.contact.items) return;
    
    const updatedItems = [...content.contact.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };

    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        items: updatedItems
      }
    }));
  };

  // Update a footer link section
  const updateFooterLinkSection = (index: number, title: string) => {
    const updatedLinks = [...content.footer.links];
    updatedLinks[index] = {
      ...updatedLinks[index],
      title: title
    };

    setContent((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        links: updatedLinks
      }
    }));
  };

  // Update a footer link item
  const updateFooterLink = (sectionIndex: number, itemIndex: number, field: string, value: string) => {
    const updatedLinks = [...content.footer.links];
    const updatedItems = [...updatedLinks[sectionIndex].items];
    
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      [field]: value
    };

    updatedLinks[sectionIndex] = {
      ...updatedLinks[sectionIndex],
      items: updatedItems
    };

    setContent((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        links: updatedLinks
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-1">
          <Save size={16} />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="mb-4">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="numbers">Key Numbers</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                Edit the main hero section content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Title</Label>
                <Input
                  id="hero-title"
                  value={content.hero.title || ""}
                  onChange={(e) => updateSectionField("hero", "title", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Subtitle</Label>
                <Input
                  id="hero-subtitle"
                  value={content.hero.subtitle || ""}
                  onChange={(e) => updateSectionField("hero", "subtitle", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hero-description">Description</Label>
                <Textarea
                  id="hero-description"
                  value={content.hero.description || ""}
                  onChange={(e) => updateSectionField("hero", "description", e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-button-text">Button Text</Label>
                  <Input
                    id="hero-button-text"
                    value={content.hero.buttonText || ""}
                    onChange={(e) => updateSectionField("hero", "buttonText", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hero-button-link">Button Link</Label>
                  <Input
                    id="hero-button-link"
                    value={content.hero.buttonLink || ""}
                    onChange={(e) => updateSectionField("hero", "buttonLink", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hero-image">Image URL</Label>
                <Input
                  id="hero-image"
                  value={content.hero.image || ""}
                  onChange={(e) => updateSectionField("hero", "image", e.target.value)}
                />
                {content.hero.image && (
                  <div className="mt-2 border rounded-md p-2 bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-2">Image Preview:</p>
                    <img 
                      src={content.hero.image} 
                      alt="Hero Preview" 
                      className="max-h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Section */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
              <CardDescription>
                Edit the about section content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about-title">Title</Label>
                <Input
                  id="about-title"
                  value={content.about.title || ""}
                  onChange={(e) => updateSectionField("about", "title", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="about-subtitle">Subtitle</Label>
                <Input
                  id="about-subtitle"
                  value={content.about.subtitle || ""}
                  onChange={(e) => updateSectionField("about", "subtitle", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="about-description">Description</Label>
                <Textarea
                  id="about-description"
                  value={content.about.description || ""}
                  onChange={(e) => updateSectionField("about", "description", e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="about-image">Image URL</Label>
                <Input
                  id="about-image"
                  value={content.about.image || ""}
                  onChange={(e) => updateSectionField("about", "image", e.target.value)}
                />
                {content.about.image && (
                  <div className="mt-2 border rounded-md p-2 bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-2">Image Preview:</p>
                    <img 
                      src={content.about.image} 
                      alt="About Preview" 
                      className="max-h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Key Numbers Section */}
        <TabsContent value="numbers">
          <Card>
            <CardHeader>
              <CardTitle>Key Numbers Section</CardTitle>
              <CardDescription>
                Edit the statistics and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="numbers-title">Section Title</Label>
                <Input
                  id="numbers-title"
                  value={content.keyNumbers.title || ""}
                  onChange={(e) => updateSectionField("keyNumbers", "title", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="numbers-subtitle">Section Subtitle</Label>
                <Input
                  id="numbers-subtitle"
                  value={content.keyNumbers.subtitle || ""}
                  onChange={(e) => updateSectionField("keyNumbers", "subtitle", e.target.value)}
                />
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Statistics</h3>
                  <Button onClick={addKeyNumber} size="sm" variant="outline" className="gap-1">
                    <Plus size={16} />
                    Add Statistic
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {content.keyNumbers.numbers.map((number, index) => (
                    <div key={index} className="border rounded-md p-4 space-y-4 relative">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -right-2 -top-2 h-6 w-6"
                        onClick={() => removeKeyNumber(index)}
                      >
                        <Minus size={14} />
                      </Button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`number-title-${index}`}>Title</Label>
                          <Input
                            id={`number-title-${index}`}
                            value={number.title}
                            onChange={(e) => updateKeyNumber(index, "title", e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`number-value-${index}`}>Value</Label>
                          <Input
                            id={`number-value-${index}`}
                            value={number.value}
                            onChange={(e) => updateKeyNumber(index, "value", e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`number-icon-${index}`}>Icon</Label>
                        <Input
                          id={`number-icon-${index}`}
                          value={number.icon || ""}
                          onChange={(e) => updateKeyNumber(index, "icon", e.target.value)}
                          placeholder="Icon name from Lucide (e.g. Users, CheckCircle)"
                        />
                        <p className="text-xs text-muted-foreground">
                          Use icon names from Lucide React library (Users, CheckCircle, Clock, Trophy, etc.)
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing Section */}
        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Section</CardTitle>
              <CardDescription>
                Edit pricing plans and features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pricing-title">Section Title</Label>
                <Input
                  id="pricing-title"
                  value={content.pricing.title || ""}
                  onChange={(e) => updateSectionField("pricing", "title", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pricing-subtitle">Section Subtitle</Label>
                <Input
                  id="pricing-subtitle"
                  value={content.pricing.subtitle || ""}
                  onChange={(e) => updateSectionField("pricing", "subtitle", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pricing-description">Description</Label>
                <Textarea
                  id="pricing-description"
                  value={content.pricing.description || ""}
                  onChange={(e) => updateSectionField("pricing", "description", e.target.value)}
                  rows={2}
                />
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Pricing Plans</h3>
                
                {content.pricing.plans.map((plan, planIndex) => (
                  <div key={planIndex} className="border rounded-md p-4 mb-6 space-y-4">
                    <h4 className="font-medium border-b pb-2">Plan #{planIndex + 1}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`plan-title-${planIndex}`}>Plan Name</Label>
                        <Input
                          id={`plan-title-${planIndex}`}
                          value={plan.title}
                          onChange={(e) => updatePricingPlan(planIndex, "title", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`plan-price-${planIndex}`}>Price</Label>
                        <Input
                          id={`plan-price-${planIndex}`}
                          value={plan.price}
                          onChange={(e) => updatePricingPlan(planIndex, "price", e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`plan-popular-${planIndex}`}
                          checked={plan.popular || false}
                          onChange={(e) => updatePricingPlan(planIndex, "popular", e.target.checked)}
                          className="mr-2"
                        />
                        <Label htmlFor={`plan-popular-${planIndex}`}>Mark as Popular Plan</Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Features</Label>
                        <Button 
                          onClick={() => addPlanFeature(planIndex)} 
                          size="sm" 
                          variant="outline"
                          className="gap-1"
                        >
                          <Plus size={16} />
                          Add Feature
                        </Button>
                      </div>
                      
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => updatePlanFeature(planIndex, featureIndex, e.target.value)}
                            placeholder="Feature description"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removePlanFeature(planIndex, featureIndex)}
                            className="h-8 w-8 text-destructive"
                          >
                            <Minus size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Section */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Section</CardTitle>
              <CardDescription>
                Edit contact information and details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-title">Section Title</Label>
                <Input
                  id="contact-title"
                  value={content.contact.title || ""}
                  onChange={(e) => updateSectionField("contact", "title", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-subtitle">Section Subtitle</Label>
                <Input
                  id="contact-subtitle"
                  value={content.contact.subtitle || ""}
                  onChange={(e) => updateSectionField("contact", "subtitle", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-description">Description</Label>
                <Textarea
                  id="contact-description"
                  value={content.contact.description || ""}
                  onChange={(e) => updateSectionField("contact", "description", e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                
                {content.contact.items?.map((item, index) => (
                  <div key={item.id} className="border rounded-md p-4 mb-4 space-y-4">
                    <h4 className="font-medium">{item.title}</h4>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`contact-item-title-${index}`}>Title</Label>
                      <Input
                        id={`contact-item-title-${index}`}
                        value={item.title}
                        onChange={(e) => updateContactItem(index, "title", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`contact-item-value-${index}`}>Value</Label>
                      <Input
                        id={`contact-item-value-${index}`}
                        value={item.value || ""}
                        onChange={(e) => updateContactItem(index, "value", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`contact-item-icon-${index}`}>Icon</Label>
                      <Input
                        id={`contact-item-icon-${index}`}
                        value={item.icon || ""}
                        onChange={(e) => updateContactItem(index, "icon", e.target.value)}
                        placeholder="Icon name from Lucide (e.g. Mail, Phone)"
                      />
                      <p className="text-xs text-muted-foreground">
                        Use icon names from Lucide React library (Mail, Phone, MapPin, etc.)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer Section */}
        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle>Footer Section</CardTitle>
              <CardDescription>
                Edit footer content and links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="footer-title">Company Name/Title</Label>
                <Input
                  id="footer-title"
                  value={content.footer.title || ""}
                  onChange={(e) => updateSectionField("footer", "title", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="footer-description">Description</Label>
                <Textarea
                  id="footer-description"
                  value={content.footer.description || ""}
                  onChange={(e) => updateSectionField("footer", "description", e.target.value)}
                  rows={2}
                />
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Footer Links</h3>
                
                {content.footer.links.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border rounded-md p-4 mb-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`footer-section-${sectionIndex}`}>Section Title</Label>
                      <Input
                        id={`footer-section-${sectionIndex}`}
                        value={section.title}
                        onChange={(e) => updateFooterLinkSection(sectionIndex, e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Links</Label>
                      {section.items.map((link, linkIndex) => (
                        <div key={linkIndex} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor={`footer-link-label-${sectionIndex}-${linkIndex}`} className="text-xs">Label</Label>
                            <Input
                              id={`footer-link-label-${sectionIndex}-${linkIndex}`}
                              value={link.label}
                              onChange={(e) => updateFooterLink(sectionIndex, linkIndex, "label", e.target.value)}
                              size="sm"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <Label htmlFor={`footer-link-url-${sectionIndex}-${linkIndex}`} className="text-xs">URL</Label>
                            <Input
                              id={`footer-link-url-${sectionIndex}-${linkIndex}`}
                              value={link.url}
                              onChange={(e) => updateFooterLink(sectionIndex, linkIndex, "url", e.target.value)}
                              size="sm"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteEditor;
