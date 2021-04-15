FROM ubuntu:20.04

WORKDIR /opt/data

RUN apt-get update && apt-get upgrade -y && \
    apt-get install --no-install-recommends -y \ 
    python3-pip && \
    pip3 install --no-cache-dir -r requirements.txt && \
    apt-get remove -y python3-pip && \
    rm -rf /var/lib/apt/lists/*

# RUN useradd -m appuser
# USER appuser

COPY . /opt/data
WORKDIR /opt/data

EXPOSE 5000

CMD ["gunicorn", "-c", "gunicorn_config.py", "dataApi:api"]