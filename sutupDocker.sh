#!/bin/bash

# Aggiornamento del sistema
sudo apt-get update -y
sudo apt-get upgrade -y

# Installazione dei pacchetti necessari
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# Aggiunta della chiave GPG di Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Aggiunta del repository Docker
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# Installazione di Docker
sudo apt-get update -y
sudo apt-get install -y docker-ce

# Abilitare Docker per l'avvio automatico
sudo systemctl enable docker
sudo systemctl start docker

# Aggiunta dell'utente al gruppo docker (opzionale, evita di usare sudo con Docker)
sudo usermod -aG docker $USER

# Installazione di Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Verifica delle installazioni
docker --version
minikube version

echo "Installazione completata. Ricorda di disconnetterti e riconnetterti per applicare le modifiche al gruppo docker."
