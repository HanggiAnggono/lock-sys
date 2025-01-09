import { apiFetch } from '@/lib/api';

export type Copy = {
  ID: string;
  key_id: string;
  master_key_id: string;
  description: string;
  status:
    | 'AVAILABLE'
    | 'CHECKED_OUT'
    | 'LOST'
    | 'DAMAGED'
    | 'STOLEN'
    | 'RETIRED'
    | 'DESTROYED';
};
export type CreateCopyPayload = {
  key_id: string;
  description: string;
  master_key_id: number;
};

// get copy by ID
export function getCopyById(id: string): Promise<Copy> {
  return apiFetch(`/api/v1/copies/${id}`).then((res) => res.data);
}

export async function createKeyCopy(payload: CreateCopyPayload) {
  const { key_id, description, master_key_id } = payload;
  try {
    const data = await apiFetch('/api/v1/copies', {
      method: 'POST',
      body: JSON.stringify({ key_id, description, master_key_id })
    });
    return Promise.resolve(data as Copy);
  } catch (error) {
    throw error;
  }
}
