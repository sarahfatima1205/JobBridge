import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
    file: null,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  return (
    <div className="bg-[#e3d8ff] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 justify-center items-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-blue-900">
            Create your <span className="text-black">Job</span><span className="text-[#8000ff]">Bridge</span> account
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Enter your details to sign up.
          </p>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                name="fullname"
                placeholder="Sarah Fatima"
                value={input.fullname}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Email address</Label>
              <Input
                type="email"
                name="email"
                placeholder="sarah@email.com"
                value={input.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                type="tel"
                name="phone"
                placeholder="9876543210"
                value={input.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={input.password}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label className="block mb-1"></Label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={handleChange}
                  />
                  <span>Student</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={handleChange}
                  />
                  <span>Recruiter</span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Label>Profile image</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#8000ff] hover:bg-[#6a00cc] text-white"
            >
              Sign Up
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#8000ff] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
