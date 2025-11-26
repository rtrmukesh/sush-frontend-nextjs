"use client";
import * as Spinners from "react-spinners";
import { ComponentType } from "react";

interface SpinnerProps {
  name: keyof typeof Spinners;
  color?: string;
  size?: number;
  fullScreen?: boolean;
}

interface SpinnerComponentProps {
  color: string;
  size: number;
  loading: boolean;
}

export default function Spinner({
  name,
  color = "#36d7b7",
  size = 60,
  fullScreen = true,
}: SpinnerProps) {
  const LoaderComponent = Spinners[name] as ComponentType<SpinnerComponentProps>;

  // Fallback loader if invalid name passed
  const Fallback = Spinners.CircleLoader as ComponentType<SpinnerComponentProps>;

  const WrapperClass = fullScreen
    ? "flex items-center justify-center min-h-screen"
    : "flex items-center justify-center";

  return (
    <div className={WrapperClass}>
      {LoaderComponent ? (
        <LoaderComponent color={color} size={size} loading={true} />
      ) : (
        <Fallback color="red" size={size} loading={true} />
      )}
    </div>
  );
}
