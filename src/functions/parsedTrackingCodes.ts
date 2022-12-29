export function parsedTrackingCodes(raw: string) {
  return raw
    .toUpperCase()
    .replace(" ", "")
    .split(/[;,./-]/g);
}
