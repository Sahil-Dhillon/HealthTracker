from flask import Flask, request, jsonify
import joblib  # Assuming you saved your ML model using joblib
import requests
app = Flask(__name__)

# Load your pre-trained model
model = joblib.load('Capstone.pkl')

@app.route('/try',methods=['GET'])
def tryy():
    return "Running"
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        age = data['age']
        sex = data['gender']
        spo2 = data['spo2']
        bps = data['bps']
        ecg = data['ecg']
        ecg_data = [int(i) for i in ecg.split(',')]
        gait = int(data['lfoot']) - int(data['rfoot'])
        gait = abs(gait)
        input_data = [int(age),int(sex),int(spo2),int(bps)]
        input_data = input_data+(ecg_data)
        input_data.append(gait)
        # return input_data
        prediction = model.predict_proba([input_data])
        return str(prediction.tolist()[0][1]*100)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)
