// lib/modules/staffs/service.ts
import { apiFetch } from '@/lib/api';
import { NextApiRequest, NextApiResponse } from 'next';

// lib/modules/staffs/types.ts
export interface Staff {
  ID: string;
  name: string;
  description: string;
}

export function getStaffs({ page = 1, pageSize = 10, q = '' }): Promise<{
  data: Staff[];
  totalItems: number;
  totalPage: number;
  currentPage: number;
}> {
  const params = new URLSearchParams();
  params.set('page', page.toString());
  params.set('pageSize', pageSize.toString());
  params.set('q', q);
  const query = params.toString();
  const path = `/api/v1/staffs${params.size > 0 ? `?${query}` : ''}`;

  return apiFetch(path).then((res) => res.data);
}

export async function createStaff(staff: Staff): Promise<Staff> {
  const response = await apiFetch('/api/v1/staffs', {
    method: 'POST',
    body: JSON.stringify(staff)
  });
  return response.data;
}

export async function updateStaff(staff: Staff): Promise<Staff> {
  const response = await apiFetch(`/api/v1/staffs/${staff.ID}`, {
    method: 'PUT',
    body: JSON.stringify(staff)
  });
  return response.data;
}
