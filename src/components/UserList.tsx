import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, deleteUser } from "../api";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UserList: React.FC = () => {
  const queryClient = useQueryClient();

  // Fetch users with the updated query syntax
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(1),
  });

  // Delete mutation with updated syntax
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      alert("Failed to delete user");
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users.</p>;

  return (
    <div className="space-y-4">
      <Button onClick={() => refetch()}>Refresh</Button>
      <ul className="space-y-2">
        {data?.data.data.map((user: { id: number; avatar: string | undefined; first_name: string; last_name: string; }) => (
          <li
            key={user.id}
            className="flex items-center justify-between space-x-4 p-2 border rounded"
          >
            <div className="flex items-center space-x-4">
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
              onClick={() => handleDelete(user.id)}
              variant="destructive"
              size="sm"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
