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
            <BreadcrumbLink asChild href="/keys">
              <Link href="/keys">Keys</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{key.label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-xl font-bold">{key.label}</h1>

      <div className="my-10">
        {key !== null && <CopiesGrid masterKeyId={keyId} copies={key.copies} />}
      </div>
    </div>
  );
}
