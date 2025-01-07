'use client';

import { MehIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="p-4 md:p-6">
      <div className="mb-8 space-y-4">
        <h1 className="font-semibold text-lg md:text-2xl ">
          <MehIcon className="inline mr-3" />
          <span>Something went wrong</span>
        </h1>
      </div>
    </main>
  );
}
