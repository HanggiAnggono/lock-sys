import { getKeys } from '@/lib/modules/keys/service';
import { KeysTable } from './keys-table';

export default async function Keys({ searchParams }) {
  const { page, pageSize } = await searchParams;

  const resp = await getKeys({ page, pageSize });
  const { data: keys, totalItems, totalPage, currentPage } = resp;

  return (
    <div>
      <h1 className="text-xl font-bold">Keys</h1>

      <KeysTable
        keys={keys}
        totalItems={totalItems}
        totalPage={totalPage}
        currentPage={currentPage}
      />
    </div>
  );
}
