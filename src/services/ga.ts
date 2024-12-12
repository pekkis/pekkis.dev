/* eslint-disable @typescript-eslint/ban-ts-comment */
// log the pageview with their URL
export const pageview = (url: string) => {
  // @ts-expect-error
  window?.gtag?.("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url
  });
};

// log specific events happening.
export const event = ({
  action,
  params
}: {
  action: string;
  params: unknown;
}) => {
  // @ts-expect-error
  window?.gtag?.("event", action, params);
};
