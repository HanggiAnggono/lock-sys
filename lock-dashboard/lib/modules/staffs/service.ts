// lib/modules/staffs/service.ts
import { apiFetch } from '@/lib/api';
import { NextApiRequest, NextApiResponse } from 'next';

// lib/modules/staffs/types.ts
export interface Staff {
  ID: string;
  name: string;
  description: string;
}

export async function getStaffs(): Promise<{
  data: Staff[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}> {
  const response = await apiFetch('/api/v1/staffs');
  return response.data;
}
