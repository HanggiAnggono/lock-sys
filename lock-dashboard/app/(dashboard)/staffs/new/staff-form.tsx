'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Staff } from '@/lib/modules/staffs/service';
import toast from 'react-hot-toast';
import { Spinner } from '@/components/icons';
import { saveStaffAction } from 'app/(dashboard)/actions';

export default function StaffForm({ staff }: { staff?: Staff } = {}) {
  const router = useRouter();
  const [state, dispatch, pending] = useActionState(saveStaffAction, {
    success: false,
    error: [],
    data: null as Staff | null,
    formData: new FormData()
  });

  const errors = state.error || [];

  useEffect(() => {
    if (state.success && state.data) {
      toast.success('Staff saved successfully');
      router.push('/staffs');
    }
  }, [state]);

  const defaultValue = (key: string) => {
    return (
      state.formData.get(key)?.toString() || staff?.[key as keyof Staff] || ''
    );
  };

  return (
    <form action={dispatch} className="flex flex-col">
      {errors.length > 0 ? (
        <p className="text-destructive bg-destructive/10 px-4 py-2 rounded">
          {errors.join('\n')}
        </p>
      ) : null}
      <div className="mb-4">
        <label htmlFor="name">Name</label>
        <Input
          required
          name="name"
          placeholder="Name"
          defaultValue={defaultValue('name')}
          disabled={pending}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description">Description</label>
        <Textarea
          name="description"
          placeholder="Description"
          defaultValue={defaultValue('description')}
          disabled={pending}
        />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? <Spinner className="text-primary-foreground" /> : 'Save'}
      </Button>
    </form>
  );
}
