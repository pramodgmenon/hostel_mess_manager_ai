import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  mobileNumber: z
    .string()
    .min(10, { message: "Mobile number must be at least 10 digits" })
    .max(10, { message: "Mobile number must not exceed 10 digits" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  userType: z.enum(["student", "management"]),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSubmit?: (data: LoginFormValues) => void;
  onForgotPassword?: () => void;
}

const LoginForm = ({
  onSubmit = () => {},
  onForgotPassword = () => {},
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobileNumber: "",
      password: "",
      userType: "student",
      rememberMe: false,
    },
  });

  const handleSubmit = (data: LoginFormValues) => {
    onSubmit(data);
    console.log("Login form submitted:", data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access the Hostel Mess Management System
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>User Type</FormLabel>
                    <div className="flex rounded-md border border-input overflow-hidden">
                      <Button
                        type="button"
                        variant={
                          field.value === "student" ? "default" : "ghost"
                        }
                        className={`flex-1 rounded-none ${field.value === "student" ? "" : "hover:bg-accent"}`}
                        onClick={() => form.setValue("userType", "student")}
                      >
                        Student
                      </Button>
                      <Button
                        type="button"
                        variant={
                          field.value === "management" ? "default" : "ghost"
                        }
                        className={`flex-1 rounded-none ${field.value === "management" ? "" : "hover:bg-accent"}`}
                        onClick={() => form.setValue("userType", "management")}
                      >
                        Management
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        placeholder="Enter your 10-digit mobile number"
                        className="pl-10"
                        type="tel"
                        {...field}
                      />
                    </div>
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
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                        {...field}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        Remember me
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="link"
                className="text-sm font-normal text-primary p-0 h-auto"
                onClick={onForgotPassword}
              >
                Forgot password?
              </Button>
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-center text-sm text-gray-500">
          By logging in, you agree to our Terms of Service and Privacy Policy.
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
