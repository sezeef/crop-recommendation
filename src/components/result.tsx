"use client";

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
        <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto">
          <Skeleton className="w-[600px] h-[400px] rounded-l-lg md:w-1/2" />
          <div className="p-6 space-y-4 md:w-1/2">
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg inline-block">
              <h3 className="text-2xl font-bold">Top Result</h3>
            </div>
            <h2 className="text-2xl">
              Based on your soil parameters, the recommended crop is:{" "}
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
      <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto">
        <img
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
          <p className="text-muted-foreground">
            {targets[result.recommendation].description}
          Crop description</p>
          {/* <div className="grid grid-cols-2 gap-4"> */}
          {/*   <div className="bg-muted rounded-lg p-4 space-y-2"> */}
          {/*     <h4 className="text-lg font-medium">Duration</h4> */}
          {/*     <p>10 days</p> */}
          {/*   </div> */}
          {/*   <div className="bg-muted rounded-lg p-4 space-y-2"> */}
          {/*     <h4 className="text-lg font-medium">Difficulty</h4> */}
          {/*     <p>Moderate</p> */}
          {/*   </div> */}
          {/*   <div className="bg-muted rounded-lg p-4 space-y-2"> */}
          {/*     <h4 className="text-lg font-medium">Highlights</h4> */}
          {/*     <ul className="space-y-1 text-muted-foreground"> */}
          {/*       <li> */}
          {/*         <CheckIcon className="w-4 h-4 mr-2 inline-block" /> */}
          {/*         Visit the Great Pyramids of Giza */}
          {/*       </li> */}
          {/*       <li> */}
          {/*         <CheckIcon className="w-4 h-4 mr-2 inline-block" /> */}
          {/*         Cruise along the Nile River */}
          {/*       </li> */}
          {/*       <li> */}
          {/*         <CheckIcon className="w-4 h-4 mr-2 inline-block" /> */}
          {/*         Explore the Valley of the Kings */}
          {/*       </li> */}
          {/*     </ul> */}
          {/*   </div> */}
          {/*   <div className="bg-muted rounded-lg p-4 space-y-2"> */}
          {/*     <h4 className="text-lg font-medium">Price</h4> */}
          {/*     <p>$2,499 per person</p> */}
          {/*   </div> */}
          {/* </div> */}
        </div>
      </div>
    </section>
  );
}

// function CheckIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M20 6 9 17l-5-5" />
//     </svg>
//   );
// }
