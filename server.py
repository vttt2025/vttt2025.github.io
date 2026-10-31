import http.server
import socketserver
import os
import sys

PORT = 8000
if len(sys.argv) > 1:
    try:
        PORT = int(sys.argv[1])
    except ValueError:
        pass

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        # Xu ly query param truoc khi translate path
        clean_path = self.path.split('?')[0].split('#')[0]
        local_path = self.translate_path(clean_path)
        
        # Neu duong dan khong ton tai tren o dia
        if not os.path.exists(local_path):
            if os.path.exists('404.html'):
                self.send_response(404)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                with open('404.html', 'rb') as f:
                    content = f.read()
                self.send_header('Content-Length', str(len(content)))
                self.end_headers()
                self.wfile.write(content)
                return
        return super().do_GET()

if __name__ == '__main__':
    # Su dung ThreadingHTTPServer de phuc vu da luong dong thoi, tranh tinh trang trinh duyet mo nhieu ket noi lam treo / loading mai
    server_class = getattr(http.server, 'ThreadingHTTPServer', socketserver.ThreadingTCPServer)
    server_class.allow_reuse_address = True
    with server_class(("", PORT), SPAHandler) as httpd:
        print(f"RusiTRKI server running at http://localhost:{PORT}")
        print("Serving 404.html for any not-found path (like GitHub Pages).")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
