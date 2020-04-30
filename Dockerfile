FROM ubuntu:18.04

RUN apt-get update && apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -

RUN apt-get update && apt-get install -y bash nodejs

WORKDIR /app

COPY src /app/

# If you are building your code for production
# RUN npm ci --only=production
RUN rm -rf node_modules && npm install

EXPOSE 3000

COPY start.sh /start.sh

CMD /start.sh
