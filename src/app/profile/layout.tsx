import { ProfileSidebar } from "@/components/profile/profile-sidebar";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-24 pb-28 md:pb-16 px-4 md:px-6 container mx-auto max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <ProfileSidebar />
        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  );
}