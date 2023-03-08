import openai
from flask import Flask, request, jsonify

# add your api_key
openai.api_key = ""
model_engine = "gpt-3.5-turbo"

app = Flask(__name__)

messages = []

@app.route('/chat', methods=['POST'])
def chat():
    input_text = request.form['input']
    messages.append({"role": "user", "content": input_text})
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=messages
    )
    message = response.choices[0].message["content"].lstrip()
    return jsonify({'response': message})


from flask import render_template

@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
