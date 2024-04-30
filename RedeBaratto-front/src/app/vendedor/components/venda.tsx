import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { JSX, SVGProps } from "react"

export default function Component() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
          <Package2Icon className="w-6 h-6" />
          <span>Rede Baratto</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm md:ml-auto md:gap-2 lg:gap-5">
          <Link className="font-bold" href="#">
            Orders
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Products
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Analytics
          </Link>
        </nav>
        <Button className="rounded-full ml-auto md:ml-4" size="icon" variant="ghost">
          <UserIcon className="w-6 h-6" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </header>
      <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-semibold">Approve Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid-cols-2 gap-4">
              <div className="flex flex-row items-start justify-start gap-2">
                <div className="flex flex-row items-start justify-start gap-2">
                  <div className="flex flex-col items-start justify-center">
                    <span className="font-semibold">Sale ID: 1234</span>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-center">
                  <span className="font-semibold">$100.00</span>
                  <span className="text-xs">2 items</span>
                </div>
                <div className="flex flex-col items-end justify-center">
                <Button size={"sm"}>Approve</Button>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-2">
                <div className="flex flex-row items-start justify-start gap-2">
                  <div className="flex flex-col items-start justify-center">
                    <span className="font-semibold">Sale ID: 4321</span>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-center">
                  <span className="font-semibold">$50.00</span>
                  <span className="text-xs">1 item</span>
                </div>
                <div className="flex flex-col items-end justify-center">
                <Button size={"sm"}>Approve</Button>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-2">
                <div className="flex flex-row items-start justify-start gap-2">
                  <div className="flex flex-col items-start justify-center">
                    <span className="font-semibold">Sale ID: 7890</span>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-center">
                  <span className="font-semibold">$200.00</span>
                  <span className="text-xs">3 items</span>
                </div>
                <div className="flex flex-col items-end justify-center">
                  <Button size={"sm"}>Approve</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
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