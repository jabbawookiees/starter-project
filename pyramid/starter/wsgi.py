from pyramid.config import Configurator
from pyramid.response import Response

def main(*args, **kwargs):
	config = Configurator()
	config.scan('starter.views')

	config.add_route('hello', '/hello')
	config.add_route('hi', '/hi')

	app = config.make_wsgi_app()
	return app

