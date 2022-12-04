export default function timeToReadable(time: number): string {
  const milliseconds: string = ((time % 1) * 1000).toFixed(0);
  const minutes = (time / 60).toFixed(0);
  let seconds = (
    time -
    Number(minutes) * 60 -
    Number(milliseconds) / 1000
  ).toFixed(0);

  Number(seconds) < 10 ? (seconds = "0" + seconds) : seconds;

  return minutes + ":" + seconds + "." + milliseconds;
}
