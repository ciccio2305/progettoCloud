#!/bin/bash

# Check current user and directory permissions
echo "Current user: $(whoami)"
echo "Current directory: $(pwd)"
echo "Directory permissions: $(ls -ld .)"

# Ensure we're in a writable directory
if [ ! -w . ]; then
    echo "Error: Current directory is not writable. Switching to /tmp"
    cd /tmp
fi

# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl -y
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

# Installazione di Docker
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

echo "Docker installato."

# Add current user to docker group
sudo usermod -aG docker $USER
echo "User $USER added to docker group"

sudo apt install conntrack -y
sudo conntrack -L

# Installazione di Minikube
echo "Downloading Minikube..."
echo "Downloading to: $(pwd)"
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
if [ -f "minikube-linux-amd64" ]; then
    sudo install -m 0755 minikube-linux-amd64 /usr/local/bin/minikube
    echo "Minikube installato."
    rm minikube-linux-amd64
else
    echo "Errore: Download di Minikube fallito"
    echo "Checking directory permissions:"
    ls -la
    exit 1
fi

# Installazione di kubectl
echo "Downloading kubectl..."
echo "Downloading to: $(pwd)"
KUBECTL_VERSION=$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)
curl -LO "https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl"
if [ -f "kubectl" ]; then
    chmod +x ./kubectl
    sudo mv ./kubectl /usr/local/bin/kubectl
    echo "kubectl installato."
else
    echo "Errore: Download di kubectl fallito"
    echo "Checking directory permissions:"
    ls -la
    exit 1
fi


echo "Installazione completata. Ricorda di disconnetterti e riconnetterti per applicare le modifiche al gruppo docker."
