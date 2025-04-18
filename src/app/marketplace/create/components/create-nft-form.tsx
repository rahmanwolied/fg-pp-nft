"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMintNFT } from "@/hooks/use-mint-nft";
import { useWalletStore } from "@/lib/store";
import { UploadCloud } from "lucide-react";
import { useState } from "react";

export default function CreateNFTForm() {
  const { currentAccount } = useWalletStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const { form, handleMint, isProcessing } = useMintNFT();

  if (form.getValues().symbol === undefined) {
    form.setValue("symbol", "");
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    form.setValue("file", file);

    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleMint} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NFT Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a name for your NFT" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symbol</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a symbol for your NFT"
                      value={field.value || ""}
                      onChange={(e) => {
                        const uppercaseValue = e.target.value.toUpperCase();
                        field.onChange(uppercaseValue);
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your NFT"
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide detailed information about your NFT
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (ETH)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="royalty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Royalty (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="15"
                        step="0.1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <FormField
              control={form.control}
              name="file"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>NFT Image</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-center gap-4">
                      <div
                        className={`relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                          filePreview
                            ? "border-primary/50 bg-primary/5"
                            : "border-muted-foreground/25 hover:border-muted-foreground/50"
                        }`}
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                      >
                        {filePreview ? (
                          <div className="relative h-full w-full">
                            <img
                              src={filePreview}
                              alt="NFT Preview"
                              className="h-full w-full rounded-md object-contain p-2"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 p-4 text-center">
                            <UploadCloud className="h-10 w-10 text-muted-foreground" />
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                Drag and drop or click to upload
                              </p>
                              <p className="text-xs text-muted-foreground">
                                JPEG, PNG, GIF or WEBP (max 5MB)
                              </p>
                            </div>
                          </div>
                        )}
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/jpeg,image/png,image/gif,image/webp"
                          className="sr-only"
                          onChange={handleFileChange}
                          {...fieldProps}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || isProcessing}
            className="min-w-32"
          >
            {isSubmitting || isProcessing ? "Creating..." : "Create NFT"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
