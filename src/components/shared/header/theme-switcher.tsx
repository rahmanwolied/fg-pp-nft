import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export function ThemeSwitcher() {
	const { setTheme } = useTheme();
	const [isDark, setIsDark] = useState(false);
	const toggleTheme = () => {
		setIsDark(!isDark);
		setTheme(isDark ? 'dark' : 'light');
	};
	return (
		<div className="flex items-center space-x-2">
			<Switch id="theme" checked={isDark} onCheckedChange={toggleTheme} />
			<Label htmlFor="theme">{isDark ? <Moon /> : <Sun />}</Label>
		</div>
	);
}
