"use client";

import React, { useEffect, useState } from "react";
import { ClipboardCheck, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import Image from "next/image";
import { Checkbox } from "./ui/checkbox";

const BitscaleNews = [
  {
    id: 1,
    thumbnail: "https://img.youtube.com/vi/Zw3fnuOQp2g/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Zw3fnuOQp2g?si=HeOhaFvESzWZRdQk",
    title: "How to integrate 2 Ways HubSpot",
    description:
      "Prerequisites for this Integration is that you should have a HubSpot account and copy the API key. We simply add our API key through the integrations page.",
    lastUpdated: "today",
  },
  {
    id: 2,
    thumbnail: "https://img.youtube.com/vi/Zw3fnuOQp2g/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Zw3fnuOQp2g?si=HeOhaFvESzWZRdQk",
    title: "How to integrate Playbook",
    description:
      "Learn how to use Playbook inside Bitscale and organize your workflow properly.",
    lastUpdated: "today",
  },
  {
    id: 3,
    thumbnail: "https://img.youtube.com/vi/Zw3fnuOQp2g/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Zw3fnuOQp2g?si=HeOhaFvESzWZRdQk",
    title: "How to create your first Grid",
    description:
      "A quick walkthrough to create your first grid and manage your workbook data.",
    lastUpdated: "today",
  },
  {
    id: 4,
    thumbnail: "https://img.youtube.com/vi/Zw3fnuOQp2g/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Zw3fnuOQp2g?si=HeOhaFvESzWZRdQk",
    title: "How to use Integrations",
    description:
      "Connect your favorite tools with Bitscale using integrations.",
    lastUpdated: "today",
  },
];

const ProductDemo = [
  {
    id: 1,
    isCompleted: true,
    title: "Create your data list",
  },
  {
    id: 2,
    isCompleted: true,
    title: "Learn about BitAgent",
  },
  {
    id: 3,
    isCompleted: true,
    title: "Connect an integration",
  },
  {
    id: 4,
    isCompleted: false,
    title: "Customise waterfall providers",
  },
];

const DashboardCards = () => {
  const [activeNews, setActiveNews] = useState(BitscaleNews[0].id);
  const [open, setOpen] = useState(false);
  const [productDemos, setProductDemos] = useState(ProductDemo);

  const activeNewsItem = BitscaleNews.find((news) => news.id === activeNews);

  const completedCount = productDemos.filter((demo) => demo.isCompleted).length;
  const progress = Math.round((completedCount / productDemos.length) * 100);

  useEffect(() => {
    if (open) return;

    const timer = setInterval(() => {
      setActiveNews((prev) => {
        return prev >= BitscaleNews.length ? 1 : prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [open]);

  function completeDemo(id: number) {
    setProductDemos((prev) =>
      prev.map((demo) =>
        demo.id === id
          ? {
              ...demo,
              isCompleted: !demo.isCompleted,
            }
          : demo
      )
    );
  }

  if (!activeNewsItem) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Latest from Bitscale Card */}
        <Card className="overflow-hidden border-none ring-0 bg-[#E7F3F880]">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold text-[#347FA9]">
              Latest from Bitscale
            </CardTitle>

            <div className="flex items-center gap-1">
              {BitscaleNews.map((news) => (
                <motion.button
                  key={news.id}
                  type="button"
                  layout
                  onClick={() => setActiveNews(news.id)}
                  className={cn(
                    news.id === activeNews
                      ? "h-2 w-5 bg-[#347FA9]"
                      : "h-2 w-2 bg-[#8DBAD0]",
                    "rounded-full transition-colors"
                  )}
                />
              ))}
            </div>
          </CardHeader>

          <CardContent className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNewsItem.id}
                initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -24, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex gap-3"
              >
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="group relative h-[90px] w-[130px] shrink-0 overflow-hidden rounded-xl bg-slate-200"
                >
                  <Image
                    src={activeNewsItem.thumbnail}
                    alt={activeNewsItem.title}
                    width={300}
                    height={180}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg"
                    >
                      <Play className="ml-0.5 h-5 w-5 fill-black text-black" />
                    </motion.div>
                  </div>
                </button>

                <div className="min-w-0">
                  <h1 className="line-clamp-1 text-sm font-semibold text-slate-900">
                    {activeNewsItem.title}
                  </h1>

                  <p className="mt-1 line-clamp-3 text-xs leading-5 text-muted-foreground">
                    {activeNewsItem.description}
                  </p>

                  <p className="mt-2 text-[11px] text-slate-500">
                    Last updated: {activeNewsItem.lastUpdated}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Complete Product Demo Card */}
        <Card className="bg-linear-to-b from-[#E7F3F880] to-30% to-transparent">
          <CardHeader className="flex flex-row items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-600 text-white">
              <ClipboardCheck className="size-4" />
            </div>

            <div>
              <CardTitle>Complete product demo</CardTitle>
              <CardDescription>
                92% of users nailed BitScale after this walkthrough
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col justify-between">
            <div className="flex items-center gap-4">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-[#4C8A6A]"
                />
              </div>

              <span className="text-base font-semibold text-[#3F8B66]">
                {progress}%
              </span>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-x-12 gap-y-2 sm:grid-cols-2">
              {productDemos.map((demo) => (
                <div key={demo.id} className="flex items-center gap-3">
                  <Checkbox
                    checked={demo.isCompleted}
                    onCheckedChange={() => completeDemo(demo.id)}
                    className="rounded-full data-[state=checked]:border-[#3B8AB8] data-[state=checked]:bg-[#3B8AB8]"
                  />

                  <span className="text-sm font-medium text-foreground/80">
                    {demo.title}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{activeNewsItem.title}</DialogTitle>
            <DialogDescription>
              {activeNewsItem.description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 overflow-hidden rounded-xl bg-black">
            {open && (
              <iframe
                width="100%"
                height="400"
                src={activeNewsItem.videoUrl}
                title={activeNewsItem.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="aspect-video h-full w-full"
              />
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            Last updated: {activeNewsItem.lastUpdated}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardCards;