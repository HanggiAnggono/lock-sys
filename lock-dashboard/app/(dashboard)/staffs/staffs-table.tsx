'use client';
import { DataTable } from '@/components/data-table';
import { DeleteButton } from '@/components/delete-button';
import { Button } from '@/components/ui/button';
import { Staff } from '@/lib/modules/staffs/service';
import { EditIcon } from 'lucide-react';
import Link from 'next/link';

export default function StaffsTable({
  data,
  currentPage,
  totalPage,
  totalItems
}: {
  data: Staff[];
  currentPage: number;
  totalPage: number;
  totalItems: number;
}) {
  return (
    <DataTable
      data={data}
      currentPage={currentPage}
      totalPage={totalPage}
      totalItems={totalItems}
      columns={[
        {
          header: 'ID',
          accessorKey: 'ID'
        },
        {
          header: 'Name',
          accessorKey: 'name'
        },
        {
          header: 'Description',
          accessorKey: 'description'
        },
        {
          id: 'actions',
          cell: ({ row }) => {
            return (
              <div className="flex items-center">
                <Link href={`/staffs/${row.original.ID}/edit`}>
                  <Button variant="ghost">
                    <EditIcon />
                  </Button>
                </Link>
                <DeleteButton
                  deleteUrl={`/api/v1/staffs/${row.original.ID}`}
                  revalidatePath="/staffs"
                />
              </div>
            );
          }
        }
      ]}
    />
  );
}
