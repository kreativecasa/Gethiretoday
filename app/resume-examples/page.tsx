import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ExamplesView from "@/components/examples-view";

export default function ExamplesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1">
        <ExamplesView />
      </main>
      <Footer />
    </div>
  );
}
