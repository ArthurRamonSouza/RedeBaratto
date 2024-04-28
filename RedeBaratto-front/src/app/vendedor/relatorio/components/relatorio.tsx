import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { JSX, SVGProps } from "react"

export default function Component() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
          <span>Acme Marketplace</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm md:ml-auto md:gap-2 lg:gap-5">
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Orders
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Products
          </Link>
          <Link className="font-bold" href="#">
            Analytics
          </Link>
        </nav>
        <Button className="rounded-full ml-auto md:ml-4" size="icon" variant="ghost">
          <UserIcon className="w-6 h-6" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </header>
      <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Analytics</h1>
          <div className="flex items-center gap-2">
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Search by Seller CPF</CardTitle>
                <div className="flex items-center gap-2">
                  <Input className="w-[200px]" placeholder="Enter Seller CPF" type="text" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01">January</SelectItem>
                      <SelectItem value="02">February</SelectItem>
                      <SelectItem value="03">March</SelectItem>
                      <SelectItem value="04">April</SelectItem>
                      <SelectItem value="05">May</SelectItem>
                      <SelectItem value="06">June</SelectItem>
                      <SelectItem value="07">July</SelectItem>
                      <SelectItem value="08">August</SelectItem>
                      <SelectItem value="09">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                      <SelectItem value="2029">2029</SelectItem>
                      <SelectItem value="2030">2030</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="sm">Search</Button>
              </div>
              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Glimmer Lamps</TableCell>
                      <TableCell>$25,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Aqua Filters</TableCell>
                      <TableCell>$18,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Eco Planters</TableCell>
                      <TableCell>$15,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Zest Juicers</TableCell>
                      <TableCell>$12,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Flexi Wearables</TableCell>
                      <TableCell>$10,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Total</TableCell>
                      <TableCell className="font-semibold">$80,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
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