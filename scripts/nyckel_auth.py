import requests

def get_nyckel_token():
    token_url = 'https://www.nyckel.com/connect/token'
    credentials = {
        'grant_type': 'client_credentials',
        'client_id': 'w86ee2axnfc8rxa11vlp7sxivkfg8seh',
        'client_secret': '81fqvtcmq69t17rss4yeoxo3anjtmtov1v0qij57izy0j4hnsmo4t0sbdbg8ajzx'
    }

    try:
        response = requests.post(token_url, data=credentials)
        response.raise_for_status()  # Raise an exception for bad status codes
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error getting token: {e}")
        return None

if __name__ == "__main__":
    result = get_nyckel_token()
    if result:
        print("Token received successfully:")
        print(result) 