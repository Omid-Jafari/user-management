import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PaginationComp from "./common/PaginationComp";
import DeleteUserDialog from "./DeleteUserDialog";
import UserEditDialog from "./UserEditDialog";
import { User } from "@/types/user";

const UserList: React.FC = () => {
  const [openAddEdit, setOpenAddEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchParams] = useSearchParams();
  const page = searchParams?.get("page") || 1;

  // Fetch users with the updated query syntax
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(+page),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users.</p>;

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {data?.data.data.map((user: User) => (
          <li
            key={user.id}
            className="flex items-center justify-between space-x-4 p-2 border rounded"
          >
            <div className="flex items-center space-x-4 mr-auto">
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-10 h-10 rounded-full"
              />
              <Link to={`/users/${user.id}`} className="text-blue-500">
                {user.first_name} {user.last_name}
              </Link>
            </div>

            <Button
              onClick={() => {
                setSelectedUser(user);
                setOpenAddEdit(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setSelectedUser(user);
                setOpenDelete(true);
              }}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <PaginationComp pagesCount={data?.data?.total_pages} />
      {selectedUser?.id ? (
        <UserEditDialog
          userId={selectedUser?.id}
          defaultValues={
            selectedUser
              ? {
                  name:
                    selectedUser?.first_name + " " + selectedUser?.last_name,
                  job: "",
                }
              : undefined
          }
          open={openAddEdit}
          setOpen={setOpenAddEdit}
        />
      ) : null}
      {selectedUser?.id ? (
        <DeleteUserDialog
          userId={selectedUser?.id}
          open={openDelete}
          setOpen={setOpenDelete}
        />
      ) : null}
    </div>
  );
};

export default UserList;
