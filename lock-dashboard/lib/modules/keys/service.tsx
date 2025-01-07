import { apiFetch } from '@/lib/api';
import { Copy as KeyCopy } from '../key_copies/service';

export type Key = {
  ID: string;
  label: string;
};

export type Copy = KeyCopy;

export function getKeys({ page = 1, pageSize = 10, q = '' }): Promise<{
  data: Key[];
  totalItems: number;
  totalPage: number;
  currentPage: number;
}> {
  const params = new URLSearchParams();
  params.set('page', page.toString());
  params.set('pageSize', pageSize.toString());
  params.set('q', q);
  const query = params.toString();
  const path = `/api/v1/keys${params.size > 0 ? `?${query}` : ''}`;

  return apiFetch(path).then((res) => res.data);
}

// get key by id
export function getKeyById(id: string): Promise<
  Key & {
    copies: Copy[];
  }
> {
  return apiFetch(`/api/v1/keys/${id}`).then((res) => res.data);
}

export async function createKeyService(payload: {
  label: string;
  description?: string;
}): Promise<Key> {
  const response = await apiFetch('/api/v1/keys', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return response.data;
}
