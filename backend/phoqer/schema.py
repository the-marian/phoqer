from drf_spectacular.extensions import (OpenApiAuthenticationExtension,
                                        OpenApiViewExtension)
from drf_spectacular.utils import OpenApiParameter, extend_schema

from users.serializers import TokenSerializer


class TokenAuthenticationScheme(OpenApiAuthenticationExtension):
    target_class = 'rest_framework.authentication.TokenAuthentication'
    name = 'Token Auth'
    match_subclasses = True

    def get_security_definition(self, auto_schema):
        return {
            'type': 'http',
            'scheme': 'bearer',
            'bearerFormat': 'Token'
        }


class FixTokenCreateView(OpenApiViewExtension):
    target_class = 'djoser.views.TokenCreateView'

    def view_replacement(self):
        class Fixed(self.target_class):

            @extend_schema(
                responses=TokenSerializer
            )
            def post(self, request, *args, **kwargs):
                pass

        return Fixed


class FixSearchOffersView(OpenApiViewExtension):
    target_class = 'offers.views.SearchOffersView'

    def view_replacement(self):
        class Fixed1(self.target_class):

            @extend_schema(
                parameters=[
                    OpenApiParameter(
                        name='max_price',
                        description='Filter by max_price. Return all offers that lower this price',
                        required=False,
                        type=int,
                    ),
                    OpenApiParameter(
                        name='min_price',
                        type=int,
                        required=False,
                        description='Filter by min_price. Return all offers that higher this price',
                    ),
                ],
            )
            def get(self, request, *args, **kwargs):
                pass

        return Fixed1
