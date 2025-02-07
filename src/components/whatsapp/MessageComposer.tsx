import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Image, FileText, Film, BarChart2 } from "lucide-react";
import { useState } from "react";

interface Message {
  text: string;
  files: File[];
  delay: number;
}

export default function MessageComposer({
  onMessageReady,
}: {
  onMessageReady: (message: Message) => void;
}) {
  const [message, setMessage] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [delay, setDelay] = useState<number>(3);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles([...files, ...newFiles]);
  };

  return (
    <Card className="p-4">
      <Textarea
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-[100px] mb-4"
      />

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant="outline" asChild className="flex-1">
            <label>
              <Image className="w-4 h-4 mr-2" />
              Add Images
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <label>
              <Film className="w-4 h-4 mr-2" />
              Add Videos
              <input
                type="file"
                accept="video/*"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" asChild className="flex-1">
            <label>
              <FileText className="w-4 h-4 mr-2" />
              Add PDFs
              <input
                type="file"
                accept=".pdf"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          </Button>
          <Button variant="outline" className="flex-1">
            <BarChart2 className="w-4 h-4 mr-2" />
            Create Poll
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Delay between messages (3-45 seconds)</Label>
          <Slider
            value={[delay]}
            onValueChange={([value]) => setDelay(value)}
            min={3}
            max={45}
            step={1}
          />
          <div className="text-sm text-muted-foreground text-right">
            {delay} seconds
          </div>
        </div>

        {files.length > 0 && (
          <div className="text-sm text-muted-foreground">
            {files.length} file(s) selected
          </div>
        )}

        <Button
          className="w-full"
          onClick={() => onMessageReady({ text: message, files, delay })}
        >
          Preview & Send
        </Button>
      </div>
    </Card>
  );
}
