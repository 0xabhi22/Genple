"use client";

import Link from "next/link";
import { MainNavItem } from "@/types";
import { cn } from "@/lib/utils";
import useScroll from "@/hooks/use-scroll";
import { Button, buttonVariants } from "@/components/ui/button";

import { MainNav } from "./main-nav";
import { UserAccountNav } from "./user-account-nav";

interface NavBarProps {
  items?: MainNavItem[];
  user?: any;
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
  scroll?: boolean;
}

export function NavBar({
  items,
  user,
  children,
  rightElements,
  scroll = false,
}: NavBarProps) {
  const scrolled = useScroll(50);

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${scroll ? (scrolled ? "border-b" : "bg-background/0") : "border-b"
        }`}
    >
      <div className="w-full p-4 flex h-16 items-center justify-between">
        <MainNav items={items}>{children}</MainNav>

        <div className="flex items-center space-x-3">
          {rightElements}

          {!user ? (
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" })
              )}
            >
              Sign Up
            </Link>
          ) : null}

          {user ? (
            <UserAccountNav user={user} />
          ) : (
            <Link href={"/register"}>
              <Button
                className="px-3"
                variant="default"
                size="sm"
              >
                Sign In
              </Button>
            </Link>
          )}

          {/* <Link href={"/auth/signin"}>
            <Button
              className="px-3"
              variant="default"
              size="sm"
            >
              Select Wallet
            </Button>
          </Link> */}
        </div>
      </div>
    </header>
  );
}