import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { JSX, SVGProps } from "react"

export default function Component() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
          <Package2Icon className="w-6 h-6" />
          <span>Acme Marketplace</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm md:ml-auto md:gap-2 lg:gap-5">
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Orders
          </Link>
          <Link className="font-bold" href="#">
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Products</h1>
          <div className="flex items-center gap-2">
            <Button size="sm">Add Product</Button>
            <Button className="text-red-500 hover:bg-red-500 hover:text-white" size="sm" variant="outline">
              Estoque acabando
            </Button>
          </div>
        </div>
        <div className="border shadow-sm rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead className="max-w-[150px]">Name</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">Glimmer Lamps</TableCell>
                <TableCell className="hidden md:table-cell">$49.99</TableCell>
                <TableCell>500 in stock</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost">
                    <FileEditIcon className="w-4 h-4" />
                    <span className="sr-only">Edit product</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">Aqua Filters</TableCell>
                <TableCell className="hidden md:table-cell">$29.99</TableCell>
                <TableCell>750 in stock</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost">
                    <FileEditIcon className="w-4 h-4" />
                    <span className="sr-only">Edit product</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">Eco Planters</TableCell>
                <TableCell className="hidden md:table-cell">$39.99</TableCell>
                <TableCell>300 in stock</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost">
                    <FileEditIcon className="w-4 h-4" />
                    <span className="sr-only">Edit product</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">Zest Juicers</TableCell>
                <TableCell className="hidden md:table-cell">$59.99</TableCell>
                <TableCell>1000 in stock</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost">
                    <FileEditIcon className="w-4 h-4" />
                    <span className="sr-only">Edit product</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">Flexi Wearables</TableCell>
                <TableCell className="hidden md:table-cell">$24.99</TableCell>
                <TableCell>200 in stock</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost">
                    <FileEditIcon className="w-4 h-4" />
                    <span className="sr-only">Edit product</span>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}

function FileEditIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
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