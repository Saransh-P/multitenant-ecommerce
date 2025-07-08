import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return(
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <p className="text-xl text-rose-600">This is a paragraph</p>
      <Button> click here </Button>
    </div>
  )
}
