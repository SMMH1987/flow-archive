FROM python:3.12-slim
RUN apt-get update && apt-get install -y --no-install-recommends git && rm -rf /var/lib/apt/lists/* \
 && git config --system --add safe.directory '*'
WORKDIR /app
COPY server.py index.html ./
ENV PROJECTS_ROOT=/projects PORT=8090
EXPOSE 8090
CMD ["python", "server.py"]
