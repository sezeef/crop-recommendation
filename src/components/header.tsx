import Image from "next/legacy/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <section id="hero" className="relative w-full h-[600px]">
      <Image
        src="/image/glenn-carstens-peters-piNf3C4TViA-unsplash.jpg"
        alt="background hero section image, wheet field"
        layout="fill"
        objectFit="cover"
        priority={true}
        className="z-0"
      />
      <div className="z-10 absolute w-full inset-0 top-0 left-0 h-[300] bg-gradient-to-t from-black/50 to-black/0" />
      <div className="z-10 absolute w-full inset-0 top-0 left-0 h-full bg-black/40" />
      <div className="z-10 absolute inset-0 flex justify-center items-center container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h1 className="text-white text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Optimize Your Harvest with AI-Driven
            <br />
            <span className="text-white font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Crop Recommendations
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-green-50 md:text-xl">
            Empower your farming with precise, data-driven insights. Our AI
            analyzes your soil&apos;s unique characteristics to recommend the best
            crops for optimal growth, sustainability, and yield.
          </p>
          <Link href="#app">
            <Button className="w-40 h-12 text-lg" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
