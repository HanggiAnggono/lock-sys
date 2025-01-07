import { apiFetch } from '@/lib/api';

type Key = {
  ID: string;
  label: string;
};

export function getKeys({ page = 1, pageSize = 10 }): Promise<{
  data: Key[];
  totalItems: number;
  totalPage: number;
  currentPage: number;
}> {
  const params = new URLSearchParams();
  params.set('page', page.toString());
  params.set('pageSize', pageSize.toString());
  const query = params.toString();
  const path = `/api/v1/keys${params.size > 0 ? `?${query}` : ''}`;

  return apiFetch(path).then((res) => res.data);
}
