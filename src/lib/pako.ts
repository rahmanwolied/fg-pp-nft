import pako from "pako";

export const compress = (data: string) => {
  const compressed = pako.deflate(data, { level: 9 });
  return Buffer.from(compressed).toString("base64");
};

export const decompress = (data: string) => {
  const compressed = Buffer.from(data, "base64");
  return pako.inflate(compressed, { to: "string" });
};
