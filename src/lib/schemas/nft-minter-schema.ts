import * as z from 'zod';

export const nftMinterFormSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
	contentType: z.enum(['text', 'image']),
	content: z.union([
		z.string().min(1, 'Content is required').max(5000, 'Content is too long'),
		z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB'),
	]),
});

export type NFTMinterFormValues = z.infer<typeof nftMinterFormSchema>; 