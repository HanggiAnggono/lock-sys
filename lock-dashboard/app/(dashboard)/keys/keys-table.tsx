'use client';
import { Button } from '@/components/ui/button';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { DataTable } from '@/components/data-table';
import { EditIcon, EyeIcon } from 'lucide-react';
import { DeleteButton } from '@/components/delete-button';

type Key = {
  ID: string;
  label: string;
};

const columnHelper = createColumnHelper<Key>();

const columns = [
  columnHelper.accessor('ID', {
    header: 'ID'
  }),
  columnHelper.accessor('label', {
    header: 'Label',
    cell: (info) => {
      return (
        <Link href={`/keys/${info.row.original.ID}`}>{info.getValue()}</Link>
      );
    }
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Link href={`/keys/${row.original.ID}`}>
            <Button variant="ghost">
              <EyeIcon />
            </Button>
          </Link>
          <Link href={`/keys/${row.original.ID}/edit`}>
            <Button variant="ghost">
              <EditIcon />
            </Button>
          </Link>
          <DeleteButton
            deleteUrl={`/api/v1/keys/${row.original.ID}`}
            revalidatePath="/keys"
          />
        </div>
      );
    }
  })
];

export function KeysTable({
  keys = [],
  currentPage,
  totalItems,
  totalPage
}: {
  keys: Key[];
  totalItems: number;
  totalPage: number;
  currentPage: number;
}) {
  return (
    <DataTable
      columns={columns}
      data={keys}
      currentPage={currentPage}
      totalPage={totalPage}
      totalItems={totalItems}
    />
  );
}
