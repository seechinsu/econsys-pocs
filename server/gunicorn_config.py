bind = '0.0.0.0:8000'
workers = 2
timeout = 120
worker_class = 'gevent'

# import pydep
# def when_ready(server):
#     server.log.info("running prestart")
#     # pydep.app
#     pydep.start()
