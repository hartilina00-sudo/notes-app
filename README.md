#  Notes Personnelles — Cloud App

Application web de gestion de notes personnelles développée et déployée sur **Microsoft Azure**.
  
**Module :** Cloud Computing — 2025/2026

 **Live Demo :** [lina-notes-app sur Azure](https://lina-notes-app-cge6f4ekbzgucycd.swedencentral-01.azurewebsites.net)

---

##  Fonctionnalités
-  Ajouter une note
-  Consulter les notes existantes
-  Modifier une note
-  Supprimer une note avec confirmation

---

##  Tech Stack

| Couche | Technologie |
|---|---|
| Frontend | React, JavaScript |
| Backend | Azure Functions (Serverless) |
| Stockage | Azure Blob Storage (notes.json) |
| Hébergement | Azure App Service |
| Monitoring | Azure Application Insights |

---

##  Infrastructure Azure

| Composant | Nom Azure | État |
|---|---|---|
| Backend | `note-api-lina` |  Opérationnel |
| Stockage | `linanotestorage2025` |  Opérationnel |
| Frontend | `lina-notes-app` |  En ligne |

Tous les services sont regroupés dans le **Resource Group** `RG_NoteApp` (région : Sweden Central).

---

## Architecture
```
[Utilisateur] → [Azure App Service (React)]
                        ↓
              [Azure Functions (API REST)]
                        ↓
              [Azure Blob Storage (notes.json)]
```

---

##  Sécurité
- Variables d'environnement pour les clés sensibles (`AZURE_STORAGE_CONNECTION_STRING`)
- Supervision en temps réel avec **Application Insights**
