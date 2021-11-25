import { DateTime } from "luxon"

export const blogPostUrl = post => {
  const date = DateTime.fromISO(post.date).setZone("Europe/Helsinki")

  return `/${datetoFormat("yyyy-LL-dd")}/${post.slug}`
}
