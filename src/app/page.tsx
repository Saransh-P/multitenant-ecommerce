import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  return(
    <div className="flex flex-col gap-y-4">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <p className="text-xl text-rose-600">This is a paragraph</p>

      <div>
        <Button variant={"elevated"}> click here </Button>
      </div>

      <div>
        <Input placeholder="guess "/>
      </div>

      <div>
        <Progress value={50}/>
      </div>

      <div>
        <Textarea placeholder="Hello World"/>
      </div>

      <div>
        <Checkbox />
      </div>

    </div>
  )
}
