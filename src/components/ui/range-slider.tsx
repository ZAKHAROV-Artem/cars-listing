"use client";

import st from "@/assets/styles/range-slider.module.css";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  gap?: number;
  withValues?: boolean;
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
}

export default function RangeSlider({
  min,
  max,
  minValue,
  maxValue,
  withValues = false,
  gap = 1000,
  setMaxValue,
  setMinValue,
}: RangeSliderProps) {
  const [minVal, setMinVal] = useState<number>(minValue);
  const [maxVal, setMaxVal] = useState<number>(maxValue);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    setMaxValue(maxVal);
  }, [setMaxValue, maxVal]);
  useEffect(() => {
    setMinValue(minVal);
  }, [setMinValue, minVal]);
  useEffect(() => {
    setMinVal(minValue);
  }, [setMinVal, minValue]);
  useEffect(() => {
    setMaxVal(maxValue);
  }, [setMaxVal, maxValue]);
  return (
    <div
      className={cn(
        { "h-8": withValues, "h-4": !withValues },
        "mt-2 overflow-hidden",
      )}
    >
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        step={1000}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - gap);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={cn(st.thumb, "z-[3]", {
          "z-[5]": minVal > max - gap - 100,
        })}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        step={100}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + gap);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className={cn(st.thumb, "z-[4]")}
      />

      <div className="relative">
        <div className="absolute z-[1] h-[5px] w-full rounded-[3px] bg-slate-200" />
        <div
          ref={range}
          className="absolute z-[2] h-[5px] w-full rounded-[3px] bg-primary-light"
        />
        {withValues && (
          <>
            <div className={"absolute left-0 top-[10px]"}>{minVal}</div>
            <div className={"absolute right-0 top-[10px]"}>{maxVal}</div>
          </>
        )}
      </div>
    </div>
  );
}
