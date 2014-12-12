#!flask/bin/python
from flask import *
import urllib
import psycopg2
import os

app = Flask(__name__)
conn = psycopg2.connect(os.environ["DATABASE_URL"])
cur = conn.cursor()

@app.route("/photos/splashbase/random")
def splashbase_random():
	return make_response(urllib.urlopen("http://www.splashbase.co/api/v1/images/random").read(), 200, {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"})

@app.route("/")
@app.route("/photos/v1.0/random", methods=["GET"])
def get_random():
	cur.execute("SELECT * FROM photos ORDER BY random() LIMIT 1;")
	db_query = cur.fetchone()

	return wrap_response(wrap_db_query(db_query), 200)

@app.route("/photos/v1.0/image/<int:image_id>", methods=["GET"])  
def get_image(image_id):
	cur.execute("SELECT * FROM photos WHERE photo_id=%s;", [image_id])
	db_query = cur.fetchone()
	if (db_query == None): abort(404)

	return wrap_response(wrap_db_query(db_query), 200)

def wrap_db_query(db_query):
	return jsonify({
		'id': db_query[0],
		'photo': {
			'url': db_query[1],
			'color': db_query[6],
			'width': db_query[5],
			'height': db_query[4]
		},
		'author': {
			'name': db_query[2],
			'url': db_query[3]
		}
	})

def wrap_response(body, response_code):
	return make_response(body, response_code, {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"})


#error handling
@app.errorhandler(404)
def not_found_handler(error):
	return make_response(jsonify({'error': 'image not found'}), 404)

if __name__ == '__main__':
    app.run(debug=True)