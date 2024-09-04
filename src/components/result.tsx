"use client";

import Image from "next/image";
import { targets } from "@/lib/data";
import { useResult } from "@/components/result-context";
import { Skeleton } from "@/components/ui/skeleton";

export function Result() {
  const { result, isLoading } = useResult();

  if (result.recommendation === -1) {
    return <section id="result" />;
  }

  if (isLoading) {
    return (
      <section id="result" className="bg-[#0d1601] text-white py-8">
        <div className="flex flex-col items-center md:flex-row w-full max-w-5xl mx-auto">
          <Skeleton className="w-[600px] h-[400px] rounded-l-lg md:w-1/2" />
          <div className="p-6 space-y-4 md:w-1/2">
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg inline-block">
              <h3 className="text-2xl font-bold">Top Result</h3>
            </div>
            <h2 className="text-2xl">
              Based on your soil parameters, the recommended crop is:
            </h2>
            <Skeleton className="w-30 h-10" />
            <Skeleton className="w-30 h-10" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="result" className="bg-[#0d1601] text-white py-8">
      <div className="flex flex-col items-center md:flex-row w-full max-w-5xl mx-auto">
        <Image
          src={`/image/target/crop-${result.recommendation}.jpg`}
          alt="Result Image"
          width="600"
          height="400"
          className="rounded-l-lg object-cover md:w-1/2"
          style={{ aspectRatio: "600/400", objectFit: "cover" }}
        />
        <div className="p-6 space-y-4 md:w-1/2">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg inline-block">
            <h3 className="text-2xl font-bold">Top Result</h3>
          </div>
          <h2 className="text-2xl">
            Based on your soil parameters, the recommended crop is:{" "}
          </h2>
          <h2 className="text-2xl font-bold capitalize">
            {targets[result.recommendation].label}
          </h2>
          <p className="text-green-50">
            {targets[result.recommendation].description}
          </p>
        </div>
      </div>
    </section>
  );
}
