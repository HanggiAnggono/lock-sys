'use client';
import { Spinner } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createKeyAction } from 'app/(dashboard)/actions';
import { useFormState } from 'react-dom';

export default function NewKeyForm() {
  const [state, dispatch, pending] = useFormState(createKeyAction, {
    success: false,
    error: [],
    data: null,
    formData: new FormData()
  });

  return (
    <form className="flex flex-col" action={dispatch}>
      {state.error.length > 0 ? (
        <p className="text-destructive bg-destructive/10 px-4 py-2 rounded">
          {state.error.join('\n')}
        </p>
      ) : null}
      <div className="mb-4">
        <Label htmlFor="master_key_id">Label</Label>
        <Input
          required
          name="label"
          defaultValue={state.formData?.get('label')}
          placeholder="Label"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="key_id">Description</Label>
        <Textarea
          name="description"
          placeholder="Description"
          defaultValue={state.formData.get('description')?.toString()}
          rows={5}
        />
      </div>

      <Button disabled={pending}>
        Submit
        {pending ? <Spinner className="text-primary-foreground ml-2" /> : null}
      </Button>
    </form>
  );
}
