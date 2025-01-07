import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
  return (
    <div className="container">
      <h1 className="text-4xl font-bold mt-4 mb-8">
        Get started with Lock Management
      </h1>
      <p className="mb-10">Start managing your keys with Lock Management Dashboard 🚀 <br/> Create your keys here</p>
      <Link href="/keys" className="text-blue-600 underline">
        <Button>Start managing your keys</Button>
      </Link>
    </div>
  );
}
