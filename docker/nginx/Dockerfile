FROM nginx:latest

RUN rm ./etc/nginx/conf.d/default.conf
COPY ./docker/django_recipe.conf /etc/nginx/conf.d/
