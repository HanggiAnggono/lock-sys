'use client';
import { TrashIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useActionState, useRef } from 'react';
import { Spinner } from './icons';
import { deleteCopy } from 'app/(dashboard)/actions';

export function DeleteButton({
  deleteUrl,
  revalidatePath: pathToRevalidate
}: {
  deleteUrl: string;
  revalidatePath?: string;
}) {
  const [state, dispatch, pending] = useActionState(deleteCopy, {
    success: false,
    error: null
  });

  return (
    <form action={dispatch}>
      <input type="hidden" name="url" value={deleteUrl} />
      <input type="hidden" name="pathToRevalidate" value={pathToRevalidate} />
      <Button
        variant="ghost"
        disabled={pending}
        onClick={(e) => {
          if (confirm('Are you sure?')) {
            e.currentTarget.form?.requestSubmit();
          }
        }}
      >
        {pending ? <Spinner /> : <TrashIcon />}
      </Button>
    </form>
  );
}
