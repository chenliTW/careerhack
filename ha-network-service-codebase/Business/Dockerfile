FROM python:3.9
ENV PYTHONPATH "${PYTHONPATH}:/app"
WORKDIR /app
EXPOSE 8100
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
ENTRYPOINT python3 app/main.py
