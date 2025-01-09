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
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody
} from '@/components/ui/table';

export default async function Staffs() {
  const { data: staffs = [] } = await getStaffs();

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

      <StaffsTable staffs={staffs} />
    </div>
  );
}

interface StaffsTableProps {
  staffs: Staff[];
}

function StaffsTable({ staffs }: StaffsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {staffs.map((staff) => (
          <TableRow key={staff.ID}>
            <TableCell>{staff.ID}</TableCell>
            <TableCell>{staff.name}</TableCell>
            <TableCell>{staff.description || '-'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
