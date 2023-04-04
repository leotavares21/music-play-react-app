export default function convertDurationToTimeString(duration) {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);

  const timeString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return timeString;
}
