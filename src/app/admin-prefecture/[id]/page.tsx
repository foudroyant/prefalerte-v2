"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  useForm
} from "react-hook-form"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  motif: z.string(),
  lien: z.string().min(9)
});


const columns: ColumnDef<Motif>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    header : "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const motif = row.original

      const [isDialogOpen, setIsDialogOpen] = useState(false)
      const [changed, setChanged] = useState(false)
      const supabase = createClient()
      const { toast } = useToast()

      const form = useForm < z.infer < typeof formSchema >> ({
        resolver: zodResolver(formSchema),
    
      })
      const link_splited = window.location.href.split('/')
      const id_prefecture = link_splited[link_splited.length - 1]

      async function deleteMotif(id : number) {
        const { error } = await supabase
        .from('motifs')
        .delete()
        .eq('id', id)
        setChanged(!changed)
      }

      async function onSubmit(values: z.infer < typeof formSchema > ) {
        try {
          console.log(values);
          
          const { data, error } = await supabase
          .from('motifs')
          .insert([
            { motif: values.motif, lien: values.lien, prefecture : id_prefecture},
          ])
          .select()
    
          form.reset()
          toast(
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Motif ajouté avec succè !</code>
            </pre>
          );
          
          setChanged(!changed)
        } catch (error) {
          console.error("Form submission error", error);
          toast(
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Failed to submit the form. Please try again.</code>
        </pre>
      );
        }
      }

      return (
        <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={()=>{setIsDialogOpen(true)}}>
              Ajouter
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editer</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>{deleteMotif(motif.id)}}>Supprimer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
<DialogContent>
  <DialogHeader>Ajouter une préfecture</DialogHeader>
  {/* Formulaire pour ajouter un nouveau motif */}
  <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mx-auto py-10">
            
            <FormField
            control={form.control}
            name="motif"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Motif</FormLabel>
                <FormControl>
                    <Input 
                    placeholder="Motif"
                    
                    type="text"
                    {...field} />
                </FormControl>
                <FormDescription>Decription du motif</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            
            <FormField
            control={form.control}
            name="lien"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Lien</FormLabel>
                <FormControl>
                    <Input 
                    placeholder="lien"
                    
                    type="text"
                    {...field} />
                </FormControl>
                <FormDescription>Lien du motif</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit">Ajouter</Button>
        </form>
        </Form>
</DialogContent>
</Dialog>
        </>
      )
    },
  },
  {
    accessorKey: "motif",
    header: "Motif",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("motif")}</div>
    ),
  },
  {
    accessorKey: "lien",
    header: () => <div className="text-right">Lien</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.getValue("lien")}</div>
    },
  },
]

export default function DataTable({ params }: { params: { id: string}}) {

  const [motifs, setMotifs] = useState<Motif[]>([]);
  const [changed, setChanged] = useState(false)
  const supabase = createClient()

  useEffect(()=>{
    async function init(){
      const { data } = await supabase.auth.getUser()
      let { data: les_motifs, error } = await supabase
      .from('motifs')
      .select('*')
      .eq("prefecture", Number.parseInt(params.id))
      setMotifs(les_motifs || [])
    }
    init()

  }, [changed])


  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data : motifs,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrer motif..."
          value={(table.getColumn("motif")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("motif")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précedent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  )
}
