FROM nginx
WORKDIR /home/ubuntu/S08P12B207/frontend
RUN mkdir ./build
ADD ./dist ./dist
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]