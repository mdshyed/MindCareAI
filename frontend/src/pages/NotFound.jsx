import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
            <div className="p-4 rounded-2xl bg-gradient-primary mb-6">
                <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h2>
            <p className="text-muted-foreground mb-8 max-w-sm">
                The page you are looking for does not exist or has been moved.
            </p>
            <Button asChild className="bg-gradient-primary text-white">
                <Link to="/">Return Home</Link>
            </Button>
        </div>
    );
}
