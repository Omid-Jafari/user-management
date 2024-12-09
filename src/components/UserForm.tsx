import { createUser, updateUser } from "../api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserSchema = z.object({
  name: z.string().nonempty("Name is required"),
  job: z.string().nonempty("Job is required"),
});

type UserFormInputs = z.infer<typeof UserSchema>;

const UserForm: React.FC<{
  userId?: number;
  defaultValues?: UserFormInputs;
}> = ({ userId, defaultValues }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input: { id?: number; name: string; job: string }) =>
      input.id ? updateUser(input.id, { name: input.name, job: input.job }) : createUser({ name: input.name, job: input.job }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>({
    defaultValues,
    resolver: zodResolver(UserSchema),
  });
  
  const onSubmit = (data: UserFormInputs) => {
    mutation.mutate({ id: userId, ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("name")} placeholder="Name" />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <Input {...register("job")} placeholder="Job" />
      {errors.job && <p className="text-red-500">{errors.job.message}</p>}

      <Button type="submit">{userId ? "Update User" : "Create User"}</Button>
    </form>
  );
};

export default UserForm;
