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

	json = jsonify({
		'id': db_query[0],
		'photo': {
			'url': db_query[1],
			'color': db_query[6],
			'width': db_query[5],
			'height': db_query[4]
		},
		'author': {
			'name': db_query[2],
			'author_url': db_query[3]
		}
	})

	return make_response(json, 200, {"Access-Control-Allow-Origin": "*"})

@app.route("/photos/v1.0/image/<int:image_id>", methods=["GET"])  
def get_image(image_id):
	cur.execute("SELECT (photo_id,photo_url,photo_average_color,photo_width,photo_height,photo_author,photo_author_url) FROM photos WHERE photo_id=%s;", [image_id])
	db_query = cur.fetchone()
	if (db_query == None): abort(404)

	json = jsonify({
		'id': db_query[0],
		'photo': {
			'url': db_query[1],
			'color': db_query[2],
			'width': db_query[3],
			'height': db_query[4]
		},
		'author': {
			'name': db_query[5],
			'author_url': db_query[6]
		}
	})

	return make_response(json, 200, {"Access-Control-Allow-Origin": "*"})

#error handling
@app.errorhandler(404)
def not_found_handler(error):
	return make_response(jsonify({'error': 'image not found'}), 404)

if __name__ == '__main__':
    app.run(debug=True)