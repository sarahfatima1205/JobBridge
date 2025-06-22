import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";

const Login = () => {
  return (
    <div className="bg-[#e3d8ff] min-h-screen flex flex-col">
      <Navbar/>
      <div className="flex flex-1 justify-center items-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Login to <span className="text-[#8000ff]">JobBridge</span>
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Welcome back! Enter your details below.
          </p>

          <div className="space-y-4">
            <div>
              <div className="space-y-2">
              <Label>Email address</Label>
              <Input type="email" placeholder="sarah@email.com" />
            </div>
            </div>
            <div>
              <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            </div>
            <Button className="w-full bg-[#8000ff] hover:bg-[#6a00cc] text-white">
              Log In
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#8000ff] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
