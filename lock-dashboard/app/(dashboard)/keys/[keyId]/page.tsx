import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { getKeyById } from '@/lib/modules/keys/service';
import Link from 'next/link';
import CopiesGrid from './copies-grid';
import { Button } from '@/components/ui/button';
import { EditIcon, PlusIcon } from 'lucide-react';

export default async function KeyDetail({
  params
}: {
  params: Promise<{ keyId: string }>;
}) {
  const { keyId } = await params;
  const key = await getKeyById(keyId);

  return (
    <div>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/keys">Keys</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{key.label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">
          <span>{key.label}</span>
          <Link href={`/keys/${keyId}/edit`} className="ml-2 inline-block">
            <EditIcon className="translate-y-1" />
          </Link>
        </h1>
        <Link href={`/keys/${keyId}/copies/new`}>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Copy
          </Button>
        </Link>
      </div>

      <p>{key.description}</p>

      <div className="my-10">
        {key !== null && (
          <CopiesGrid masterKeyId={keyId} copies={key.copies || []} />
        )}
      </div>
    </div>
  );
}
