import React from "react";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { User2, LogOut } from "lucide-react";
import { Link } from 'react-router-dom';


const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white top-0 left-0 right-0 shadow-md fixed z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-purple-700">Bridge</span>
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button
                variant="ghost"
                className="rounded-xl px-5 py-2 text-sm hover:bg-gray-100"
              >
                Log In
              </Button>
              </Link>
              <Link to="/signup"><Button
                className="bg-purple-700 hover:bg-purple-800 text-white rounded-xl px-5 py-2 text-sm"
              >
                SignUp
              </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Sarah</h4>
                    <p className="text-sm text-muted-foreground">
                      lorem ipsum dolor hsdff
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600 my-2 space-y-1">
                  <div className="flex w-fit items-center gap-2">
                    <User2 className="text-muted-foreground" size={18} />
                    <Button
                      variant="ghost"
                      className="text-sm px-2 py-1 h-auto"
                    >
                      View Profile
                    </Button>
                  </div>
                  <div className="flex w-fit items-center gap-2">
                    <LogOut className="text-muted-foreground" size={18} />
                    <Button
                      variant="ghost"
                      className="text-sm px-2 py-1 h-auto"
                    >
                      LogOut
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
