"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { parameters } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useResult } from "@/components/result-context";

const formSchema = z.object(
  Object.fromEntries(
    parameters.labels.map((label, index) => [
      label,
      z.number().min(0).max(parameters.max[index]).step(0.01),
    ]),
  ),
);

export function ParametersForm() {
  const { setResult, setIsLoading } = useResult();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      parameters.labels.map((label, index) => [label, parameters.means[index]]),
    ),
  });

  async function onSubmit(input: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(input);
    const reqBody = JSON.stringify({
      values: [
        input["Nitrogen (N)"],
        input["Phosphorus (P)"],
        input["Potassium (K)"],
        input["Temperature"],
        input["Humidity"],
        input["pH Value"],
        input["Rainfall"],
      ],
    });

    const app_url =
      process.env.NODE_ENV === "production"
        ? (process.env.NEXT_PUBLIC_APP_URL || "")
        : "http://localhost:5000";

    const res = await fetch(app_url + "/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqBody,
    });

    const result = await res.json();
    console.log(result);

    setResult(result);
    setIsLoading(false);

    const resultSection = document.getElementById("result")!;
    resultSection.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="app"
      className="bg-yellow-50/70 flex flex-col justify-center items-center py-8"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-2xl py-12 px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-2xl">Get Your Customized Crop Recommendations</h2>
          <h3 className="text-lg text-muted-foreground">
            Fill out the form with your soil&apos;s properties, and we&apos;ll
            analyze the data to recommend the best crops for your land.
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {parameters.labels.map((_, i) => (
              <FormField
                key={parameters.labels[i]}
                control={form.control}
                name={parameters.labels[i]}
                render={() => (
                  <FormItem>
                    <FormLabel>{parameters.labels[i]}</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Controller
                          name={parameters.labels[i]}
                          control={form.control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              className="flex-1"
                              min={0}
                              max={parameters.max[i]}
                              step={0.01}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                field.onChange(value);
                                form.setValue(parameters.labels[i], value);
                              }}
                            />
                          )}
                        />
                        <Controller
                          name={parameters.labels[i]}
                          control={form.control}
                          render={({ field }) => (
                            <Slider
                              value={[field.value]}
                              onValueChange={(values) => {
                                const value = values[0];
                                field.onChange(value);
                                form.setValue(parameters.labels[i], value);
                              }}
                              max={parameters.max[i]}
                              step={0.01}
                              className="flex-1 mt-1"
                            />
                          )}
                        />
                        <span className="text-muted-foreground">
                          {parameters.units[i]}
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <Button type="submit" className="w-full">
            Get Crop Recommendation
          </Button>
        </form>
      </Form>
    </section>
  );
}
