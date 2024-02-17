import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { graphql } from "@/__generated__";
import { Link, Navigate, createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@apollo/client";

export const Route = createFileRoute("/signup")({
  component: SignUp,
});

const RegisterMutation = graphql(`
  mutation RegisterMutation($username: String!, $password: String!) {
    registerUser(input: { password: $password, username: $username }) {
      username
    }
  }
`);

const formSchema = z.object({
  username: z.string().min(3).max(24),
  password: z.string().min(6),
});

function RegisterForm() {
  const [mutate, { data, loading, error }] = useMutation(RegisterMutation);

  function handleSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      variables: values,
    });

    if (data) {
      return <Navigate to="/dashboard" replace={true} />;
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Account</Button>
      </form>
    </Form>
  );
}

export default function SignUp() {
  return (
    <Card className="max-w-[400px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account.</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter>
        <p>
          Already have an account?{" "}
          <Link className="underline" to="/signin">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
