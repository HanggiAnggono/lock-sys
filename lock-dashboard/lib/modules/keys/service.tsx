import { apiFetch } from '@/lib/api';

type Key = {
  ID: string;
  label: string;
};

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
