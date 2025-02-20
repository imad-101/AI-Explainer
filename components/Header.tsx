"use client";
import React from "react";
import { Button } from "./ui/button";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 md:px-36 border-b border-indigo-200">
      <Link href="/">
        <h1 className="text-gray-700 text-xl font-semibold">
          Explainer Chatbot
        </h1>
      </Link>
      <div className="flex gap-6 items-center">
        <Link href={"/"}> Home </Link>
        <SignedIn>
          <UserButton></UserButton>
        </SignedIn>
        <SignedOut>
          <Link href={"#account"}>
            <Button className="bg-indigo-700 hover:bg-indigo-800 ">
              Sign In
            </Button>
          </Link>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
