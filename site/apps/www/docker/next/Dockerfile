# Pinned by version and digest: upgrades happen when we decide.
FROM node:24.22.1-alpine3.24@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# The version in package.json's packageManager.
RUN npm -g i pnpm@11.26.0

FROM base AS builder
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
ENV NEXT_TELEMETRY_DISABLED=1
RUN --mount=type=secret,id=env,target=/usr/src/app/apps/www/.env pnpm run -r build
RUN pnpm deploy --filter="./apps/www" --prod /prod/www

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS runner
# COPY --from=build /prod/app1 /prod/app1
WORKDIR /prod/www

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /prod/www/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing

COPY --from=builder --chown=nextjs:nodejs /prod/www/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /prod/www/.next/standalone/apps/www ./
COPY --from=builder --chown=nextjs:nodejs /prod/www/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]

