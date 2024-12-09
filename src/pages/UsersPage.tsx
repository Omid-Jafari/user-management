import LogoutDialog from "@/components/LogoutDialog";
import UserList from "../components/UserList";
import UserAddDialog from "@/components/UserAddDialog";

const UsersPage: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl font-bold">Users</h1>
        <div className="space-x-4">
          <LogoutDialog />
          <UserAddDialog />
        </div>
      </div>
      <UserList />
    </div>
  );
};

export default UsersPage;
