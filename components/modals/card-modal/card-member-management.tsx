"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { Edit } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "sonner";

interface ActionsProps {
  data: CardWithList;
}

export default function CardMemberManagement({ data }: ActionsProps) {
  /**
   * States
   */
  const [memberOptions, setMemberOptions] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [cardMembers, setCardMembers] = useState([]);
  const [loadingCardMembersLoading, setLoadingCardMembersLoading] = useState(true);
  const { orgRole } = useAuth();

  /**
   * Methods wrapped with useCallback to stabilize references
   */
  const loadMemberOrgs = useCallback(() => {
    fetch("/api/organization/members-by-curr-auth")
      .then((res) => res.json())
      .then(async (res) => {
        setMemberOptions(
          res.data
            .filter((e: any) => e.role.includes("member"))
            .map((e: any) => {
              return {
                imageUrl: e.publicUserData.imageUrl,
                label: e.publicUserData.identifier,
                value: e.publicUserData.userId,
              };
            })
        );
      });
  }, []);

  const loadCardMembers = useCallback(async () => {
    setLoadingCardMembersLoading(true);
    const localMemberOptions = await fetch("/api/organization/members-by-curr-auth");
    const resLocalMemberOptions = await localMemberOptions.json();

    fetch(`/api/cards/${data.id}/get-members`)
      .then((res) => res.json())
      .then((response) => {
        const userIds = response.map((e: any) => e.userId);
        setCardMembers(resLocalMemberOptions.data.filter((e: any) => userIds.includes(e.publicUserData.userId)));
      })
      .finally(() => {
        setLoadingCardMembersLoading(false);
      });
  }, [data.id]);

  const changeSelectedCardMembers = useCallback(() => {
    fetch(`/api/cards/${data.id}/get-members`)
      .then((res) => res.json())
      .then((response) => {
        const userIds = response.map((e: any) => e.userId);
        setSelectedMembers(memberOptions.filter((e: any) => userIds.includes(e.value)));
      });
  }, [data.id, memberOptions]);

  /**
   * Effects
   */
  useEffect(() => {
    loadMemberOrgs();
    loadCardMembers();
  }, [loadMemberOrgs, loadCardMembers]);

  useEffect(() => {
    if (memberOptions.length > 0) {
      changeSelectedCardMembers();
    } else {
      setSelectedMembers([]);
    }
  }, [memberOptions, changeSelectedCardMembers]);

  const doChangeCardHasMembers = () => {
    fetch(`/api/cards/${data.id}/change-members`, {
      method: "POST",
      body: JSON.stringify({
        users: selectedMembers.map((e: any) => e.value),
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        toast.success("Success, Card member has been changed");
        setOpen(false);
      })
      .finally(() => {
        loadCardMembers();
      });
  };

  return (
    <div>
      {loadingCardMembersLoading ? (
        <Skeleton className="h-20" />
      ) : (
        <div>
          <div className="flex mb-2 items-center gap-x-1.5">
            <h4 className="text-sm">Card Member</h4>
            {orgRole?.includes("admin") ? (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                  <Button size={"icon"} className="w-6 h-6 translate-y-0.5">
                    <Edit />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <h3>Change Board Member</h3>
                  <Select
                    value={selectedMembers}
                    formatOptionLabel={CustomOption}
                    onChange={(val) => {
                      setSelectedMembers(val);
                    }}
                    isMulti={true}
                    options={memberOptions}
                  />
                  <Button
                    onClick={() => {
                      doChangeCardHasMembers();
                    }}>
                    Update
                  </Button>
                </DialogContent>
              </Dialog>
            ) : null}
          </div>
          <ul className="flex flex-wrap gap-1">
            {cardMembers.map((cardMember: any, i: number) => (
              <li key={i}>
                <picture>
                  <img
                    src={cardMember.publicUserData.imageUrl}
                    alt={cardMember.publicUserData.userId}
                    className="w-[25px] rounded-full"
                  />
                </picture>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const CustomOption = ({ label, imageUrl }: { label: string; imageUrl: string }) => (
  <div className="flex items-center gap-x-2">
    <picture>
      <img src={imageUrl} className="w-6 rounded-full aspect-square" alt={label} />
    </picture>
    <span>{label}</span>
  </div>
);
