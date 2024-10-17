#!/bin/bash

#crea un file con scritto ciao
echo "Sistema aggiornato.1" > ciao.txt

# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
echo "Sistema aggiornato." > ciao.txt
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "Sistema aggiornato 2 " > ciao.txt

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

# Installazione di Docker
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "Docker installato." > ciao.txt


sudo apt install conntrack
sudo conntrack -L

# Abilitare Docker per l'avvio automatico
sudo systemctl enable docker
sudo systemctl start docker


echo "Docker abilitato per l'avvio automatico." > ciao.txt


# Aggiunta dell'utente al gruppo docker (opzionale, evita di usare sudo con Docker)
sudo usermod -aG docker $USER

# Installazione di Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

echo "Minikube installato."> ciao.txt

# Verifica delle installazioni
docker --version
minikube version

echo "Installazione completata. Ricorda di disconnetterti e riconnetterti per applicare le modifiche al gruppo docker."
