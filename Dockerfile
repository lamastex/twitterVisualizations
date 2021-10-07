# specify the node base image with your desired version node:<version>
FROM node:14-alpine AS development
ENV NODE_ENV development
WORKDIR '/app'

# copy the package.json
COPY package.json .

#install all the dependincies
RUN npm install

#copy all the source code file
COPY . .

# replace this with your application's default port
EXPOSE 3000

#start the app
CMD ["npm", "start"]
#ENTRYPOINT ["/bin/bash"]