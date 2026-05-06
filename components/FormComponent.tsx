"use client";
import { createUser } from "@/actions";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useActionState } from "react";

export default function FormComponent() {

    const [state,action] = useActionState(createUser,undefined) 

  return (
    <form action={action}>
        {state && (
        <p className={state.success ? "text-green-600" : "text-red-600"}>
          {state.message}
        </p>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          {"Create"}
        </Button>
      </div>
    </form>
  );
}
