FROM node:18

WORKDIR /my-app

# Install dependencies
COPY package*.json ./
RUN npm install

COPY . .

# ENV for React dev server
ENV HOST=0.0.0.0
ENV PORT=3000
ENV BROWSER=none

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

