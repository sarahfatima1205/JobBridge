import React from "react";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { User2, LogOut, LucideTruckElectric } from "lucide-react";
const Navbar = () => {
  const user=false;
    return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Bridge</span>
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
            {
                !user ? (
                    <div className="flex items-center gap-2">
                    <Button className="text-white" variant="default">
                        Log In
                    </Button>                    
                    <Button variant="outline">
                        SignUp
                    </Button>
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
                <div></div>
              <div className="flex gap-4 space-y-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div>
                    <h4 className="font-medium">Sarah</h4>
                    <p className="text-sm text-muted-foreground">lorem ipsum dolor hsdff</p>
                </div>
                
              </div>
              <div className="flex flex-col text-gray-600 my-2">
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2/>
                    <Button variant="link" className="">View Profile</Button>
                </div>
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut/>
                    <Button variant="link" className="">LogOut</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
                )
            }
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
