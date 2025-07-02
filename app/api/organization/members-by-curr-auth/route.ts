export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function GET(req: Request, { params }: { params: { cardId: string } }) {
    try {
        const { orgId } = auth();
        const organizations = await clerkClient.organizations.getOrganizationMembershipList({ organizationId: orgId ? orgId : "" });
        return NextResponse.json(organizations);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
