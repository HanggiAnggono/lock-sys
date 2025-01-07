'use server';

import { apiFetch } from '@/lib/api';
import { createKeyCopy } from '@/lib/modules/key_copies/service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCopy(prev, formData: FormData) {
  let state = { ...prev };
  const key_id = formData.get('key_id') as string;
  const description = formData.get('description') as string;
  const master_key_id = formData.get('master_key_id') as string;

  try {
    await createKeyCopy({
      key_id,
      description,
      master_key_id: Number(master_key_id)
    });

    state = {
      ...prev,
      success: true,
      error: [],
      data: null
    };
  } catch (error) {
    state = {
      success: false,
      error: error as string[],
      data: null,
      formData
    };
  }

  if (!state.success) {
    return state;
  } else {
    redirect(`/keys/${master_key_id}`);
  }
}

export async function deleteCopy(prev, formData: FormData) {
  try {
    const url = formData.get('url') as string;
    const pathToRevalidate = formData.get('pathToRevalidate') as string;
    console.log({ url, pathToRevalidate });

    await apiFetch(url, { method: 'DELETE' });
    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: `error: ${error.message}` };
  }
}
