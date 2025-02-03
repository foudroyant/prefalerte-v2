"use client"
import {
  useState
} from "react"
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
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  PhoneInput
} from "@/components/ui/phone-input";

const formSchema = z.object({
  telephone: z.string()
});

interface PhoneProps {
  onUpdate: (telephone : string) => void; // Fonction à exécuter lors de la confirmation
}

export default function MyForm_Phone({onUpdate} : PhoneProps) {

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      onUpdate(values.telephone)
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl mx-auto ">
        
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
              <FormLabel>Telephone</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    placeholder="Telephone"
                    {...field}
                    defaultCountry="TR"
                  />
                </FormControl>
              <FormDescription>Numéro de telephone</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
            
        <Button type="submit">Confirmer</Button>
      </form>
    </Form>
  )
}