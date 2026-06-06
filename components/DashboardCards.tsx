"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ClipboardCheck, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Checkbox } from "@/components/ui/checkbox";
import { dashboardData } from "@/config/dashboard-data";

const bitscaleNews = [
  {
    id: 1,
    thumbnail: "https://img.youtube.com/vi/Zw3fnuOQp2g/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Zw3fnuOQp2g?si=HeOhaFvESzWZRdQk",
    title: dashboardData.latestCard.title,
    description: dashboardData.latestCard.description,
    lastUpdated: dashboardData.latestCard.postedAt,
  },
  {
    id: 2,
    thumbnail: "https://img.youtube.com/vi/Zw3fnuOQp2g/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Zw3fnuOQp2g?si=HeOhaFvESzWZRdQk",
    title: "How to integrate Playbook",
    description:
      "Learn how to use Playbook inside Bitscale and organize your workflow properly.",
    lastUpdated: "Posted today",
  },
  {
    id: 3,
    thumbnail: "https://img.youtube.com/vi/Zw3fnuOQp2g/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Zw3fnuOQp2g?si=HeOhaFvESzWZRdQk",
    title: "How to create your first Grid",
    description:
      "A quick walkthrough to create your first grid and manage your workbook data.",
    lastUpdated: "Posted today",
  },
  {
    id: 4,
    thumbnail: "https://img.youtube.com/vi/Zw3fnuOQp2g/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Zw3fnuOQp2g?si=HeOhaFvESzWZRdQk",
    title: "How to use Integrations",
    description: "Connect your favorite tools with Bitscale using integrations.",
    lastUpdated: "Posted today",
  },
];

const initialDemoTasks = dashboardData.productDemo.tasks;

const DashboardCards = () => {
  const [activeNews, setActiveNews] = useState(bitscaleNews[0].id);
  const [open, setOpen] = useState(false);
  const [productDemos, setProductDemos] = useState(initialDemoTasks);

  const activeNewsItem = bitscaleNews.find((news) => news.id === activeNews);

  const completedCount = productDemos.filter((demo) => demo.completed).length;

  const progress =
    productDemos.length > 0
      ? Math.round((completedCount / productDemos.length) * 100)
      : 0;

  useEffect(() => {
    if (open) return;

    const timer = setInterval(() => {
      setActiveNews((prev) => {
        return prev >= bitscaleNews.length ? 1 : prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [open]);

  function completeDemo(id: string) {
    setProductDemos((prev) =>
      prev.map((demo) =>
        demo.id === id
          ? {
              ...demo,
              completed: !demo.completed,
            }
          : demo
      )
    );
  }

  if (!activeNewsItem) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="overflow-hidden border-none bg-[#E7F3F880] ring-0">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold text-[#347FA9]">
              {dashboardData.latestCard.badge}
            </CardTitle>

            <div className="flex items-center gap-1">
              {bitscaleNews.map((news) => (
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
                    {activeNewsItem.lastUpdated}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-b from-[#E7F3F880] to-30% to-transparent">
          <CardHeader className="flex flex-row items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-600 text-white">
              <ClipboardCheck className="size-4" />
            </div>

            <div>
              <CardTitle>{dashboardData.productDemo.title}</CardTitle>
              <CardDescription>
                {dashboardData.productDemo.subtitle}
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
                    checked={demo.completed}
                    onCheckedChange={() => completeDemo(demo.id)}
                    className="rounded-full data-[state=checked]:border-[#3B8AB8] data-[state=checked]:bg-[#3B8AB8]"
                  />

                  <span className="text-sm font-medium text-foreground/80">
                    {demo.label}
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
            <DialogDescription>{activeNewsItem.description}</DialogDescription>
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
            {activeNewsItem.lastUpdated}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardCards;