# Progetto Cloud - Piattaforma Collaborativa

Un'applicazione cloud completa che integra chat, gestione documenti collaborativi, file system e statistiche, deployata su Kubernetes con architettura a microservizi.

## 🏗️ Architettura

Il progetto utilizza un'architettura a microservizi orchestrata con Kubernetes, composta da:

- **Frontend**: Applicazione Svelte per l'interfaccia utente
- **Backend**: API REST sviluppata in Python con Flask
- **Database**: MongoDB per la persistenza dei dati
- **Chat**: Sistema di messaggistica basato su Tinode
- **Documenti Collaborativi**: Integrazione con Etherpad per l'editing condiviso
- **Orchestrazione**: Kubernetes per il deployment e la gestione dei servizi
- **Automazione**: Ansible per la configurazione e il deployment automatizzato

## 🚀 Tecnologie Utilizzate

### Frontend
- **Svelte/SvelteKit**: Framework reattivo per l'interfaccia utente
- **Chart.js**: Visualizzazione di grafici e statistiche
- **Vite**: Build tool e development server

### Backend
- **Python 3**: Linguaggio di programmazione principale
- **Flask**: Framework web per le API REST
- **Flask-CORS**: Gestione delle richieste cross-origin
- **Flask-Session**: Gestione delle sessioni utente
- **PyMongo**: Driver MongoDB per Python
- **bcrypt**: Hashing delle password

### Infrastruttura
- **Kubernetes**: Orchestrazione dei container
- **Docker**: Containerizzazione delle applicazioni
- **Minikube**: Ambiente di sviluppo Kubernetes locale
- **MongoDB**: Database NoSQL
- **Tinode**: Server di messaggistica
- **Etherpad**: Editor collaborativo
- **Nginx**: Reverse proxy e load balancer

### DevOps
- **Ansible**: Automazione della configurazione
- **Git**: Controllo di versione
- **Shell Scripts**: Automazione del setup

## 📋 Funzionalità Principali

### Gestione Utenti
- Registrazione e autenticazione utenti
- Sistema di ruoli e permessi
- Gestione profili utente
- Hashing sicuro delle password con bcrypt

### Sistema di Chat
- Messaggistica in tempo reale tramite Tinode
- Chat di gruppo e private
- Integrazione con il sistema di documenti

### Documenti Collaborativi
- Editor di testi condiviso tramite Etherpad
- Creazione e gestione di documenti
- Collaborazione in tempo reale
- Versionamento dei documenti

### File System
- Caricamento e gestione file
- Organizzazione gerarchica
- Controllo accessi ai file
- Supporto per diversi formati

### Statistiche e Analytics
- Dashboard con grafici interattivi
- Monitoraggio dell'utilizzo
- Metriche di performance
- Report personalizzabili

### Sistema di Promemoria
- Creazione e gestione note
- Notifiche e reminder
- Organizzazione per categorie

## 🛠️ Setup e Installazione

### Prerequisiti
- Ubuntu/Debian Linux
- Docker
- Kubernetes (kubectl)
- Minikube per sviluppo locale
- Node.js e npm
- Python 3.x

### Installazione Automatica

1. **Setup completo dell'ambiente:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Setup Docker (alternativo):**
   ```bash
   chmod +x sutupDocker.sh
   ./sutupDocker.sh
   ```

### Installazione Manuale

1. **Clona il repository:**
   ```bash
   git clone <repository-url>
   cd progettoCloud
   ```

2. **Installa le dipendenze Python:**
   ```bash
   cd "Server Python"
   pip install -r requirements.txt
   ```

3. **Installa le dipendenze Frontend:**
   ```bash
   cd "Svelte Frontend"
   npm install
   ```

4. **Avvia Minikube:**
   ```bash
   minikube start --memory=4096 --cpus=4 --disk-size=25g
   ```

5. **Deploy su Kubernetes:**
   ```bash
   kubectl apply -f kubernetes/
   ```

## 🚀 Deployment

### Deployment Automatico con GitHub Actions

Il progetto include un sistema di deployment automatico tramite GitHub Actions. Per utilizzarlo:

1. **Configura i GitHub Secrets** nel repository:
   - Vai su Settings → Secrets and variables → Actions
   - Aggiungi i secret necessari per il deployment

2. **Il deployment si attiva automaticamente** quando:
   - Viene fatto push sul branch principale
   - Viene creata una pull request
   - Le GitHub Actions si occuperanno automaticamente di tutto il processo

### Deployment Manuale

Per il deployment manuale locale con Minikube:

1. **Avvia Minikube:**
   ```bash
   minikube start
   ```

2. **Applica le configurazioni Kubernetes:**
   ```bash
   kubectl apply -f kubernetes/mongo.yml
   kubectl apply -f kubernetes/etherpad.yml
   kubectl apply -f kubernetes/tinode.yml
   kubectl apply -f kubernetes/server_python.yml
   kubectl apply -f kubernetes/nginx.yaml
   kubectl apply -f kubernetes/nginx-configmap.yaml
   ```

3. **Verifica lo stato dei pod:**
   ```bash
   kubectl get pods
   kubectl get services
   ```

## 📁 Struttura del Progetto

```
progettoCloud/
├── Server Python/          # Backend Flask
│   ├── main.py             # Applicazione principale
│   ├── user_management.py  # Gestione utenti
│   ├── file_system.py      # Sistema file
│   ├── stats.py            # Statistiche
│   ├── etherpad_function.py # Integrazione Etherpad
│   ├── chat_manager_with_etherpad.py # Gestione chat
│   └── requirements.txt    # Dipendenze Python
├── Svelte Frontend/        # Frontend Svelte
│   ├── src/               # Codice sorgente
│   ├── static/            # Asset statici
│   └── package.json       # Dipendenze Node.js
├── kubernetes/            # Configurazioni K8s
│   ├── mongo.yml         # Deployment MongoDB
│   ├── etherpad.yml      # Deployment Etherpad
│   ├── tinode.yml        # Deployment Tinode
│   ├── server_python.yml # Deployment Backend
│   └── nginx.yaml        # Deployment Nginx
├── ansible/              # Playbook Ansible
├── mongo/                # Configurazioni MongoDB
├── etherpad-lite/        # Configurazioni Etherpad
├── tinode/               # Configurazioni Tinode
├── setup.sh              # Script setup completo
└── sutupDocker.sh        # Script setup Docker
```

## 🔧 Configurazione

### Variabili d'Ambiente

Le principali configurazioni sono gestite tramite:
- **MongoDB**: Configurazione database
- **Etherpad**: URL e API key
- **Tinode**: Configurazione server chat
- **Flask**: Chiavi di sessione e configurazioni

### Porte e Servizi

- **Frontend**: Porta 3000 (sviluppo) / 80 (produzione)
- **Backend**: Porta 5000
- **MongoDB**: Porta 27017
- **Etherpad**: Porta 9001
- **Tinode**: Porta 6060

## 🧪 Testing

```bash
# Test del backend
cd "Server Python"
python test.py

# Test del frontend
cd "Svelte Frontend"
npm run check
```

## 📊 Monitoraggio

Il sistema include:
- Logging delle operazioni in `logs.txt`
- Metriche di utilizzo tramite il modulo statistiche
- Monitoraggio dei servizi Kubernetes

## 🤝 Contribuire

1. Fork del progetto
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📝 Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi `LICENSE` per maggiori informazioni.

## 👥 Team

Progetto sviluppato per il corso di Cloud Computing.

## 🆘 Supporto

Per supporto e domande:
- Apri un issue su GitHub
- Consulta la documentazione nei commenti del codice
- Verifica i log di sistema in `logs.txt`

---

**Nota**: Assicurati di aver configurato correttamente tutti i servizi prima del deployment. Il sistema richiede che MongoDB, Etherpad e Tinode siano operativi per funzionare correttamente.
