'use client'

import { useState } from 'react'
import { toast } from 'sonner'

// Import shadcn components
// See: https://ui.shadcn.com/docs/components/button
import { Button } from '@/components/ui/button'
// See: https://ui.shadcn.com/docs/components/input
import { Input } from '@/components/ui/input'
// See: https://ui.shadcn.com/docs/components/textarea
import { Textarea } from '@/components/ui/textarea'
// See: https://ui.shadcn.com/docs/components/card
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// See: https://ui.shadcn.com/docs/components/form
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

// Import React Hook Form and Zod for form validation
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  content: z.string().min(1, 'Content is required').max(5000, 'Content is too long'),
})

type FormValues = z.infer<typeof formSchema>

// Define a type for our NFT items
type NFT = {
  id: string
  name: string
  content: string
  createdAt: number
}

export function NftMinter() {
  // State to store minted NFTs (placeholder data for now)
  const [nfts, setNfts] = useState<NFT[]>([
    {
      id: '1',
      name: 'My First NFT',
      content: 'This is a sample NFT content that would be encrypted in a real application.',
      createdAt: Date.now() - 86400000, // 1 day ago
    },
    {
      id: '2',
      name: 'Secret Message',
      content: 'Another example of encrypted content that only the owner can see.',
      createdAt: Date.now() - 3600000, // 1 hour ago
    },
  ])
  
  // State to track loading state
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize React Hook Form
  // See: https://ui.shadcn.com/docs/components/form#form-with-react-hook-form-and-zod
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      content: '',
    },
  })

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create a new NFT object
      const newNft: NFT = {
        id: `nft-${Date.now()}`,
        name: values.name,
        content: values.content,
        createdAt: Date.now(),
      }
      
      // Add the new NFT to our list
      setNfts(prev => [newNft, ...prev])
      
      // Show success notification
      toast.success('NFT created successfully', {
        description: `Your NFT "${values.name}" has been minted.`,
      })
      
      // Reset form
      form.reset()
    } catch (error) {
      toast.error('Failed to create NFT', {
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Text NFT Minter</h1>
      <p className="text-center mb-8 text-muted-foreground">
        Create encrypted text NFTs using Lit Protocol and store them on IPFS
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* NFT Minter Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Mint a Text NFT</CardTitle>
              <CardDescription>
                Enter text content to mint as an NFT. Your content will be encrypted and stored on IPFS.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Form component using shadcn's Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NFT Name</FormLabel>
                        <FormControl>
                          <Input placeholder="My Secret Text NFT" {...field} />
                        </FormControl>
                        <FormDescription>
                          Give your NFT a unique name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter the text content you want to encrypt and mint as an NFT..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This content will be encrypted and only accessible to NFT owners.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Mint NFT Button */}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Minting...' : 'Mint NFT'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        {/* NFT List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your NFTs</CardTitle>
              <CardDescription>
                View your minted NFTs
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Display NFT list */}
              <div className="space-y-4">
                {nfts.length === 0 ? (
                  <p className="text-center text-muted-foreground">No NFTs minted yet</p>
                ) : (
                  nfts.map((nft) => (
                    <Card key={nft.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{nft.name}</CardTitle>
                        <CardDescription className="text-xs">
                          Created: {new Date(nft.createdAt).toLocaleString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="p-3 bg-muted rounded-md">
                          <p className="whitespace-pre-wrap text-sm">{nft.content}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
