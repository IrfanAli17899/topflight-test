"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface CheckoutFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("shippingAddress.")) {
      const addressField = field.split(".")[1];
      setFormData(prev => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [addressField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Please enter a valid email";
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "Phone number is required";
    }

    if (!formData.shippingAddress.street.trim()) {
      newErrors["shippingAddress.street"] = "Street address is required";
    }

    if (!formData.shippingAddress.city.trim()) {
      newErrors["shippingAddress.city"] = "City is required";
    }

    if (!formData.shippingAddress.state.trim()) {
      newErrors["shippingAddress.state"] = "State is required";
    }

    if (!formData.shippingAddress.zipCode.trim()) {
      newErrors["shippingAddress.zipCode"] = "ZIP code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <Card className="border-0 shadow-glow glass-card">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="customerName">Full Name *</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => handleInputChange("customerName", e.target.value)}
              className={`rounded-xl ${errors.customerName ? "border-destructive" : ""}`}
              disabled={isSubmitting}
            />
            {errors.customerName && (
              <p className="text-sm text-destructive mt-1">{errors.customerName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="customerEmail">Email Address *</Label>
            <Input
              id="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={(e) => handleInputChange("customerEmail", e.target.value)}
              className={`rounded-xl ${errors.customerEmail ? "border-destructive" : ""}`}
              disabled={isSubmitting}
            />
            {errors.customerEmail && (
              <p className="text-sm text-destructive mt-1">{errors.customerEmail}</p>
            )}
          </div>

          <div>
            <Label htmlFor="customerPhone">Phone Number *</Label>
            <Input
              id="customerPhone"
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => handleInputChange("customerPhone", e.target.value)}
              className={`rounded-xl ${errors.customerPhone ? "border-destructive" : ""}`}
              disabled={isSubmitting}
            />
            {errors.customerPhone && (
              <p className="text-sm text-destructive mt-1">{errors.customerPhone}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card className="border-0 shadow-glow glass-card">
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="street">Street Address *</Label>
            <Input
              id="street"
              value={formData.shippingAddress.street}
              onChange={(e) => handleInputChange("shippingAddress.street", e.target.value)}
              className={`rounded-xl ${errors["shippingAddress.street"] ? "border-destructive" : ""}`}
              disabled={isSubmitting}
            />
            {errors["shippingAddress.street"] && (
              <p className="text-sm text-destructive mt-1">{errors["shippingAddress.street"]}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.shippingAddress.city}
                onChange={(e) => handleInputChange("shippingAddress.city", e.target.value)}
                className={`rounded-xl ${errors["shippingAddress.city"] ? "border-destructive" : ""}`}
                disabled={isSubmitting}
              />
              {errors["shippingAddress.city"] && (
                <p className="text-sm text-destructive mt-1">{errors["shippingAddress.city"]}</p>
              )}
            </div>

            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.shippingAddress.state}
                onChange={(e) => handleInputChange("shippingAddress.state", e.target.value)}
                className={`rounded-xl ${errors["shippingAddress.state"] ? "border-destructive" : ""}`}
                disabled={isSubmitting}
              />
              {errors["shippingAddress.state"] && (
                <p className="text-sm text-destructive mt-1">{errors["shippingAddress.state"]}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                value={formData.shippingAddress.zipCode}
                onChange={(e) => handleInputChange("shippingAddress.zipCode", e.target.value)}
                className={`rounded-xl ${errors["shippingAddress.zipCode"] ? "border-destructive" : ""}`}
                disabled={isSubmitting}
              />
              {errors["shippingAddress.zipCode"] && (
                <p className="text-sm text-destructive mt-1">{errors["shippingAddress.zipCode"]}</p>
              )}
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.shippingAddress.country}
                onChange={(e) => handleInputChange("shippingAddress.country", e.target.value)}
                disabled
                className="rounded-xl"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-xl shadow-glow bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing Order...
          </>
        ) : (
          "Place Order"
        )}
      </Button>
    </form>
  );
}