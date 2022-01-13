FROM nginx
ADD build /usr/share/nginx/html
RUN rm etc/nginx/conf.d/default.conf
COPY heroku.nginx.conf etc/nginx/conf.d/

# Start Nginx server
CMD ["/bin/bash", "-c", "sed -i -e 's/$PORT/'\"$PORT\"'/g' /etc/nginx/conf.d/nginx.conf && nginx -g \"daemon off;\""]
