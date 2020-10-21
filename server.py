import json
import mimetypes
from http.server import HTTPServer, BaseHTTPRequestHandler

HOST = 'localhost'
PORT = 8000

INDEX_FILE_PATH = 'public/index.html'
CSS_PATH = 'public/style.css'
BUNDLE_PATH = 'public/bundle.js'

GROUPS_URL = '/groups'


class Server(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = "/" + INDEX_FILE_PATH
        elif self.path == '/style.css':
            self.path = "/" + CSS_PATH
        elif self.path == '/bundle.js':
            self.path = "/" + BUNDLE_PATH

        try:
            file = open(self.path[1:]).read()
            self.send_response(200)
            mimetype, _ = mimetypes.guess_type(self.path[1:])
            self.send_header('Content-type', mimetype)
        except FileNotFoundError:
            file = "File not found"
            self.send_response(404)

        self.end_headers()
        self.wfile.write(bytes(file, 'utf-8'))


    def do_POST(self):
        if self.path == '/groups':
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            json_str = json.dumps("{'test':'ok'}")
            self.wfile.write(bytes(json_str, 'utf-8'))


server = HTTPServer((HOST, PORT), Server)

print(f"Starting local server at http://{HOST}:{PORT}")
print("Quit the server with CONTROL-C.")

try:
    server.serve_forever()
except KeyboardInterrupt:
    server.server_close()
