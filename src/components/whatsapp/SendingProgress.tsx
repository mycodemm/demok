import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface SendingStatus {
  total: number;
  current: number;
  success: number;
  failed: number;
}

export default function SendingProgress({ status }: { status: SendingStatus }) {
  const progress = (status.current / status.total) * 100;

  return (
    <Card className="p-4 space-y-4">
      <Progress value={progress} />

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-muted-foreground">Progress</div>
          <div>
            {status.current} / {status.total}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground">Success Rate</div>
          <div>
            {status.success} / {status.current}
          </div>
        </div>
      </div>
    </Card>
  );
}
