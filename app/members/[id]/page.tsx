import { DashboardLayout } from "@/components/dashboard-layout"
import { MemberProfile } from "@/components/member-profile"

interface MemberProfilePageProps {
  params: {
    id: string
  }
}

export default function MemberProfilePage({ params }: MemberProfilePageProps) {
  return (
    <DashboardLayout>
      <MemberProfile memberId={params.id} />
    </DashboardLayout>
  )
}
