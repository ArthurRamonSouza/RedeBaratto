import Link from "next/link"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { JSX, SVGProps } from "react"

export default function Component() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Package2Icon className="h-6 w-6" />
              <span className="">Rede Baratto</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                href="#"
              >
                <UserIcon className="h-4 w-4" />
                Profile
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <PackageIcon className="h-4 w-4" />
                Orders
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">My Account</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <Card className="w-full md:max-w-3xl flex-1">
            <CardHeader>
              <CardTitle>My Account</CardTitle>
              <CardDescription>Manage your account information and access your orders.</CardDescription>
              <Button className="ml-auto" size="sm" variant="outline">
                Edit
              </Button>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-1">
                <h3 className="font-semibold">Name</h3>
                <div className="text-sm">John Doe</div>
              </div>
              <div className="grid gap-1">
                <h3 className="font-semibold">CPF</h3>
                <div className="text-sm">123.456.789-00</div>
              </div>
              <div className="grid gap-1">
                <h3 className="font-semibold">Flamengo Fan</h3>
                <div className="text-sm">Yes</div>
              </div>
              <div className="grid gap-1">
                <h3 className="font-semibold">One Piece Fan</h3>
                <div className="text-sm">No</div>
              </div>
              <div className="grid gap-1">
                <h3 className="font-semibold">From Souza</h3>
                <div className="text-sm">Yes</div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full md:max-w-3xl flex-1">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>View details of your recent orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="grid gap-1">
                  <h3 className="font-semibold">#3210</h3>
                  <div>Shipped</div>
                </div>
                <div className="grid gap-1 text-right md:text-left">
                  <h3 className="font-semibold">$42.25</h3>
                  <div>Feb 20, 2022</div>
                </div>
              </div>
              <Separator />
              <div className="grid gap-6 md:grid-cols-2">
                <div className="grid gap-1">
                  <h3 className="font-semibold">#3209</h3>
                  <div>Paid</div>
                </div>
                <div className="grid gap-1 text-right md:text-left">
                  <h3 className="font-semibold">$74.99</h3>
                  <div>Jan 5, 2022</div>
                </div>
              </div>
              <Separator />
              <div className="grid gap-6 md:grid-cols-2">
                <div className="grid gap-1">
                  <h3 className="font-semibold">#3204</h3>
                  <div>Unfulfilled</div>
                </div>
                <div className="grid gap-1 text-right md:text-left">
                  <h3 className="font-semibold">$64.75</h3>
                  <div>Aug 3, 2021</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

function Package2Icon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function PackageIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}


function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}