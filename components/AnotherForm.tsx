"use client";
import { deleteUser } from "@/actions";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useActionState,useEffect } from "react";
import {toast} from 'sonner'
import { useRouter } from "next/navigation";

export default function AnotherForm({ userId }: { userId: number }) {
  const [state, action] = useActionState(deleteUser, undefined);
    const router = useRouter();

   useEffect(() => {
    if (state === undefined) return; // ✅ skip initial render
    
    if (state.success) {
      toast.success(state.message);
       setTimeout(() => router.refresh(), 1500); // ✅ refresh AFTER toast shows
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={action}>
      <input type="hidden" name="id" value={userId} />{" "}

      {state && <p className="text-red-600">{state.message}</p>}
      <Button variant={"destructive"} size={"sm"} type="submit">
        <Trash2 className="h-4 w-4" />
      </Button>
    </form>
  );
}
