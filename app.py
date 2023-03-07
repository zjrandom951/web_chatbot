import openai
from flask import Flask, request, jsonify, session, redirect, render_template

openai.api_key = "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"
model_engine = "gpt-3.5-turbo"

app = Flask(__name__)
app.secret_key = 'super secret key'

messages = {}

@app.route('/', methods=['GET'])
def index():
    if 'username' in session:
        return redirect('/home')
    else:
        return render_template('register.html')

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']
    if username and password:
        session['username'] = username
        session['password'] = password
        return redirect('/home')
    else:
        return "请填写用户名和密码"

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    if username == session['username'] and password == session['password']:
        session['username'] = username
        return redirect('/home')
    else:
        return "用户名或密码错误"

@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('password', None)
    return redirect('/')

@app.route('/home', methods=['GET'])
def home():
    if 'username' not in session:
        return redirect('/')
    return render_template('home.html')

@app.route('/chat', methods=['POST'])
def chat():
    input_text = request.form['input']
    user_id = request.remote_addr
    if user_id not in messages:
        messages[user_id] = []
    messages[user_id].append({"role": "user", "content": input_text})
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages[user_id]
    )
    message = response.choices[0].message["content"].lstrip()
    messages[user_id].append({"role": "assistant", "content": message})
    return jsonify({'response': message})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
