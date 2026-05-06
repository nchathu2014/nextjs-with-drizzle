import { deleteUser, getAllUsers } from "@/actions";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import AnotherForm from "./AnotherForm";

export default async function UserList() {
  const users = await getAllUsers();
  console.log(users);

  if (!Array?.isArray(users) || users.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            {!Array.isArray(users) ? "DB Not connected" : "No Users found"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {users?.map((user: any) => (
        <Card key={user?.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{user?.name}</h3>
                  <Badge variant={user?.isActive ? "default" : "secondary"}>
                    {user?.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <p className="text-sm text-muted-foreground">
                  {/* Created: {user?.createdAt} */}
                </p>
              </div>
              <div className="flex gap-2">
               <AnotherForm userId={user?.id}/>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
