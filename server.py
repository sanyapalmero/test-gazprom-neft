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
            groups = open("fixtures/groups.json").read()
            groups_list = json.loads(groups)
            groups_str = json.dumps(groups_list)
            self.wfile.write(bytes(groups_str, 'utf-8'))
        elif self.path == '/tables':
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            tables = open("fixtures/tables.json").read()
            tables_list = json.loads(tables)
            table_names = []
            for table in tables_list:
                table_names.append({
                    "name": table["name"],
                    "group_id": table["group_id"]
                })
            tables_str = json.dumps(table_names)
            self.wfile.write(bytes(tables_str, 'utf-8'))
        else:
            self.send_response(404)
            self.end_headers()


server = HTTPServer((HOST, PORT), Server)

print(f"Starting local server at http://{HOST}:{PORT}")
print("Quit the server with CONTROL-C.")

try:
    server.serve_forever()
except KeyboardInterrupt:
    server.server_close()
