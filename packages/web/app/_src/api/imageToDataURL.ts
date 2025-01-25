import arrayBufferToBase64 from "./arrayBufferToBase64";

export default async function imageToDataURL(
  imageUrl: string,
): Promise<string> {
  const arrayBuffer = await fetch(imageUrl).then((res) => res.arrayBuffer());
  return arrayBufferToBase64(arrayBuffer);
}
