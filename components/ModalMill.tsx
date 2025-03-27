"use client";

import Modal from "react-modal";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { X } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


interface MolinosModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const FormSchema = z.object({
    alpha: z
      .number()
      .min(0, { message: "Value 1 must be at least 0." })
      .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Value 1 must have up to two decimal places.",
      }),
    betha: z
      .number()
      .min(0, { message: "Value 2 must be at least 0." })
      .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Value 2 must have up to two decimal places.",
      }),
    gamma: z
      .number()
      .min(0, { message: "Value 3 must be at least 0." })
      .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Value 3 must have up to two decimal places.",
      }),
      time: z
      .number()
      .min(0, { message: "Value 3 must be at least 0." })
      .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Value 3 must have up to two decimal places.",
      }),
  });


  export function InputFile() {
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture"></Label>
        <Input id="picture" type="file" />
      </div>
    );
  }


  export function InputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        alpha: 0.3,
        betha: 0.2,
        gamma: 0.4,
        time: 5,
      },
    })
   
    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("Hola mundo")
    //   toast({
    //     title: "You submitted the following values:",
    //     description: (
    //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //       </pre>
    //     ),
    //   })
    }
   
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-4">
        <FormField
          control={form.control}
          name="alpha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alpha</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                Please enter Aplha

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="betha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Betha</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Please enter Betha

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gamma"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gamma</FormLabel>
              <FormControl>
                <Input type="number" placeholder="18" {...field} />
              </FormControl>
              <FormDescription>
                Please enter Gamma
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input type="number" placeholder="18" {...field} />
              </FormControl>
              <FormDescription>
                Please enter time
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  }



export function MolinosModal({ isOpen, onRequestClose }: MolinosModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Molinos Modal"
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      <div className="mt-4 p-4 border rounded">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        <h1>Modulo de Molinos</h1>

        <div>
            <div>
                <p className="mt-4 block">Entrada</p>
                <InputFile />
            </div>

            <div className="mb-6">
                <p className="mt-4">Salida</p>
                <InputFile />
            </div>

            <div className="">
                <InputForm />
            </div>
        </div>
      </div>
    </Modal>
  );
}