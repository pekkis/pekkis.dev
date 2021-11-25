import { DateTime } from "luxon"

export const blogPostUrl = post => {
  const date = DateTime.fromISO(post.date)
  return `/${date.toFormat("yyyy-LL-dd")}/${post.slug}`
}
