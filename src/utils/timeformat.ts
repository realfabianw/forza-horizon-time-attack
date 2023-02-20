export function formatTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const milliseconds = Math.floor(timeInSeconds * 1000) % 1000;

  // Pad the minutes, seconds, and milliseconds with leading zeroes
  // if they are less than 10
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const millisecondsStr =
    milliseconds < 10
      ? `00${milliseconds}`
      : milliseconds < 100
      ? `0${milliseconds}`
      : `${milliseconds}`;

  return `${minutesStr}:${secondsStr}.${millisecondsStr}`;
}

export function convertTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const milliseconds = Math.floor(
    (remainingSeconds - Math.floor(remainingSeconds)) * 1000
  );
  return {
    minutes,
    seconds: Math.floor(remainingSeconds),
    milliseconds,
  };
}
