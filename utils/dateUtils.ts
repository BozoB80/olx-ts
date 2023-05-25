export function getTimeAgo(date: Date): string {
  const diffMillis: number = Date.now() - date.getTime();
  const diffMinutes: number = Math.floor(diffMillis / (1000 * 60));
  const diffHours: number = Math.floor(diffMillis / (1000 * 60 * 60));
  const diffDays: number = Math.floor(diffMillis / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
}