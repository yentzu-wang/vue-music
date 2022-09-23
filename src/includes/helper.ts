export const formatTime = (time: number | undefined): string => {
  if (!time) {
    return "00:00"
  }

  const minutes = Math.floor(time / 60)
  const seconds = `0${Math.floor(time % 60)}`.slice(-2)

  return `${minutes}:${seconds}`
}
