"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, Angry, Laugh, Plus, X, HandMetal } from "lucide-react";

export default function Home() {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [reaction, setReaction] = React.useState(() =>
    Array.from({ length: 5 }).reduce((acc, _, index) => {
      acc[index] = { ANGRY: 0, LAUGH: 0, HAND_METAL: 0 };
      return acc;
    }, {})
  );
  console.log(reaction);

  const handleReactionClick = (event, reaction) => {
    setReaction((prevReaction) => {
      const currentSlide = prevReaction[current] || {
        ANGRY: 0,
        LAUGH: 0,
        HAND_METAL: 0,
      };
      console.log("current", currentSlide[reaction]);
      currentSlide[reaction]++;
      console.log("after", currentSlide[reaction]);

      return {
        ...prevReaction,
        [current]: currentSlide,
      };
    });
  };

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex items-center justify-center flex-col min-h-[350px] h-screen">
      <Carousel setApi={setApi} className=" w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 gap-2.5">
                  <div
                    className="flex aspect-square items-center justify-center p-6 gap-2.5"
                    style={{ position: "absolute", top: 135 }}
                  >
                    <span className="ml-2 border rounded p-2 flex gap-2.5">
                      <Angry />
                      <span>{reaction[current]?.ANGRY || 0}</span>
                    </span>
                    <span className="ml-2 border rounded p-2 flex gap-2.5">
                      <Laugh />
                      {reaction[current]?.LAUGH || 0}
                    </span>
                    <span className="ml-2 border rounded p-2 flex gap-2.5">
                      <HandMetal />
                      {reaction[current]?.HAND_METAL || 0}
                    </span>
                  </div>
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
      <div>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-[350px] space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-4">
            <h4 className="text-sm font-semibold">Reactions</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-3 font-mono text-sm flex  justify-around">
              <div onClick={(event) => handleReactionClick(event, "ANGRY")}>
                <Angry />
              </div>
              <div onClick={(event) => handleReactionClick(event, "LAUGH")}>
                <Laugh />
              </div>
              <div
                onClick={(event) => handleReactionClick(event, "HAND_METAL")}
              >
                <HandMetal />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
