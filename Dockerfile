FROM nginx
ADD build /usr/share/nginx/html
RUN rm etc/nginx/conf.d/default.conf
COPY nginx.conf etc/nginx/conf.d/

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./scripts/multi-env.sh .
COPY ./scripts/.env .

# Make shell script executable and prevent windows encoding
RUN sed -i -e 's/\r$//' multi-env.sh && sed -i -e 's/\r$//' .env && chmod +x multi-env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/multi-env.sh && nginx -g \"daemon off;\""]


