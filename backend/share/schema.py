from drf_spectacular.extensions import OpenApiAuthenticationExtension


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
