// app/(dashboard)/staffs/page.tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { getStaffs, Staff } from '@/lib/modules/staffs/service';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { DataTable } from '@/components/data-table';

export default async function Staffs({
  searchParams
}: Promise<{
  searchParams: {
    page: string;
    pageSize: string;
    q: string;
  };
}>) {
  const { page, pageSize, q } = await searchParams;
  const {
    data: staffs = [],
    currentPage,
    totalItems,
    totalPage
  } = await getStaffs({ page, pageSize, q: q || '' });

  return (
    <div>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/staffs">Staffs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Staff List</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Staffs</h1>
        <Link href="/staffs/new">
          <Button>
            <PlusIcon className="size-4 mr-2" />
            Create Staff
          </Button>
        </Link>
      </div>

      <DataTable
        data={staffs}
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
          }
        ]}
      />
    </div>
  );
}

interface StaffsTableProps {
  staffs: Staff[];
}
