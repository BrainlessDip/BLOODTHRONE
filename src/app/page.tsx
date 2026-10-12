import { OpeningSequence } from "@/components/animations/OpeningSequence";
import { SwordCursor } from "@/components/cursor/SwordCursor";
import { Armory } from "@/components/sections/Armory";
import { GreatHall } from "@/components/sections/GreatHall";
import { Hero } from "@/components/sections/Hero";
import { IronThrone } from "@/components/sections/IronThrone";
import { RavenArchive } from "@/components/sections/RavenArchive";
import { WarTable } from "@/components/sections/WarTable";

export default function Home() {
  return (
    <OpeningSequence>
      <SwordCursor />
      <main className="w-full max-w-full overflow-x-hidden">
        <Hero />
        <GreatHall />
        <Armory />
        <WarTable />
        <RavenArchive />
        <IronThrone />
      </main>
    </OpeningSequence>
  );
}