# Development
```
docker run -it --rm \
  -p 8081:80 \
  --name nginx \
  -v $(pwd):/usr/share/nginx/html docker.io/nginx:1.21-alpine
```