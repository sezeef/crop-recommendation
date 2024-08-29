import { Header } from "@/components/header";
import { ParametersForm } from "@/components/parameters-form";
import { Result } from "@/components/result";
import { Footer } from "@/components/footer";
import { ResultProvider } from "@/components/result-context";

//main styles: "max-w-2xl py-12 px-4 sm:px-6 lg:px-8"
export default function Home() {
  return (
    <main className="w-full mx-auto">
      <Header />
      <ResultProvider>
        <ParametersForm />
        <Result />
      </ResultProvider>
      <Footer />
    </main>
  );
}
