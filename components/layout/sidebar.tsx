import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, LibraryBig, Layers, FileImage, MessageCircleMore, Code, Headphones, FileType, Home, FileSearch, Gavel, Megaphone, TestTube, Volume, Info, Send, Clipboard, AudioLines } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"

export function Sidebar({ className }: any) {
  const pathname = usePathname()
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Overview
          </h2>
          <div className="space-y-1">
            <Link href="/">
              <Button variant={pathname === "/" ? "secondary" : "ghost"} className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            JurisAI
          </h2>
          <div className="space-y-1">
            <Link href="/disclaimer">
              <Button variant={pathname === "/disclaimer" ? "secondary" : "ghost"} className="w-full justify-start">
                <FileSearch className="mr-2 h-4 w-4" />
                Disclaimer
              </Button>
            </Link>
            <Link href="/transcript">
              <Button variant={pathname === "/transcript" ? "secondary" : "ghost"} className="w-full justify-start">
                <Gavel className="mr-2 h-4 w-4" />
                Transcript
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant={pathname === "/chats" ? "secondary" : "ghost"} className="w-full justify-start">
                <MessageCircleMore className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </Link>
            <Link href="/search">
              <Button variant={pathname === "/search" ? "secondary" : "ghost"} className="w-full justify-start">
                <FileSearch className="mr-2 h-4 w-4" />
                Search
              </Button>
            </Link>
            <Link href="/court-transcript">
              <Button variant={pathname === "/court-transcript" ? "secondary" : "ghost"} className="w-full justify-start">
                <Gavel className="mr-2 h-4 w-4" />
                Court Certified Transcript
              </Button>
            </Link>
            <Link href="/spectrograph">
              <Button variant={pathname === "/spectrograph" ? "secondary" : "ghost"} className="w-full justify-start">
                <Megaphone className="mr-2 h-4 w-4" />
                Spectrograph
              </Button>
            </Link>
            <Link href="/analyze-media">
              <Button variant={pathname === "/analyze-media" ? "secondary" : "ghost"} className="w-full justify-start">
                <TestTube className="mr-2 h-4 w-4" />
                Analyze Media
              </Button>
            </Link>
            <Link href="/analyze-speech">
              <Button variant={pathname === "/analyze-speech" ? "secondary" : "ghost"} className="w-full justify-start">
                <AudioLines className="mr-2 h-4 w-4" />
                Analyze Speech
              </Button>
            </Link>
            <Link href="/diagnose-audio">
              <Button variant={pathname === "/diagnose-audio" ? "secondary" : "ghost"} className="w-full justify-start">
                <Headphones className="mr-2 h-4 w-4" />
                Diagnose Audio
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button variant={pathname === "/contact-us" ? "secondary" : "ghost"} className="w-full justify-start">
                <Send className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </Link>
            <Link href="/audio-recording-laws">
              <Button variant={pathname === "/audio-recording-laws" ? "secondary" : "ghost"} className="w-full justify-start">
                <Clipboard className="mr-2 h-4 w-4" />
                Audio Recording Laws
              </Button>
            </Link>
            <Link href="/about-jurisvoicegpt">
              <Button variant={pathname === "/about-jurisvoicegpt" ? "secondary" : "ghost"} className="w-full justify-start">
                <Info className="mr-2 h-4 w-4" />
                About JurisVoiceGPT
              </Button>
            </Link>
            <Link href="/submit-request">
              <Button variant={pathname === "/submit-request" ? "secondary" : "ghost"} className="w-full justify-start">
                <Send className="mr-2 h-4 w-4" />
                Submit a Request
              </Button>
            </Link>
            <Link href="/case-submission">
              <Button variant={pathname === "/case-submission" ? "secondary" : "ghost"} className="w-full justify-start">
                <Gavel className="mr-2 h-4 w-4" />
                Case Submission
              </Button>
            </Link>
            {/* Repeat the structure for other menu items */}
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Mics
          </h2>
        </div>
      </div>
    </div>
  )
}
