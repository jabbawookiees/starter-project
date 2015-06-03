from pyramid.view import view_config
from pyramid.response import Response

@view_config(route_name='hi', request_method='GET')
def hi(request):
    return Response("Hi")

@view_config(route_name='hello', request_method='GET')
def hello(request):
    return Response("Hello")

