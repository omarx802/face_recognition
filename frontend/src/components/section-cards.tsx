"use client"

import { useEffect, useState } from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type RecognitionEntry = {
  id: number;
  event: string;
  timing: string;
  status: string;
  person: string;
};


export function SectionCards() {

  const [total, setTotal] = useState(0);
  const [totalUnknown, setTotalUnknown] = useState(0);
  const [totalKnown, setTotalKnown] = useState(0);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data: RecognitionEntry[]) => {
        const total = data.length;
        const unknown = data.filter((entry) => entry.person === 'Unknown').length;
        const known = total - unknown;

        setTotal(total);
        setTotalUnknown(unknown);
        setTotalKnown(known);
      })
      .catch((err) => console.error('Error loading JSON:', err));
  }, []);


  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Recognized</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {total}
          </CardTitle>

        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Registered</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            3
          </CardTitle>

        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Knowns</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {totalKnown}
          </CardTitle>
  
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Unknowns</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {totalUnknown}
          </CardTitle>

        </CardHeader>
      </Card>
    </div>
  )
}
