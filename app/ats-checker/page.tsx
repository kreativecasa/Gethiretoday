import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AtsCheckerView from "@/components/ats-checker-view";

export default function ATSCheckerPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AtsCheckerView />
      </main>
      <Footer />
    </div>
  );
}
