import WhatsAppAutomation from "./whatsapp/WhatsAppAutomation";

function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <WhatsAppAutomation />
    </div>
  );
}

export default Home;
