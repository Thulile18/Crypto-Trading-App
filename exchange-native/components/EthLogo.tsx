import Svg, { Polygon } from "react-native-svg";

const shapes = [
  { points: "127.961,0 125.166,9.5 125.166,285.168 127.961,287.958 255.923,212.32", color: "#e9e7f0" },
  { points: "127.962,0 0,212.32 127.962,287.959 127.962,154.158", color: "#a9a5b8" },
  { points: "127.961,312.187 126.386,314.107 126.386,412.306 127.961,416.907 255.999,236.587", color: "#e9e7f0" },
  { points: "127.962,416.905 127.962,312.185 0,236.585", color: "#a9a5b8" },
  { points: "127.961,287.958 255.921,212.321 127.961,154.159", color: "#7c778f" },
  { points: "0,212.32 127.96,287.958 127.96,154.159", color: "#8e8aa3" },
];

type Props = {
  size: number;
};

export default function EthLogo({ size }: Props) {
  const height = size * 0.55;
  const width = height * (256 / 417);

  return (
    <Svg width={width} height={height} viewBox="0 0 256 417">
      {shapes.map((shape) => (
        <Polygon key={shape.points} points={shape.points} fill={shape.color} />
      ))}
    </Svg>
  );
}