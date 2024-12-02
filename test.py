import requests
import threading
import time

url = 'http://localhost:5000/api/get_all_sections'

def make_requests():
    while True:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                print(response.json())
            else:
                print(f"Failed to retrieve data: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
        
        time.sleep(0.01)  # Aspetta prima di fare la prossima richiesta

# Numero di thread che vuoi eseguire contemporaneamente
num_threads = 1000

threads = []
for _ in range(num_threads):
    thread = threading.Thread(target=make_requests)
    thread.start()
    threads.append(thread)

# Opzionale: puoi unirli per far sì che il programma aspetti la fine di tutti i thread
for thread in threads:
    thread.join()
