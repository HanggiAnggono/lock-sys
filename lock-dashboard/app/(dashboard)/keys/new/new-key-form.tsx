'use client';
import { Spinner } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Key } from '@/lib/modules/keys/service';
import { saveKeyAction } from 'app/(dashboard)/actions';
import { redirect } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function NewKeyForm({ masterKey }: { masterKey?: Key }) {
  const [state, dispatch, pending] = useActionState(saveKeyAction, {
    success: false,
    error: null,
    data: null,
    formData: new FormData()
  });

  useEffect(() => {
    if (state.success) {
      redirect(`/keys/${state.data.ID}`);
    } else if (!state.success && state.error) {
      toast.error(state.error);
    }
  }, [state]);

  const errors = state.error || [];

  return (
    <form className="flex flex-col" action={dispatch}>
      {errors && errors.length > 0 ? (
        <p className="text-destructive bg-destructive/10 px-4 py-2 rounded">
          {errors.join('\n')}
        </p>
      ) : null}
      <div className="mb-4">
        {masterKey?.ID && (
          <input type="hidden" name="id" value={masterKey.ID} />
        )}
        <Label htmlFor="master_key_id">Label</Label>
        <Input
          required
          name="label"
          defaultValue={state.formData?.get('label') || masterKey?.label}
          placeholder="Label"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="key_id">Description</Label>
        <Textarea
          name="description"
          placeholder="Description"
          defaultValue={
            state.formData.get('description')?.toString() ||
            masterKey?.description
          }
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
