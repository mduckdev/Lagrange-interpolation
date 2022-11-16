from flask import Flask
from flask import request, send_from_directory
import subprocess
import os
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='./build')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/showPlot", methods=["POST"])
def post():
    if(request.json):
        x_points = request.json['xPoints']
        y_points = request.json['yPoints']
        if(len(x_points) < 2 or len(y_points) < 2):
            return "Empty"
        if(len(x_points) != len(y_points)):
            return "wrong data"
        params = ["python", ".\\plot.py"]
        for i in range(len(x_points)):
            params.append(str(x_points[i])+","+str(y_points[i]))

        subprocess.Popen(params)
        return request.json
    return "Hello"


@app.route("/ping")
def get():
    return "Online"


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)
