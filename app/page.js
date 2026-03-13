"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
return ( <div className="relative h-screen flex items-center justify-center overflow-hidden">

```
  {/* Background Image */}
  <Image
    src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
    alt="AI Background"
    fill
    priority
    className="object-cover brightness-75"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-blue-900/60"></div>

  {/* Content */}
  <div className="relative z-10 text-center text-white p-6 max-w-xl">
    
    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
      Virtual AI Interview
    </h1>

    <p className="text-lg md:text-xl mb-8 text-gray-200">
      Tailored Interview Practice for AI Enthusiasts
    </p>

    <Button
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg shadow-lg transition"
      onClick={() => (window.location.href = "/dashboard")}
    >
      Get Started
    </Button>

  </div>
</div>
```

);
}
