import sqlalchemy as db
from flask import Flask, render_template, request, jsonify

# creates database if it does not already exist
engine = db.create_engine('sqlite:///highscores.db')
# tracks all tables
metadata = db.MetaData()
# schema of table
score_table_pancakes = db.Table("Highscores_pancakes", metadata,
                db.Column("Name", db.String(20)),
                db.Column("Score", db.Integer))
score_table_cheese = db.Table("Highscores_cheese", metadata,
                db.Column("Name", db.String(20)),
                db.Column("Score", db.Integer))
score_table_squid = db.Table("Highscores_squid", metadata,
                db.Column("Name", db.String(20)),
                db.Column("Score", db.Integer))
score_table_beef = db.Table("Highscores_beef", metadata,
                db.Column("Name", db.String(20)),
                db.Column("Score", db.Integer))
score_table_alfredo = db.Table("Highscores_alfredo", metadata,
                db.Column("Name", db.String(20)),
                db.Column("Score", db.Integer))
# creates all tables associated with metadata
metadata.create_all(engine)

app = Flask(__name__)

@app.route("/<recipe>/serve", methods = ["GET","POST"])
def insert_score(recipe):
    table_name = ""

    if recipe == "beef":
        table_name = score_table_beef
    elif recipe == "squid":
        table_name = score_table_squid
    elif recipe == "cheese":
        table_name = score_table_cheese
    elif recipe == "alfredo":
        table_name = score_table_alfredo
    elif recipe == "pancakes":
        table_name = score_table_pancakes

    if request.method == "POST":
        name = request.form.get('name')
        # score = request.form.get('score')
        scores = {
        "Name" : name,
        "Score" : 10000
        }
        with engine.connect() as connection:
            connection.execute(table_name.insert(), scores)
            connection.commit()
        return jsonify(scores)
    # account for url when recipe is invalid

    with engine.connect() as connection:
        query = db.select(table_name).order_by(table_name.c.Score.desc()).limit(5)
        print("Q: ", query)
        query_result = connection.execute(query)
        rows = query_result.fetchall()
        print("ROWS: ", rows)

    temp = f"{recipe}/serve.html"
    return render_template(temp, rows=rows)

@app.route("/deleter")
def deleter():
    db.delete(score_table_pancakes)
    return "Opps! Dropped the pancakes. T_T"


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/recipe_select")
def select():
    return render_template("recipe_select.html")

@app.route("/game")
def game0():
    return render_template("game.html")

@app.route("/stack")
def game1():
    return render_template("stack.html")

@app.route("/chop_game")
def game2():
    return render_template("chop_game.html")

@app.route("/pan_game")
def game3():
    return render_template("pan_game.html")


@app.route("/alfredo/home")
def alfredo_home():
    with engine.connect() as connection:
        # SELECT * FROM score_table
        # print(db.select(score_table).order_by(score_table.c.Score.desc()))
        query = db.select(score_table_alfredo).order_by(score_table_alfredo.c.Score.desc()).limit(5)
        print("Q: ", query)
        query_result = connection.execute(query)
        rows = query_result.fetchall()
        print("ROWS: ", rows)

    return render_template("alfredo/home.html", rows = rows)

@app.route("/beef/home")
def beef_home():
    with engine.connect() as connection:
        # SELECT * FROM score_table
        # print(db.select(score_table).order_by(score_table.c.Score.desc()))
        query = db.select(score_table_beef).order_by(score_table_beef.c.Score.desc()).limit(5)
        print("Q: ", query)
        query_result = connection.execute(query)
        rows = query_result.fetchall()
        print("ROWS: ", rows)

    return render_template("beef/home.html", rows = rows)

@app.route("/cheese/home")
def cheese_home():
    with engine.connect() as connection:
        # SELECT * FROM score_table
        # print(db.select(score_table).order_by(score_table.c.Score.desc()))
        query = db.select(score_table_cheese).order_by(score_table_cheese.c.Score.desc()).limit(5)
        print("Q: ", query)
        query_result = connection.execute(query)
        rows = query_result.fetchall()
        print("ROWS: ", rows)
    return render_template("cheese/home.html", rows = rows)

@app.route("/pancakes/home")
def pancakes_home():
    with engine.connect() as connection:
        # SELECT * FROM score_table
        # print(db.select(score_table).order_by(score_table.c.Score.desc()))
        query = db.select(score_table_pancakes).order_by(score_table_pancakes.c.Score.desc()).limit(5)
        print("Q: ", query)
        query_result = connection.execute(query)
        rows = query_result.fetchall()
        print("ROWS: ", rows)

    return render_template("pancakes/home.html", rows = rows)

@app.route("/squid/home")
def squid_home():
    with engine.connect() as connection:
        # SELECT * FROM score_table
        # print(db.select(score_table).order_by(score_table.c.Score.desc()))
        query = db.select(score_table_squid).order_by(score_table_squid.c.Score.desc()).limit(5)
        print("Q: ", query)
        query_result = connection.execute(query)
        rows = query_result.fetchall()
        print("ROWS: ", rows)

    return render_template("squid/home.html", rows = rows)

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

@app.route("/cheese/serve")
def cheese_serve():
    return render_template("cheese/serve.html")


@app.route("/pancakes/mix")
def pancakes_mix():
    return render_template("pancakes/mix.html")

@app.route("/squid/mix")
def squid_mix():
    return render_template("squid/mix.html")

@app.route("/beef/mix")
def beef_mix():
    return render_template("beef/mix.html")

@app.route("/alfredo/mix")
def alfredo_mix():
    return render_template("alfredo/mix.html")

@app.route("/cheese/mix")
def cheese_mix():
    return render_template("cheese/mix.html")

# @app.route("/pancakes/serve")
# def panacakes_serve():
#     with engine.connect() as connection:
#         # SELECT * FROM score_table
#         # print(db.select(score_table).order_by(score_table.c.Score.desc()))
#         query = db.select(score_table_pancakes).order_by(score_table_pancakes.c.Score.desc())
#         print("Q: ", query)
#         query_result = connection.execute(query)
#         rows = query_result.fetchall()
#         print("ROWS: ", rows)
#     return render_template("pancakes/serve.html", rows=rows)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port = 8000)
