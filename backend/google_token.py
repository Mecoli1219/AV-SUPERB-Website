from google.auth.transport import requests
from google.oauth2 import id_token


VALID_ISSUERS = ['accounts.google.com', 'https://accounts.google.com']


def validate_id_token(idt: str, client_id: str) -> dict:
    """Validate the id_token passed using Google's validation code.

    idt is an id_token, which can be extracted from an OpenID Connect
    authorization response as the 'id_token' field.

    Raises ValueError if the validation failures, otherwise returns the decoded
    token.
    """
    id_info = id_token.verify_oauth2_token(idt,  requests.Request(), client_id, clock_skew_in_seconds=60)
    if id_info['iss'] not in VALID_ISSUERS:
        raise ValueError('Wrong issuer.')
    return id_info
