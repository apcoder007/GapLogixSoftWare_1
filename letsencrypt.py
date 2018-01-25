from flask import Flask, Response

app = Flask(__name__)
app.config['DEBUG'] = True



response = 'XuA6QvRyomET1A2w2m8kyLovfIzNtbH_DxqbQmagNm8'


@app.route('/.well-known/acme-challenge/<challenge>')
def letsencrypt(challenge):
    newRes= str(challenge)+"."+ response
    return Response(newRes, mimetype='text/plain')
