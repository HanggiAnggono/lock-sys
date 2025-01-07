'use client';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem
} from '@/components/ui/pagination';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem
} from '@/components/ui/select';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';

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
    header: 'Label'
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
  const table = useReactTable({
    data: keys,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams.toString());
  const pageSize = params.get('pageSize');
  const offset = pageSize * (currentPage - 1);

  function handlePageSizeChange(value: string) {
    router.replace(`${pathname}?page=1&pageSize=${value}`);
  }

  function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get('q') as string;
    params.set('q', q);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mt-4">
      <form onSubmit={handleSearch} className="mb-4">
        <Input
          name="q"
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </form>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-center">
        <div>
          Showing {offset + 1} to {offset + keys.length} of {totalItems} results
        </div>
        <Pagination className="mt-4 w-max mb-4 mx-2">
          <PaginationContent>
            <PaginationItem>
              <Button variant={'ghost'} disabled={currentPage === 1}>
                <Link
                  href={`/keys?page=${currentPage - 1}${pageSize ? `&pageSize=${pageSize}` : ''}`}
                  className="flex items-center size-full"
                >
                  <ChevronLeftIcon />
                  Previous
                </Link>
              </Button>
            </PaginationItem>
            {Array.from({ length: totalPage }, (_, i) => {
              const page = i + 1;
              return (
                <PaginationItem key={page}>
                  <Link
                    href={`/keys?page=${page}${pageSize ? `&pageSize=${pageSize}` : ''}`}
                  >
                    <Button
                      variant={page === currentPage ? 'default' : 'ghost'}
                    >
                      {page}
                    </Button>
                  </Link>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <Button variant={'ghost'} disabled={currentPage === totalPage}>
                <Link
                  href={`/keys?page=${currentPage + 1}${pageSize ? `&pageSize=${pageSize}` : ''}`}
                  className="flex items-center size-full"
                >
                  Next
                  <ChevronRightIcon />
                </Link>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <Select
          defaultValue={pageSize || '10'}
          onValueChange={handlePageSizeChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={`Show ${pageSize || 10} items`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[10, 20, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  Show {pageSize} items
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
