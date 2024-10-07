export function timeAgo(date: string | Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

  let interval: number;

  interval = Math.floor(seconds / 31536000);
  if (interval === 1) return `${interval} year ago`;
  if (interval > 1) return `${interval} years ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval === 1) return `${interval} month ago`;
  if (interval > 1) return `${interval} months ago`;

  interval = Math.floor(seconds / 86400);
  if (interval === 1) return `${interval} day ago`;
  if (interval > 1) return `${interval} days ago`;

  interval = Math.floor(seconds / 3600);
  if (interval === 1) return `${interval} hour ago`;
  if (interval > 1) return `${interval} hours ago`;

  interval = Math.floor(seconds / 60);
  if (interval === 1) return `${interval} minute ago`;
  if (interval > 1) return `${interval} minutes ago`;

  return `${seconds} seconds ago`;
}
