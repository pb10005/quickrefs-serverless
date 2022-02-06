FROM node:buster-slim

RUN yarn global add vite
EXPOSE 3000

CMD [ "/bin/bash" ]