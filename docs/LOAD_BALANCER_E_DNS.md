# Load Balancer Google Cloud e DNS per justsmartapp.com

## Cosa è stato configurato

- **Application Load Balancer (HTTP)** globale su GCP
- **IP pubblico del Load Balancer:** `34.110.231.81` (statico, globale)
- Traffico: Internet → LB → tua VM (porta 80) → nginx → app

Non serve più modificare il file `hosts` sul PC: basta puntare il dominio al LB.

---

## Configurazione DNS (presso il registrar del dominio)

Nel pannello dove gestisci il DNS di **justsmartapp.com** (Registro.it, Cloudflare, GoDaddy, ecc.) aggiungi questi record:

| Tipo | Nome / Host | Valore / Punta a        | TTL (opzionale) |
|------|-------------|-------------------------|------------------|
| **A**  | `@`         | `34.110.231.81`         | 300 o 3600       |
| **A**  | `www`       | `34.110.231.81`         | 300 o 3600       |
| **A**  | `pad`       | `34.110.231.81`         | 300 o 3600       |
| **A**  | `chat`      | `34.110.231.81`         | 300 o 3600       |

- **justsmartapp.com** → record con nome `@` (o “root”) che punta a `34.110.231.81`
- **www.justsmartapp.com** → record `www` → `34.110.231.81`
- **pad.justsmartapp.com** → record `pad` → `34.110.231.81`
- **chat.justsmartapp.com** → record `chat` → `34.110.231.81`

Dopo la propagazione DNS (da qualche minuto a qualche ora) potrai usare:

- http://justsmartapp.com  
- http://www.justsmartapp.com  
- http://pad.justsmartapp.com  
- http://chat.justsmartapp.com  

senza toccare il file hosts.

---

## Verifica Load Balancer e backend

- Console GCP: **Network services → Load balancing** → apri il load balancer e controlla che il backend sia **Healthy**.
- Se il backend resta **Unhealthy**: sulla VM deve essere in esecuzione il port-forward sulla porta 80 (vedi sotto).

---

## Port-forward sulla VM (porta 80)

Il traffico del LB arriva sulla VM sulla **porta 80**. Serve un processo che ascolti su 80 e inoltri a nginx (es. `kubectl port-forward`).

### Opzione 1: Servizio systemd (consigliato, permanente)

Nella cartella `vm/` del progetto trovi `nginx-portforward.service`. Sulla VM:

```bash
# Copia il file (da locale, dopo averlo portato sulla VM)
sudo cp nginx-portforward.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable nginx-portforward
sudo systemctl start nginx-portforward
sudo systemctl status nginx-portforward
```

Dopo un riavvio della VM il port-forward riparte da solo.

### Opzione 2: Avvio manuale (temporaneo)

La porta 80 è privilegiata: il port-forward va avviato **con sudo** sulla VM:

```bash
sudo env KUBECONFIG=/home/ciccio_conti0909/.kube/config nohup kubectl port-forward --address=0.0.0.0 svc/nginx-service 80:80 >> /tmp/nginx-pf.log 2>&1 &
```

Se il servizio systemd non legge la kubeconfig (errore di permessi), rendila leggibile da root:  
`chmod 644 /home/ciccio_conti0909/.kube/config`

---

## Riepilogo risorse GCP create

| Risorsa            | Nome                  |
|--------------------|------------------------|
| IP statico globale | `lb-justsmart-ip`     |
| Health check       | `http-basic-check`    |
| Instance group    | `justsmart-ig`        |
| Backend service    | `justsmart-backend`   |
| URL map            | `justsmart-map`       |
| Target HTTP proxy  | `justsmart-http-proxy`|
| Forwarding rule   | `justsmart-http-rule` |
| Firewall          | `fw-allow-health-check`|

IP Load Balancer: **34.110.231.81**
