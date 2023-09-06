"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, CaptionProps, useNavigation } from "react-day-picker";

import { cn, range } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { months } from "@/data/date-data";
import { ScrollArea } from "./scroll-area";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Caption(props: CaptionProps) {
  const { goToDate, goToMonth, nextMonth, previousMonth } = useNavigation();
  const [isMonthPopoverOpen, setIsMonthPopoverOpen] = useState<boolean>(false);
  const [isYearPopoverOpen, setIsYearPopoverOpen] = useState<boolean>(false);
  return (
    <div className="flex items-center justify-center gap-x-3">
      <ChevronLeft
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className="h-4 w-4 cursor-pointer"
      />
      <Popover open={isMonthPopoverOpen} onOpenChange={setIsMonthPopoverOpen}>
        <PopoverTrigger asChild>
          <div className="cursor-pointer rounded-xl p-1 px-2 duration-100 hover:bg-slate-100 dark:hover:bg-slate-700">
            {dayjs(props.displayMonth).format("MMMM")}
          </div>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={0}
          className="mt-3 grid w-fit grid-cols-3 overflow-hidden rounded-2xl p-0"
        >
          {months.map((month, i) => (
            <div
              onClick={() => {
                goToMonth(dayjs(props.displayMonth).month(i).toDate());
                setIsMonthPopoverOpen(false);
              }}
              className="cursor-pointer p-3 text-center hover:bg-slate-50 dark:hover:bg-slate-500"
              key={i}
            >
              {month}
            </div>
          ))}
        </PopoverContent>
      </Popover>
      <Popover open={isYearPopoverOpen} onOpenChange={setIsYearPopoverOpen}>
        <PopoverTrigger asChild>
          <div className="cursor-pointer rounded-xl p-1 px-2 duration-100 hover:bg-slate-100 dark:hover:bg-slate-700">
            {dayjs(props.displayMonth).format("YYYY")}
          </div>
        </PopoverTrigger>
        <PopoverContent sideOffset={0} className="mt-5 w-fit rounded-2xl p-0">
          <ScrollArea className="h-72">
            {range(new Date().getFullYear() - 100, new Date().getFullYear(), 1)
              .reverse()
              .map((year) => (
                <div
                  onClick={() => {
                    goToDate(dayjs(props.displayMonth).year(year).toDate());
                    setIsYearPopoverOpen(false);
                  }}
                  className="cursor-pointer p-3 px-5 text-center hover:bg-slate-50 dark:hover:bg-slate-500"
                  key={year}
                >
                  {year}
                </div>
              ))}
          </ScrollArea>
        </PopoverContent>
      </Popover>
      <ChevronRight
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className="h-4 w-4 cursor-pointer"
      />
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-slate-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-slate-400",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected])]:bg-slate-800",
        day: cn(
          buttonVariants({ variant: null }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        day_selected:
          "bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900  ",
        day_today:
          "bg-slate-300  text-slate-50 dark:bg-slate-800 dark:text-slate-50",
        day_outside: "text-slate-500 opacity-50 dark:text-slate-400",
        day_disabled: "text-slate-500 opacity-50 dark:text-slate-400",
        day_range_middle:
          "aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Caption,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
