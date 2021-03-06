#!flask/bin/python
from flask import *
import urllib,psycopg2,os,json

app = Flask(__name__)
conn = psycopg2.connect(os.environ["DATABASE_URL"])
cur = conn.cursor()

# static pages

@app.route("/")
def root(): return app.send_static_file("index.html");

@app.route("/tag", methods=["GET","POST"])
def tag(): 
	print request.form
	if (request.method == "GET"):
		return app.send_static_file("tag.html")
	else: 
		if ("photo_id" not in request.form): return wrap_response(json.JSONEncoder().encode({ "result": False, "message": "photo doesn't exist" }), 200)
		if ("photo_tag" not in request.form): return wrap_response(json.JSONEncoder().encode({ "result": False, "message": "tag is required" }), 200)

		photo_id = request.form["photo_id"]
		photo_tag = request.form["photo_tag"]

		cur.execute("INSERT INTO tags VALUES(%s,%s);", [photo_id, photo_tag])
		conn.commit()
	return wrap_response(json.JSONEncoder().encode({ "result": True, "message": "success" }), 200)

@app.route("/photos/splashbase/random")
def splashbase_random():
	return make_response(urllib.urlopen("http://www.splashbase.co/api/v1/images/random").read(), 200, {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"})

@app.route("/photos/v1.0/random", methods=["GET"])
def get_random():
	cur.execute("SELECT * FROM photos ORDER BY random() LIMIT 1;")
	db_query = cur.fetchone()

	return wrap_response(json.JSONEncoder().encode(wrap_db_query(db_query)), 200)

@app.route("/photos/v1.0/image/<int:image_id>", methods=["GET"])  
def get_image(image_id):
	cur.execute("SELECT * FROM photos WHERE photo_id=%s;", [image_id])
	db_query = cur.fetchone()
	if (db_query == None): abort(404)

	return wrap_response(json.JSONEncoder().encode(wrap_db_query(db_query)), 200)

@app.route("/photos/v1.0/list", methods=["GET"])
def get_list():
	count = 15 if "count" not in request.args else min(int(request.args["count"]), 20)
	after = 0 if "after" not in request.args else int(request.args["after"])

	if (after == 0): cur.execute("SELECT * FROM photos ORDER BY photo_id DESC LIMIT %s;", [count]);
	else: cur.execute("SELECT * FROM photos WHERE photo_id < %s ORDER BY photo_id DESC LIMIT %s;", [after, count]);

	response = []
	db_query = cur.fetchone()
	while db_query:
		response.append(wrap_db_query(db_query));
		db_query = cur.fetchone()
	
	return wrap_response(json.JSONEncoder().encode(response), 200)

def wrap_db_query(db_query):
	return {
		'id': db_query[0],
		'url': db_query[1],
		'color': db_query[6],
		'width': db_query[5],
		'height': db_query[4],
		'author': {
			'name': db_query[2],
			'url': db_query[3]
		}
	}

def wrap_response(body, response_code):
	return make_response(body, response_code, {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"})

#error handling
@app.errorhandler(404)
def not_found_handler(error):
	return make_response(jsonify({'error': 'image not found'}), 404)

if __name__ == '__main__':
    app.run(debug=False,threaded=False)
