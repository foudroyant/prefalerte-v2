'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import EditMotifDialog from "@/components/EditMotifDialog"; // Nous allons créer ce composant ensuite

  import {
    toast
  } from "sonner"
  import {
    useForm
  } from "react-hook-form"
  import {
    zodResolver
  } from "@hookform/resolvers/zod"
  import * as z from "zod"
  import {
    cn
  } from "@/lib/utils"
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  

const formSchema = z.object({
    motif: z.string(),
    lien: z.string().min(9)
  });

const ManageMotifsPage = () => {
  const [motifs, setMotifs] = useState<Motif[]>([
    { id: 1, label: "Motif 1", lien: "https://example.com/motif1" },
    { id: 2, label: "Motif 2", lien: "https://example.com/motif2" },
  ]);
  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      const newMotif: Motif = {
        id: motifs.length + 1,
        label: values.motif,
        lien: values.lien,
      };
      form.reset()
      setMotifs([...motifs, newMotif]);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const handleDeleteMotif = (id: number) => {
    setMotifs(motifs.filter((motif) => motif.id !== id));
  };

  const handleSaveMotif = (updatedMotif: Motif) => {
    setMotifs(motifs.map((motif) => (motif.id === updatedMotif.id ? updatedMotif : motif)));
  };

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-center">Gestion des motifs</h1>

      {/* Formulaire pour ajouter un nouveau motif */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
            
            <FormField
            control={form.control}
            name="motif"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Label</FormLabel>
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

      {/* Tableau des motifs */}
      <div className="space-y-8 max-w-3xl mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>Lien</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {motifs.map((motif) => (
            <TableRow key={motif.id}>
              <TableCell>{motif.label}</TableCell>
              <TableCell>
                <a href={motif.lien} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {motif.lien}
                </a>
              </TableCell>
              <TableCell>
                <EditMotifDialog motif={motif} onSave={handleSaveMotif} />
                <Button variant="destructive" className="ml-2" onClick={() => handleDeleteMotif(motif.id)}>
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
};

export default ManageMotifsPage;