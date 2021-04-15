FROM ubuntu:20.04

WORKDIR /opt/data

COPY requirements.txt /opt/data

RUN apt-get update && apt-get upgrade -y && \
    apt-get install --no-install-recommends -y \ 
    python3-pip && \
    pip3 install --no-cache-dir -r requirements.txt && \
    apt-get remove -y python3-pip && \
    rm -rf /var/lib/apt/lists/*

COPY . /opt/data
WORKDIR /opt/data

EXPOSE 8000

CMD ["gunicorn", "-c", "gunicorn_config.py", "dataApi:api"]
