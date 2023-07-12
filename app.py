import sqlalchemy as db
from flask import Flask, render_template

# creates database if it does not already exist
engine = db.create_engine('sqlite:///highscores.db')
# tracks all tables
metadata = db.MetaData()
# schema of table
score_table = db.Table("Highscores", metadata,
                db.Column("Name", db.String(20)),
                db.Column("Score", db.Integer))
# creates all tables associated with metadata
metadata.create_all(engine)

app = Flask(__name__)

@app.route("/update_score", methods = ["GET"])
def update_score():
    score_dict = {
    "Name" : "Bob",
    "Score" : 0
    }
    with engine.connect() as connection:
        connection.execute(score_table.insert(), score_dict)
        connection.commit()
    return "make sure to change to POST"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/recipe_select")
def select():
    return render_template("recipe_select.html")

@app.route("/alfredo/home")
def alfredo_home():
    return render_template("alfredo/home.html")

@app.route("/beef/home")
def beef_home():
    return render_template("beef/home.html")

@app.route("/cheese/home")
def cheese_home():
    return render_template("cheese/home.html")

@app.route("/pancakes/home")
def pancakes_home():
    with engine.connect() as connection:
        # SELECT * FROM score_table
        # print(db.select(score_table).order_by(score_table.c.Score.desc()))
        query = db.select(score_table).order_by(score_table.c.Score.desc())
        print(query)
        query_result = connection.execute(query)
        rows = query_result.fetchall()
        query_all = db.select(score_table)
        query_all_res = connection.execute(query_all)
        all_rows = query_all_res.fetchall()
        print("ROWS: ", rows)
        print("ALL ROWS: ", all_rows)
    return render_template("pancakes/home.html")

@app.route("/squid/home")
def squid_home():
    return render_template("squid/home.html")

@app.route("/alfredo/chop")
def alfredo_chop():
    return render_template("alfredo/chop.html")

@app.route("/beef/chop")
def beef_chop():
    return render_template("beef/chop.html")

@app.route("/cheese/chop")
def cheese_chop():
    return render_template("cheese/chop.html")

@app.route("/pancakes/chop")
def pancakes_chop():
    return render_template("pancakes/chop.html")

@app.route("/squid/chop")
def squid_chop():
    return render_template("squid/chop.html")


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8000)
