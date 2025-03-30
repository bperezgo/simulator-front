"use client";

import Modal from "react-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function csvJSON(csv: string): Record<string, string>[] {
  const lines = csv.split("\n");

  const result: Record<string, string>[] = [];

  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    const obj: Record<string, string> = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      obj[header] = currentline[j];
    }

    result.push(obj);
  }

  return result;
}

const formSchema = z.object({
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
  inputDataFile: z.instanceof(File).optional(),
  outputDataFile: z.instanceof(File).optional(),
});

interface MolinosModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input id="picture" type="file" />
    </div>
  );
}

export function InputForm() {
  const [inputDataFile, setInputDataFile] = useState<Record<string, string>[] | null>(null);
  const [outputDataFile, setOutputDataFile] = useState<Record<string, string>[] | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alpha: 0.3,
      betha: 0.2,
      gamma: 0.4,
      time: 5,
    },
  });

  const onChangeInputDataFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const csv = evt.target?.result as string;
      const json = csvJSON(csv);
      console.log("json", json);
      setInputDataFile(json);
    };
    reader.readAsText(file);
  }

  const onChangeOutputDataFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const csv = evt.target?.result as string;
      const json = csvJSON(csv);
      console.log("json", json);
      setOutputDataFile(json);
    };
    reader.readAsText(file);
  };

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("data", data);
    console.log("inputDataFile", inputDataFile);
    console.log("outputDataFile", outputDataFile);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-4">
        <FormField
          control={form.control}
          name="inputDataFile"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Entrada</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  onChange={(evt) =>
                    onChange(evt.target.files && onChangeInputDataFile(evt.target.files[0]))
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="outputDataFile"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Entrada</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  onChange={(evt) =>
                    onChange(evt.target.files && onChangeOutputDataFile(evt.target.files[0]))
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alpha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alpha</FormLabel>
              <FormControl>
                <Input placeholder="enter a valid alpha" {...field} />
              </FormControl>
              <FormDescription>Please enter Aplha</FormDescription>
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
                <Input placeholder="enter a valid betha" {...field} />
              </FormControl>
              <FormDescription>Please enter Betha</FormDescription>
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
                <Input
                  type="number"
                  placeholder="enter a valid gamma"
                  {...field}
                />
              </FormControl>
              <FormDescription>Please enter Gamma</FormDescription>
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
                <Input
                  type="number"
                  placeholder="enter a valid time"
                  {...field}
                />
              </FormControl>
              <FormDescription>Please enter time</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
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

        <InputForm />
      </div>
    </Modal>
  );
}
