import { graphql } from "@/__generated__";
import { useAuth, useSignIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/signin")({
  component: SignIn,
});

const formSchema = z.object({
  username: z.string().min(3).max(24),
  password: z.string().min(6),
});

function SignInForm() {
  const auth = useAuth();
  const navigate = useNavigate();

  function handleSubmit(values: z.infer<typeof formSchema>) {
    const { mutate, error, loading, data } = useSignIn(values);
    mutate({
      variables: values,
    });
    if (error) return <p>Error...</p>;

    navigate({
      to: "/dashboard",
    });
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
        <Button type="submit">Sign In</Button>
      </form>
    </Form>
  );
}

export default function SignIn() {
  return (
    <Card className="max-w-[400px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter>
        <p>
          Don't have an account?{" "}
          <Link className="underline" to="/signup">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
