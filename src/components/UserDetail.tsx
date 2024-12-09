import { fetchUserDetail } from "../api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserDetail(Number(id)),
  });
  
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading user details.</p>;
  
  const user = data?.data.data;

  return (
    <div className="space-y-4">
      <img
        src={user.avatar}
        alt={user.first_name}
        className="w-20 h-20 rounded-full"
      />
      <p>
        Name: {user.first_name} {user.last_name}
      </p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserDetail;
