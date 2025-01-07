import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Copy } from '@/lib/modules/keys/service';

export default function CopiesGrid({ copies = [] }: { copies: Copy[] }) {
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
              <CardFooter></CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
