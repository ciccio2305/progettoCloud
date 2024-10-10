#!/bin/bash

# Update package list and install Golang.
# Go will be needed later.

sudo apt-get update 
sudo apt install golang-go

# Download and install kubectl.
# It fetches the latest stable Kubernetes version.

KUBECTL_VERSION=$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)
curl -LO "https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl"
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl

# Download and install Docker.

sudo apt-get install -y docker.io
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
chmod +x minikube
sudo mv minikube /usr/local/bin/

# Download and install "conntrack" for Kubernetes networking.
# It is used for tracking network connections.
# It helps manage and inspect network connections and for ensuring proper network communication and routing within Kubernetes clusters.
    
sudo apt install conntrack
sudo conntrack -L

# Download and install "crictl".
# It is used to interact with Container Runtime Interface (CRI) compliant container runtimes such as Docker.
# It allows to manage containers and inspect container runtime objects directly.

wget https://github.com/kubernetes-sigs/cri-tools/releases/download/v1.23.0/crictl-v1.23.0-linux-amd64.tar.gz
tar -zxvf crictl-v1.23.0-linux-amd64.tar.gz
sudo cp crictl /usr/local/bin/

# Download and install "cri-dockerd".
# It is a bridge used in Kubernetes to integrate Docker as a Container Runtime Interface (CRI) compliant runtime.
# It translates Kubernetes container runtime calls into Docker's native API calls.

git clone https://github.com/Mirantis/cri-dockerd.git
cd cri-dockerd
mkdir bin
go get && go build -o bin/cri-dockerd
sudo cp bin/cri-dockerd /usr/local/bin/
sudo cp packaging/systemd/* /etc/systemd/system/
sudo sed -i 's,/usr/bin/cri-dockerd,/usr/local/bin/cri-dockerd,' /etc/systemd/system/cri-docker.service
sudo systemctl daemon-reload
sudo systemctl enable cri-docker.service
sudo systemctl enable --now cri-docker.socket

# Download and install "curl" and download "containernetworking-plugins".
# "containernetworking-plugins" are plugins essential for managing container networking in Kubernetes.

sudo apt install curl
curl -LO https://storage.googleapis.com/minikube/releases/latest/containernetworking-plugins
chmod +x containernetworking-plugins
sudo mv containernetworking-plugins /usr/local/bin/

# Download and install "CNI plugins".
# Container Networking Interface plugins are essential components for managing networking in Kubernetes and Minikube environments.

CNI_VERSION="v1.1.1"
curl -LO "https://github.com/containernetworking/plugins/releases/download/$CNI_VERSION/cni-plugins-linux-amd64-$CNI_VERSION.tgz"
sudo mkdir -p /opt/cni/bin
sudo tar -C /opt/cni/bin -xzvf cni-plugins-linux-amd64-$CNI_VERSION.tgz

# Add current user to the docker group and restart Docker service.

sudo usermod -aG docker $USER
sudo systemctl restart docker