'use server';

import { apiFetch } from '@/lib/api';
import { revalidatePath } from 'next/cache';

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
};