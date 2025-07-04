export const dynamic = "force-dynamic";

import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";
import { ActivityList } from "./_components/activity-list";

const ActivityPage = () => {
    return(
        <div className="w-full">
       <Info/>
       <Separator className="my-2"/>
       <Suspense fallback={<ActivityList.Skeleton />}></Suspense>
       <ActivityList/>
        </div>
    );
};

export default ActivityPage;
