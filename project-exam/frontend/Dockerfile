FROM nginx:alpine

# Copy static files
COPY . /usr/share/nginx/html

# Copy custom nginx config for reverse proxy
# Note: In production build, we assume the config is provided in the build context
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
