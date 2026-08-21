import { getProfileByUserId } from "@/features/profiles/db/get-profile-by-user-id";
import { SettingsProfileForm } from "@/features/profiles/components/settings-profile-form";
import { PageContainer } from "@/shared/components";
import { SettingsUserForm } from "@/features/profiles/components/settings-user-form";
import { getCurrentSession } from "@/lib/auth/server/session";

export async function SettingsPage() {
    const session = await getCurrentSession();
    const profile = session && await getProfileByUserId(session.user.id);

    if (!profile) {
        return null;
    }

    return (
        <PageContainer className="py-10">
            <div className="mx-auto max-w-xl space-y-9">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Settings
                    </p>
                    <h1 className="mt-1 text-3xl font-bold tracking-tight">
                        General settings
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Update how your profile appears on mainLinks.
                    </p>
                </div>

                <div className="space-y-3">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Account
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Manage your username and display name.
                        </p>
                    </div>
                    <SettingsUserForm
                        email={session.user.email}
                        username={session.user.username}
                        displayName={session.user.name}
                    />
                </div>

                <div className="space-y-3 pt-3">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Profile
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Customize your public profile.
                        </p>
                    </div>
                    <SettingsProfileForm
                        bio={profile.bio}
                        avatarConfig={profile.avatarConfig}
                    />
                </div>
            </div>
        </PageContainer>
    );
}
