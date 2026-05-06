import FormComponent from "./FormComponent";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function UserForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New User</CardTitle>
      </CardHeader>
      <CardContent>
        <FormComponent/>
      </CardContent>
    </Card>
  );
}
