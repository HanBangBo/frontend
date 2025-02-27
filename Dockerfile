# Node.js 이미지를 사용하여 React 빌드
FROM node:22.14.0 AS build
WORKDIR /hanbangbo

# package.json과 yarn.lock 복사 후 의존성 설치
COPY hanbangbo/package.json yarn.lock ./
RUN yarn install

# 프로젝트 코드 복사 및 빌드 실행
COPY . .
RUN yarn build

# Nginx를 사용하여 정적 파일 배포
FROM nginx:latest
COPY --from=build /hanbangbo/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Nginx 실행 (React 앱을 80번 포트에서 서비스)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
