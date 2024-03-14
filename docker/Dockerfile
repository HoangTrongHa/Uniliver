# Указываем базовый образ
FROM node:18.16.0-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем описание зависимостей приложения
COPY package.json package-lock.json ./

# Change npm cache default path
ENV NPM_CONFIG_USERCONFIG=/app/.npm

# Устанавливаем зависимости с помощью npm ci + curl для healthcheck
# hadolint ignore=DL3018
RUN npm config set cache /app/.npm  --global \
    && npm ci \
    && apk add --no-cache curl

# Копируем файлы приложения
COPY . .

# Собираем приложение
RUN npm run build \
    && chown -R nobody:nobody /app/.npm

# Указываем пользователя для запуска приложения (запускать под root несекурно)
USER nobody

# Указываем команду для запуска приложения в контейнере
CMD ["npm", "run", "start"]

# Команда для проверки работы приложения
HEALTHCHECK --interval=15s --timeout=3s --start-period=3s CMD \
    curl -Is 127.0.0.1:3000 | grep -q '200 OK'

# for gitlabci healthchecks
EXPOSE 3000/tcp
