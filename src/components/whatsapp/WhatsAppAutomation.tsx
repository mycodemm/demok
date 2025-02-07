import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactInput from "./ContactInput";
import MessageComposer from "./MessageComposer";
import SendingProgress from "./SendingProgress";

interface Contact {
  name?: string;
  phone: string;
}

interface Message {
  text: string;
  files: File[];
  delay: number;
}

export default function WhatsAppAutomation() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [status, setStatus] = useState({
    total: 0,
    current: 0,
    success: 0,
    failed: 0,
  });

  const handleMessageReady = (message: Message) => {
    // This would integrate with the Chrome extension to send messages
    console.log("Sending message:", message);
    console.log("To contacts:", contacts);

    // Simulate progress
    setStatus({
      total: contacts.length,
      current: 0,
      success: 0,
      failed: 0,
    });
  };

  return (
    <Card className="w-[600px] mx-auto bg-background">
      <Tabs defaultValue="contacts" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="contacts" className="flex-1">
            Contacts
          </TabsTrigger>
          <TabsTrigger value="message" className="flex-1">
            Message
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex-1">
            Progress
          </TabsTrigger>
        </TabsList>

        <div className="p-4">
          <TabsContent value="contacts">
            <ContactInput onContactsAdded={setContacts} />
          </TabsContent>

          <TabsContent value="message">
            <MessageComposer onMessageReady={handleMessageReady} />
          </TabsContent>

          <TabsContent value="progress">
            <SendingProgress status={status} />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}
