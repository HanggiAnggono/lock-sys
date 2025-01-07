import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import CopyForm from './copy-form';
import { getKeyById } from '@/lib/modules/keys/service';

export default async function NewCopyPage({
  params
}: {
  params: Promise<{ keyId: string }>;
}) {
  const { keyId } = await params;
  const key = await getKeyById(keyId);

  return (
    <div className="w-1/3">
      <Breadcrumb className="mb-4">
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
            <BreadcrumbPage>New</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-xl font-bold mb-10">Create New Copy</h1>

      <CopyForm masterKey={key} />
    </div>
  );
}
