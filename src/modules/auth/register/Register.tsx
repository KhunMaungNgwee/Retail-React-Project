import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/api";
import { hideLoader, openLoader } from "@/store/features/loaderSlice";

// Updated Form Schema with validation for username, password, and role
const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  role: z.string().min(3, {
    message: "Role must be at least 3 characters.",
  }),
});

function Register() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "",
    },
  });

  const { mutate: addUser } = api.user.addNewUser.useMutation({
    onMutate: () => openLoader(),
    onSuccess: () => {
      toast({
        title: "Add New User Success",
        description: "User",
      });
      form.reset();
    },
    onError: (error: any) => {
      console.error("Error", error);
      toast({
        title: "Error",
        description: "There was an error adding the user.",
        variant: "destructive",
      });
 
    },
    onSettled: () => hideLoader(),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Use the data directly from the form
    const payloadData = {
      email: data.username, // assuming username is used as email
      password: data.password,
      role: data.role,
    };

    addUser(payloadData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role Field */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Role</FormLabel>
              <FormControl>
                <Input placeholder="Enter user role" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="text-center">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default Register;
