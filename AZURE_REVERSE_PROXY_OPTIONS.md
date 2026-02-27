# Opzioni Azure per Sostituire Nginx - Subscription Student

## Configurazione Attuale Nginx

Il tuo nginx attualmente gestisce:
- **justsmartapp.com** → Python Server (porta 5000)
- **pad.justsmartapp.com** → Etherpad (porta 9001) - con WebSocket
- **chat.justsmartapp.com** → Tinode (porta 6060) - con WebSocket
- **MongoDB** → Proxy TCP stream (porta 27017)

---

## Opzioni Disponibili con Subscription Student

### 1. **Azure Front Door (Standard)** ⭐ CONSIGLIATO

**Vantaggi:**
- ✅ Supporto WebSocket nativo
- ✅ Routing basato su hostname (perfetto per i tuoi 3 domini)
- ✅ SSL/TLS gratuito con certificati gestiti
- ✅ WAF (Web Application Firewall) incluso
- ✅ CDN globale integrato
- ✅ Failover automatico
- ✅ Supporto per header personalizzati

**Limitazioni Subscription Student:**
- 💰 **Costo**: ~$0.025 per GB di trasferimento dati (primi 5 GB/mese potrebbero essere inclusi)
- ⚠️ **MongoDB TCP**: Front Door NON supporta proxy TCP per MongoDB (solo HTTP/HTTPS)
  - **Soluzione**: Mantenere nginx solo per MongoDB o usare Azure Private Link

**Configurazione Richiesta:**
- Backend pool con gli IP/endpoint dei tuoi servizi Kubernetes
- Routing rules basate su hostname
- Policy WAF opzionale

**Costo Stimato**: ~$5-15/mese per traffico medio

---

### 2. **Azure Application Gateway (v2 Standard)**

**Vantaggi:**
- ✅ Supporto WebSocket
- ✅ Routing basato su path e hostname
- ✅ SSL termination
- ✅ WAF opzionale (costo aggiuntivo)
- ✅ Load balancing L7
- ✅ Supporto per header personalizzati

**Limitazioni Subscription Student:**
- 💰 **Costo**: ~$0.025/ora (~$18/mese) + costi per dati
- ⚠️ **MongoDB TCP**: NON supporta proxy TCP stream
- ⚠️ Deve essere nella stessa VNet della VM

**Costo Stimato**: ~$20-30/mese

---

### 3. **Azure Load Balancer (Standard)**

**Vantaggi:**
- ✅ Supporto TCP/UDP (incluso MongoDB!)
- ✅ Load balancing L4
- ✅ IP pubblico statico

**Limitazioni:**
- ❌ **NO routing basato su hostname** (non può distinguere tra justsmartapp.com, pad.justsmartapp.com, chat.justsmartapp.com)
- ❌ **NO WebSocket** supporto nativo
- 💰 **Costo**: ~$0.025/ora (~$18/mese) + costi dati

**Non adatto** per il tuo caso d'uso perché non può fare routing basato su dominio.

---

### 4. **Azure Traffic Manager**

**Vantaggi:**
- ✅ Routing DNS-based
- ✅ Failover globale
- ✅ Gratuito per i primi 10 milioni di query/mese

**Limitazioni:**
- ❌ **NO reverse proxy** - è solo DNS routing
- ❌ **NO WebSocket** support
- ❌ **NO SSL termination**

**Non adatto** - è solo DNS, non può sostituire nginx.

---

## Raccomandazione: Azure Front Door Standard

### Perché Front Door è la scelta migliore:

1. **Routing Multi-Dominio**: Perfetto per i tuoi 3 domini
2. **WebSocket**: Supporto nativo per Etherpad e Tinode
3. **Costi Contenuti**: Con subscription student, i primi GB sono spesso inclusi
4. **Gestione SSL**: Certificati gestiti automaticamente
5. **Sicurezza**: WAF incluso

### Configurazione MongoDB:

**Opzione A**: Mantenere nginx solo per MongoDB
- Rimuovi tutto da nginx tranne il blocco `stream` per MongoDB
- Usa Front Door per HTTP/HTTPS

**Opzione B**: Azure Private Endpoint per MongoDB
- Connetti MongoDB tramite Private Endpoint
- Accedi solo dalla VM (non esporre pubblicamente)

**Opzione C**: Azure Load Balancer separato per MongoDB
- Usa Load Balancer Standard solo per porta 27017
- Front Door per tutto il resto

---

## Passi Successivi

1. **Verifica crediti Azure Student**: Controlla quanti crediti hai disponibili
2. **Crea Front Door Standard**: 
   - Backend pool con IP della tua VM Kubernetes
   - Routing rules per ogni dominio
   - Configura WebSocket per pad.justsmartapp.com e chat.justsmartapp.com
3. **Configura DNS**: Puntare i domini a Front Door
4. **Gestisci MongoDB**: Scegli una delle opzioni sopra

---

## Note Importanti

⚠️ **MongoDB TCP Proxy**: Nessun servizio Azure gestito supporta proxy TCP stream come nginx. Dovrai:
- Mantenere nginx solo per MongoDB, OPPURE
- Non esporre MongoDB pubblicamente e accedere solo internamente

💰 **Costi**: Con subscription student hai $100 di crediti. Front Door Standard costa ~$0.025/GB, quindi puoi gestire ~4000 GB con i crediti iniziali.

🔒 **Sicurezza**: Front Door include WAF che può bloccare attacchi comuni automaticamente.

---

## File di Configurazione da Creare

Posso creare:
1. Template Terraform/Bicep per Front Door
2. Script Azure CLI per deployment
3. Configurazione nginx ridotta (solo MongoDB)

Dimmi quale preferisci!

