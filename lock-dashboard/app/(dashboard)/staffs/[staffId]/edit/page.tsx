import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { getStaffById } from '@/lib/modules/staffs/service';
import StaffForm from '../../staff-form';

export default async function EditStaff({
  params
}: {
  params: Promise<{ staffId: string }>;
}) {
  const { staffId } = await params;
  const staff = await getStaffById(staffId);

  return (
    <div>
      <Breadcrumb className="mb-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/staffs">Staffs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/staffs/${staffId}`}>
              {staff.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-1/3">
        <StaffForm staff={staff} />
      </div>
    </div>
  );
}
