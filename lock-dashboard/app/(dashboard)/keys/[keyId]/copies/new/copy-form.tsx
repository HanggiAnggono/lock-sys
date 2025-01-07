'use client';

import { Spinner } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Key } from '@/lib/modules/keys/service';
import { createCopy } from 'app/(dashboard)/actions';
import { useActionState } from 'react';

export default function CopyForm({ masterKey }: { masterKey: Key }) {
  const { ID: keyId, label } = masterKey;

  const [state, dispatch, pending] = useActionState(createCopy, {
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
        <Label htmlFor="master_key_id">Master Key</Label>
        <input
          type="hidden"
          name="master_key_id"
          value={keyId}
          readOnly
          className="hidden"
        />
        <Input
          value={label}
          readOnly
          className="text-muted-foreground cursor-not-allowed"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="key_id">Key Label</Label>
        <Input
          required
          name="key_id"
          placeholder="Key Label"
          defaultValue={state.formData.get('key_id')?.toString()}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="description">Key Description</Label>
        <Textarea
          name="description"
          placeholder="Description"
          rows={4}
          defaultValue={state.formData.get('description')?.toString()}
        />
      </div>

      <Button disabled={pending}>
        Submit
        {pending ? <Spinner className="text-primary-foreground ml-2" /> : null}
      </Button>
    </form>
  );
}
