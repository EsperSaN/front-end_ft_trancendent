FROM nginx

WORKDIR /usr/src/app

COPY ./* .

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]



