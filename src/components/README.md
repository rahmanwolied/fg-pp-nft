# UI Components

## SimpleMinter Component

The `SimpleMinter` component is a minimal UI for minting text NFTs. It demonstrates the use of shadcn components to create a clean, responsive interface.

### Features

- Form with validation for entering NFT name and content
- Mint NFT button with loading state
- Display of minted NFTs

### Component Structure

1. **Form Section**
   - Uses shadcn's Card, Form, Input, and Textarea components
   - Implements form validation with React Hook Form and Zod
   - Provides clear feedback with FormMessage for validation errors

2. **NFT List Section**
   - Displays minted NFTs in a card layout
   - Shows NFT name, creation time, and content
   - Handles empty state with a friendly message

### Usage

```tsx
import { SimpleMinter } from '@/components/SimpleMinter'

export default function YourPage() {
  return <SimpleMinter />
}
```

### Shadcn Components Used

- **Button**: [https://ui.shadcn.com/docs/components/button](https://ui.shadcn.com/docs/components/button)
- **Input**: [https://ui.shadcn.com/docs/components/input](https://ui.shadcn.com/docs/components/input)
- **Textarea**: [https://ui.shadcn.com/docs/components/textarea](https://ui.shadcn.com/docs/components/textarea)
- **Card**: [https://ui.shadcn.com/docs/components/card](https://ui.shadcn.com/docs/components/card)
- **Form**: [https://ui.shadcn.com/docs/components/form](https://ui.shadcn.com/docs/components/form)

### Design Considerations

- **Responsive Layout**: Uses grid layout to adjust for different screen sizes
- **Accessibility**: Includes proper labels and descriptions for form fields
- **User Feedback**: Provides toast notifications for success and error states
- **Loading States**: Disables the submit button and shows loading text during submission

### Customization

The component can be easily customized by modifying the following:

- Form validation rules in the `formSchema` object
- Card styling and layout
- Toast notification messages and appearance
- Placeholder NFT data
