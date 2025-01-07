import { getKeys } from '@/lib/modules/keys/service';
import { KeysTable } from './keys-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

export default async function Keys({ searchParams }) {
  const { page, pageSize, q } = await searchParams;

  const resp = await getKeys({ page, pageSize, q });
  const { data: keys, totalItems, totalPage, currentPage } = resp;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Keys</h1>
        <Link href="/keys/new">
          <Button>
            <PlusIcon className="size-4 mr-2" />
            Create Key
          </Button>
        </Link>
      </div>

      <KeysTable
        keys={keys}
        totalItems={totalItems}
        totalPage={totalPage}
        currentPage={currentPage}
      />
    </div>
  );
}
