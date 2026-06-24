import { Compass } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ClearPath AI</h1>
            <p className="text-sm text-gray-600">Turn confusion into clarity</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// Made with Bob
