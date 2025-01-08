import { getKeyById } from '@/lib/modules/keys/service';
import NewKeyForm from '../../new/new-key-form';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';

export default async function EditKey({
  params
}: {
  params: Promise<{ keyId: string }>;
}) {
  const { keyId } = await params;
  const key = await getKeyById(keyId);

  return (
    <div>
      <Breadcrumb className="mb-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/keys">Keys</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/keys/${keyId}`}>{key.label}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-1/3">
        <NewKeyForm masterKey={key} />
      </div>
    </div>
  );
}
