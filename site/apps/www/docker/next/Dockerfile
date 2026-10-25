# Pinned by version and digest: upgrades happen when we decide.
FROM node:26.12.1-alpine3.24@sha256:40cd011b55415bc894e45b02fdd5a5dfde056921b7d23a64c74f80497af48797 AS base

FROM base AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# The version in package.json's packageManager.
RUN npm -g i pnpm@12.15.0
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
ENV NEXT_TELEMETRY_DISABLED=1
# The standalone output copies .env along; remove it so runtime env comes from compose's env_file only.
RUN --mount=type=secret,id=env,target=/usr/src/app/apps/www/.env pnpm run -r build \
  && find apps/www/.next/standalone -name ".env*" -delete

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# The standalone output is the whole server: server.js and exactly the node_modules it
# traced, laid out like the workspace (apps/www/server.js). Static files and public are
# served from beside it. https://nextjs.org/docs/app/api-reference/config/next-config-js/output
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/apps/www/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/apps/www/.next/static ./apps/www/.next/static
COPY --from=builder /usr/src/app/apps/www/public ./apps/www/public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "apps/www/server.js"]
