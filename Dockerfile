# Node.js 이미지를 사용하여 React 빌드
FROM node:22.14.0 AS build
WORKDIR /app
# package 파일 복사 및 의존성 설치
COPY hanbangbo/package.json hanbangbo/yarn.lock ./
RUN yarn install
# 소스 코드 복사 및 빌드
COPY hanbangbo/ ./
RUN yarn run build

# 2단계: Nginx 이미지 생성
FROM nginx:stable-alpine
# 기본 설정 삭제
RUN rm /etc/nginx/conf.d/default.conf
# 커스텀 Nginx 설정 복사 (docker build context의 nginx 폴더)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# React 빌드 결과물을 Nginx html 폴더로 복사
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
