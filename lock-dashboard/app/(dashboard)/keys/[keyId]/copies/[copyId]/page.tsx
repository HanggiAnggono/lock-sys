import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import CopyForm from '../new/copy-form';
import { getCopyById } from '@/lib/modules/key_copies/service';
import { getKeyById } from '@/lib/modules/keys/service';

export default async function CopyDetail({
  params
}: {
  params: Promise<{ keyId: string; copyId: string }>;
}) {
  const { keyId, copyId } = await params;
  const masterKey = await getKeyById(keyId);
  const copy = await getCopyById(copyId);

  return (
    <div className="w-1/3">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/keys">Keys</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/keys/${copyId}`}>
              {copy.key_id}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-xl font-bold mb-10">Edit {copy.key_id}</h1>

      <CopyForm masterKey={masterKey} copy={copy} />
    </div>
  );
}
