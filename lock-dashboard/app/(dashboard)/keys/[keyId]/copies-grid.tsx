import { DeleteButton } from '@/components/delete-button';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Copy } from '@/lib/modules/keys/service';
import { EditIcon } from 'lucide-react';
import Link from 'next/link';

export default function CopiesGrid({
  copies = [],
  masterKeyId
}: {
  copies: Copy[];
  masterKeyId: string;
}) {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Copies</h1>
      <div className="grid grid-cols-3 gap-4">
        {copies.map((copy) => (
          <div key={copy.key_id}>
            <Card>
              <CardHeader>
                <CardTitle>{copy.key_id}</CardTitle>
                <CardDescription>
                  {copy.status.replace('_', ' ')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{copy.description}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/keys/${masterKeyId}/copies/${copy.ID}/edit`}>
                  <Button type="button" variant="ghost">
                    <EditIcon />
                  </Button>
                </Link>
                <DeleteButton
                  key={copy.ID}
                  deleteUrl={`/api/v1/copies/${copy.ID}`}
                  revalidatePath={`/keys/${masterKeyId}`}
                />
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
