import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useState } from "react";

interface Contact {
  name?: string;
  phone: string;
}

export default function ContactInput({
  onContactsAdded,
}: {
  onContactsAdded: (contacts: Contact[]) => void;
}) {
  const [contacts, setContacts] = useState<string>("");

  const handlePaste = (text: string) => {
    const lines = text.split("\n").filter((line) => line.trim());
    const parsed = lines.map((line) => {
      const [name, phone] = line.split(",").map((s) => s.trim());
      return { name, phone: phone || name };
    });
    onContactsAdded(parsed);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      handlePaste(text);
    };
    reader.readAsText(file);
  };

  return (
    <Card className="p-4">
      <Textarea
        placeholder="Paste contacts here (one per line)\nFormat: name,phone or just phone"
        value={contacts}
        onChange={(e) => {
          setContacts(e.target.value);
          handlePaste(e.target.value);
        }}
        className="min-h-[200px] mb-4"
      />
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setContacts("")}>
          Clear
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <label>
              <Upload className="w-4 h-4 mr-2" />
              Upload CSV
              <input
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </Button>
        </div>
      </div>
    </Card>
  );
}
