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

Attualmente il port-forward va avviato a mano (o con un servizio che parte al boot). Comando da eseguire **sulla VM** (via SSH):

```bash
sudo KUBECONFIG=/home/ciccio_conti0909/.kube/config nohup kubectl port-forward --address=0.0.0.0 svc/nginx-service 80:80 >> /tmp/nginx-pf.log 2>&1 &
```

Per renderlo permanente si può creare un servizio **systemd** sulla VM che esegue questo comando al boot.

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
