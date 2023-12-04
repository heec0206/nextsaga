FROM node:16-slim
ENV PORT 3000
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
ENV NODE_ENV production
RUN npm run build
CMD ["npm", "run", "start"]