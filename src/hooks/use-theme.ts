import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
	const { setTheme, theme } = useNextTheme();
	return { setTheme, theme };
}
