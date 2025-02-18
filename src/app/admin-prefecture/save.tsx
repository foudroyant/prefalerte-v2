'use client'
import { useEffect, useState } from "react";
import { createClient } from '@/utils/supabase/client'
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

const ManageMotifsPage = ({ params }: { params: { id: string, prefecture : string } }) => {
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
  
  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

  async function deleteFunc(id : number) {
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
        { motif: values.motif, lien: values.lien, prefecture : params.id },
      ])
      .select()
      form.reset()
      setChanged(!changed)
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Motif ajouté avec succè !</code>
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
    //setMotifs(motifs.map((motif) => (motif.id === updatedMotif.id ? updatedMotif : motif)));
    console.log(updatedMotif)
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4 text-center">Gestion des motifs</h1>

      {/* Formulaire pour ajouter un nouveau motif */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
            
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

      {/* Tableau des motifs */}
      <div className="space-y-8 max-w-3xl mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Motif</TableHead>
            <TableHead>Lien</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {motifs.map((motif) => (
            <TableRow key={motif.id}>
              <TableCell>
                {motif.motif.length > 25 ? motif.motif.slice(0, 25) + "..." : motif.motif}
              </TableCell>

              <TableCell>
              <a
                href={motif.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {motif.lien.length > 20 ? motif.lien.slice(0, 20) + "..." : motif.lien}
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