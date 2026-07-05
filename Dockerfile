#Base Image
From node:latest


#Preparation Commands / Settings 


WORKDIR /app


# Copy files

COPY package*.json ./


RUN  npm ci


COPY . .


RUN npm run build

EXPOSE  3000

#Startup Command

CMD [ "npm", "start" ]