import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const UsersPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Users</h1>
        <div className="space-x-4">
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close Form" : "Add User"}
          </Button>
        </div>
      </div>
      {showForm && <UserForm />}
      <UserList />
    </div>
  );
};

export default UsersPage;
