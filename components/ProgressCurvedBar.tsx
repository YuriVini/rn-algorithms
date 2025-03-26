// import { tva } from "@gluestack-ui/nativewind-utils/tva";
// import { BlurMask, Canvas, Path, Skia, SweepGradient, vec } from "@shopify/react-native-skia";
// import LottieView from "lottie-react-native";
// import { cssInterop } from "nativewind";
// import React, { useState, useRef, useEffect } from "react";
// import { Dimensions, View } from "react-native";
// import { SharedValue, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

// const auras = {
//   default: require("../../../../assets/purple-aura.json"),
//   primary: require("../../../../assets/purple-aura.json"),
//   secondary: require("../../../../assets/cyan-aura.json"),
//   tertiary: require("../../../../assets/orange-aura.json"),
//   quaternary: require("../../../../assets/brown-aura.json"),
// };

// const { width } = Dimensions.get("window");

// const progressCurvedStyle = tva({
//   base: "flex-1",
//   variants: {
//     variant: {
//       default: "",
//       primary: "",
//       secondary: "",
//       tertiary: "",
//       quaternary: "",
//     },
//     size: {
//       small: "",
//       large: "",
//     },
//   },
// });

// const progressCurvedBackgroundPathStyle = tva({
//   base: "{}-[strokeWidth]:h-1",
//   variants: {
//     variant: {
//       default: "",
//       primary: "",
//       secondary: "",
//       tertiary: "",
//       quaternary: "",
//     },
//   },
// });

// const progressCurvedForegroundPathStyle = tva({
//   base: "{}-[strokeWidth]:h-1",
//   variants: {
//     variant: {
//       default: "{}-[color]:stroke-red-500",
//       primary: "{}-[color]:stroke-pmi-violet-300 dark:{}-[color]:stroke-pmi-violet-300",
//       secondary: "{}-[color]:stroke-pmi-aqua-300 dark:{}-[color]:stroke-pmi-aqua-300",
//       tertiary: "{}-[color]:stroke-pmi-tangerine-300 dark:{}-[color]:stroke-pmi-tangerine-300",
//       quaternary: "{}-[color]:stroke-pmi-saddle-300 dark:{}-[color]:stroke-pmi-saddle-300",
//     },
//   },
// });

// const progressCurvedAuraStyle = tva({
//   base: "absolute top-[-20] left-[40] bottom-0",
//   variants: {
//     size: {
//       small: "left-[40] top-[20]",
//       large: "left-[-5] top-[20]",
//     },
//   },
// });

// interface ProgressCurvedProps extends Omit<React.ComponentProps<typeof View>, "children"> {
//   progress?: number;
//   limit?: number;
//   variant?: "default" | "primary" | "secondary" | "tertiary" | "quaternary";
//   size?: "small" | "large";
//   children?: React.ReactNode;
// }

// type IProgressPathProps = React.ComponentPropsWithoutRef<typeof Path> & {
//   className?: string;
//   variant?: "default" | "primary" | "secondary" | "tertiary" | "quaternary";
//   size?: "small" | "large";
//   start?: number;
//   end?: SharedValue<number>;
//   color?: string;
//   progress?: number;
//   limit?: number;
//   isBackground?: boolean;
// };

// const PrimitivePath = ({
//   progress,
//   limit = 100,
//   variant = "default",
//   style,
//   isBackground,
//   ...props
// }: IProgressPathProps) => {
//   const percent = progress ? progress / limit : 0;
//   const percentage = useSharedValue(0);

//   useEffect(() => {
//     percentage.value = withDelay(1000, withTiming(percent, { duration: 1000 }));
//   }, [progress, limit]);

//   return <Path {...props} style="stroke" strokeCap="round" start={0} end={isBackground ? 100 : percentage} />;
// };

// cssInterop(Canvas, { className: "style" });
// cssInterop(PrimitivePath, { className: "style" });
// cssInterop(LottieView, { className: "style" });
// cssInterop(View, { className: "style" });

// const ProgressCurved = ({
//   progress,
//   limit = 100,
//   variant = "default",
//   size = "small",
//   className,
//   children,
//   ...props
// }: ProgressCurvedProps) => {
//   const baseSize = width - 40;
//   const center = baseSize / 2;
//   const strokeWidth = 4;
//   const { PI, cos, sin } = Math;
//   const progressCurved = progress ?? 100;
//   const getRadius = () => {
//     switch (size) {
//       case "small":
//         return (width - strokeWidth) / 2.5 - 40;
//       case "large":
//       default:
//         return (width - strokeWidth) / 2 - 40;
//     }
//   };

//   const r = getRadius();
//   const startAngle = PI;
//   const endAngle = PI * 2;

//   const x1 = center - r * cos(startAngle);
//   const y1 = -r * sin(startAngle) + center;
//   const x2 = center - r * cos(endAngle);
//   const y2 = -r * sin(endAngle) + center;

//   const rx = (x2 - x1) / 2;
//   const ry = rx * Math.cos(0.28);

//   const backgroundPath = `M ${x1} ${y1} A ${rx} ${ry} 0 1 0 ${x2} ${y2}`;
//   const skiaBackgroundPath = Skia.Path.MakeFromSVGString(backgroundPath);
//   const foregroundPath = `M ${x2} ${y2} A ${rx} ${ry} 1 0 1 ${x1} ${y1}`;
//   const skiaForegroundPath = Skia.Path.MakeFromSVGString(foregroundPath);

//   const percent = progressCurved / limit;
//   const percentage = useSharedValue(0);

//   const variantStyles: Record<
//     "default" | "primary" | "secondary" | "tertiary" | "quaternary",
//     { colors: string[]; start: number[]; end: number[] }
//   > = {
//     default: {
//       colors: ["#200F3B33", "#FFFFFF33"],
//       start: [1, 0],
//       end: [0, 0],
//     },
//     primary: {
//       colors: ["#200F3B33", "#FFFFFF33"],
//       start: [1, 0],
//       end: [0, 0],
//     },
//     secondary: {
//       colors: ["#200F3B33", "#FFFFFF33"],
//       start: [1, 0],
//       end: [0, 0],
//     },
//     tertiary: {
//       colors: ["#200F3B33", "#FFFFFF33"],
//       start: [1, 0],
//       end: [0, 0],
//     },
//     quaternary: {
//       colors: ["#4A2D1733", "#E0CEC133"],
//       start: [1, 0],
//       end: [0, 0],
//     },
//   };

//   useEffect(() => {
//     percentage.value = withTiming(percent, { duration: 1000 });
//   }, [progress, limit]);

//   if (!skiaBackgroundPath || !skiaForegroundPath) return null;

//   const [animationShouldLoop, setAnimationShouldLoop] = useState(false);
//   const loopStartingFrame = 68;
//   const loopEndingFrame = 118;
//   const animationRef = useRef<LottieView>(null);
//   return (
//     <View {...props} style={{ height: r * 1.5, width }} className="bg-transparent self-center justify-center">
//       <View style={{ height: r * 2 }} className={`w-[${width}] border-1 self-center justify-center`}>
//         {progressCurved / limit >= 1 && (
//           <LottieView
//             ref={animationRef}
//             style={{ height: r * 2 - 40, width: width - (size === "small" ? 120 : 30) }}
//             // @ts-ignore
//             className={progressCurvedAuraStyle({ size })}
//             autoPlay
//             loop={animationShouldLoop}
//             onAnimationFinish={() => {
//               setAnimationShouldLoop(true);
//               animationRef.current?.play(loopStartingFrame, loopEndingFrame);
//             }}
//             source={auras[variant]}
//           />
//         )}
//         <View style={{ height: r * (size === "large" ? 1.2 : 2), width: width - 40 }} className="mt-2">
//           <Canvas className={progressCurvedStyle({ variant, size, class: className })}>
//             <PrimitivePath
//               className={progressCurvedBackgroundPathStyle({ variant })}
//               path={skiaBackgroundPath}
//               isBackground
//             />
//             <PrimitivePath
//               limit={limit}
//               progress={progress}
//               path={skiaForegroundPath}
//               className={progressCurvedForegroundPathStyle({ variant })}
//             />
//             <SweepGradient colors={variantStyles[variant].colors} c={vec(center * 2, center * 2)} />
//             <BlurMask blur={3} style="solid" />
//           </Canvas>
//         </View>
//       </View>
//       {children}
//     </View>
//   );
// };

// export { ProgressCurved };
