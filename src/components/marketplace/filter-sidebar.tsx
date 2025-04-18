"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  marketplaceFilterSchema,
  MarketplaceFilterValues,
} from "@/lib/schemas/marketplace-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, SlidersHorizontal } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

interface FilterSidebarProps {
  onFilterChange: (values: MarketplaceFilterValues) => void;
  className?: string;
}

type SortBy =
  | "newest"
  | "oldest"
  | "name_asc"
  | "name_desc"
  | "price_asc"
  | "price_desc";
type Category =
  | "all"
  | "art"
  | "collectibles"
  | "domain"
  | "music"
  | "photography"
  | "sports"
  | "utility";

export function FilterSidebar({
  onFilterChange,
  className = "",
}: FilterSidebarProps) {
  const form = useForm<MarketplaceFilterValues>({
    resolver: zodResolver(marketplaceFilterSchema),
    defaultValues: {
      search: "",
      sortBy: "newest",
      category: "all",
      priceRange: { min: 0, max: 1000 },
      onlyVerified: false,
    },
  });

  // Use a debounced handler to avoid infinite update loops
  const handleFieldChange = useCallback(
    (updateValues = true) => {
      // Use setTimeout to break the synchronous update cycle
      if (updateValues) {
        setTimeout(() => {
          onFilterChange(form.getValues());
        }, 0);
      }
    },
    [form, onFilterChange]
  );

  // Individual change handlers
  const handleSortChange = (value: SortBy) => {
    form.setValue("sortBy", value);
    handleFieldChange();
  };

  const handleCategoryChange = (value: Category) => {
    form.setValue("category", value);
    handleFieldChange();
  };

  const handleVerifiedChange = (checked: boolean) => {
    form.setValue("onlyVerified", checked);
    handleFieldChange();
  };

  const handlePriceChange = (field: "min" | "max", value: number) => {
    const currentPriceRange = form.getValues().priceRange;
    form.setValue("priceRange", {
      ...currentPriceRange,
      [field]: value,
    });
    handleFieldChange();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("search", e.target.value);
    handleFieldChange();
  };

  const handleReset = () => {
    form.reset();
    handleFieldChange();
  };

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <SlidersHorizontal className="mr-2 h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <Form {...form}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search NFTs..."
                        className="pl-8"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleSearchChange(e);
                        }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="sortBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort By</FormLabel>
                    <FormControl>
                      <Tabs
                        defaultValue={field.value}
                        className="w-full"
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleSortChange(value as SortBy);
                        }}
                      >
                        <TabsList className="grid grid-cols-2 w-full">
                          <TabsTrigger value="newest">Newest</TabsTrigger>
                          <TabsTrigger value="price_asc">
                            Price: Low to High
                          </TabsTrigger>
                        </TabsList>
                        <TabsList className="grid grid-cols-2 w-full mt-1">
                          <TabsTrigger value="oldest">Oldest</TabsTrigger>
                          <TabsTrigger value="price_desc">
                            Price: High to Low
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <ScrollArea className="h-40 rounded-md border">
                        <div className="p-4 space-y-3">
                          {[
                            "all",
                            "art",
                            "collectibles",
                            "domain",
                            "music",
                            "photography",
                            "sports",
                            "utility",
                          ].map((category) => (
                            <div
                              key={category}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="radio"
                                id={category}
                                checked={field.value === category}
                                onChange={() => {
                                  field.onChange(category);
                                  handleCategoryChange(category as Category);
                                }}
                                className="h-4 w-4 border border-primary"
                              />
                              <Label htmlFor={category} className="capitalize">
                                {category}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="onlyVerified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Verified Only</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          handleVerifiedChange(checked);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <FormLabel>Price Range (ETH)</FormLabel>
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="priceRange.min"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Min"
                          {...field}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            field.onChange(value);
                            handlePriceChange("min", value);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <span>to</span>
                <FormField
                  control={form.control}
                  name="priceRange.max"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Max"
                          {...field}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            field.onChange(value);
                            handlePriceChange("max", value);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button className="w-full" type="button" onClick={handleReset}>
              Reset Filters
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
