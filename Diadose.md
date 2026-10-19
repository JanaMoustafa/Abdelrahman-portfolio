# 🩺 DiaDose — AI-Powered Diabetes Management Platform

### Graduation Project | Computer Science

---

## 📌 What is DiaDose?

DiaDose is an end-to-end AI-powered diabetes management platform that combines deep learning, medical guidelines, and a modern web interface to help diabetic patients manage their daily nutrition and insulin needs.

**Core Capabilities:**
1. 📸 **Food Recognition** — Upload a food photo → identifies 101 food types using EfficientNetV2-S
2. 🥗 **Nutrition Estimation** — Predicts calories, carbs, fat, and protein from food images
3. 💉 **Insulin Recommendation** — Personalised, safe insulin dose based on ADA medical guidelines
4. 📈 **Glucose Prediction** — 24-hour glucose forecasting using CNN-LSTM deep learning
5. 🍽️ **Nutrition Planning** — AI-generated 7-day personalised meal plans
6. 🤖 **AI Chatbot** — Context-aware nutrition & diabetes assistant powered by LLaMA 3.3 70B
7. 🔔 **Smart Notifications** — Risk alerts, goal tracking, and AI health tips
8. 💧 **Health Trackers** — Water intake, glucose, wellness, and food logging

---

## ✅ Project Status

| Phase | Description | Status |
|-------|-------------|--------|
| **Phase 1** | Dataset EDA & Preprocessing (Food-101 + Nutrition5K) | ✅ DONE |
| **Phase 2** | Food-101 Classifier (EfficientNetV2-S + ResNet-50) | ✅ DONE — 86.63% Top-1 / 97.43% Top-5 |
| **Phase 3** | Nutrition5K Regression (EfficientNetV2-S + MLP) | ✅ DONE — MAE: 60kcal / 5.2g carb / 4.2g fat / 5.3g prot |
| **Phase 4** | Unified Inference Pipeline | ✅ DONE |
| **Phase 5** | Insulin Dose Engine (ADA Guidelines) | ✅ DONE |
| **Phase 6** | Full Web Platform (FastAPI + Frontend) | ✅ DONE |
| **Phase 7** | Glucose Prediction (LSTM / CNN-LSTM / Transformer) | ✅ DONE — R² = 0.9859 |
| **Phase 8** | Nutrition Plan Engine + Risk Detector + Notifications | ✅ DONE |

---

## 🧠 Models Used

### Deep Learning — Food & Nutrition

| Model | Architecture | Task | Performance |
|-------|-------------|------|-------------|
| **EfficientNetV2-S** (classifier) | CNN | Food-101 classification (101 classes) | 86.63% Top-1 / 97.43% Top-5 |
| **ResNet-50** | CNN | Food-101 classification (comparison) | Comparison baseline |
| **EfficientNetV2-S** (regressor) | CNN | Nutrition estimation (kcal, carbs, fat, protein) | MAE: 60kcal / 5.2g carb |
| **MLP Nutrition** | Feed-forward NN | Nutrition estimation (frozen EfficientNet features) | Alternative model |

### Deep Learning — Glucose Prediction

| Model | Architecture | Task | Performance |
|-------|-------------|------|-------------|
| **LSTMModel** | Bidirectional LSTM + LayerNorm | Glucose forecasting | Comparison model |
| **CNNLSTMModel** ⭐ | CNN + LSTM + Squeeze-and-Excitation | Glucose forecasting (production) | **R² = 0.9859** |
| **TransformerModel** | Pre-norm Transformer encoder | Glucose forecasting | Comparison model |

### LLM — Via Groq Cloud API

| Model | Provider | Task |
|-------|----------|------|
| **LLaMA 3.3 70B Versatile** | Groq | AI chatbot + health tips |

### Rule-Based Engines

| Component | Task |
|-----------|------|
| **InsulinEngine** | Personalised insulin dose calculation (ADA guidelines) |
| **NutritionPlanEngine** | 7-day personalised meal plan generation |
| **RiskDetector** | Glucose risk detection & patient alerts |
| **RAG Advisor** | Retrieval-augmented nutrition guidance |

---

## 📡 API Endpoints (30 total)

### Authentication (`/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Create a new account |
| `POST` | `/auth/login` | Login → JWT token |
| `GET` | `/auth/me` | Get current user info |

### Patient Profile (`/profile`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/profile/setup` | Save patient profile (onboarding) |
| `GET` | `/profile/me` | Get patient profile |
| `PATCH` | `/profile/bg` | Quick blood glucose update |

### AI Predictions

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/predict` | Food image → detection + nutrition + insulin |
| `POST` | `/predict-by-name` | Food name → nutrition + insulin |
| `POST` | `/predict-glucose` | CNN-LSTM 24-hour glucose forecast |

### Food History (`/history`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/history` | Get food log entries |
| `POST` | `/history` | Save a food log entry |

### Recommendations (`/recommendations`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/recommendations` | Time-aware food suggestions |
| `GET` | `/recommendations/alternatives` | Lower-carb food alternatives |
| `GET` | `/recommendations/nutrition-plan` | Personalised 7-day nutrition plan |

### Health Trackers (`/trackers`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/trackers/water` | Log water intake |
| `GET` | `/trackers/water` | Get water logs |
| `GET` | `/trackers/today` | Today's tracker summary |
| `POST` | `/trackers/glucose` | Log glucose reading |
| `GET` | `/trackers/glucose` | Get glucose logs |
| `POST` | `/trackers/wellness` | Log wellness data |
| `GET` | `/trackers/glucose-analytics` | Glucose analytics & trends |

### AI Chatbot (`/chat`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/chat` | AI chatbot (Groq LLaMA / local KB fallback) |
| `GET` | `/chat/status` | Check chatbot availability |
| `GET` | `/chat/snapshot` | Patient context snapshot |

### Notifications (`/notifications`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/notifications` | Get patient notifications |
| `GET` | `/notifications/ai-tip` | Groq-powered AI health tip |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Serve login page |
| `GET` | `/onboarding` | Serve onboarding page |
| `GET` | `/dashboard` | Serve dashboard page |
| `GET` | `/health` | Liveness check |

---

## 🏗️ Project Structure

```
diadose/
│
├── .env                              # Environment variables (GROQ_API_KEY)
├── run.py                            # App launcher (auto-opens browser)
├── run.bat                           # Windows batch launcher
├── requirements.txt                  # Python dependencies
├── preflight_check.py                # Verify all models & dependencies
├── setup_datasets.py                 # Extract dataset zips
│
├── phase1_data/                      # Phase 1 — EDA & Preprocessing
│   ├── explore_food101.py            #   Food-101 dataset analysis
│   ├── explore_nutrition5k.py        #   Nutrition5K dataset analysis
│   └── plots/                        #   Generated EDA plots
│
├── phase2_food101/                   # Phase 2 — Food Classification
│   ├── train_efficientnet.py         #   EfficientNetV2-S training (86.63%)
│   ├── train_resnet.py               #   ResNet-50 training (comparison)
│   └── checkpoints/                  #   Saved model weights
│       └── efficientnet_best.pth
│
├── phase3_nutrition5k/               # Phase 3 — Nutrition Estimation
│   ├── train_nutrition_effnet.py     #   EfficientNetV2-S regressor
│   ├── train_nutrition_mlp.py        #   MLP with frozen backbone
│   └── checkpoints/
│       └── efficientnet_nutrition_best.pth
│
├── phase4_merge/                     # Phase 4 — Unified Pipeline
│   ├── __init__.py
│   └── pipeline.py                   #   Image/name → food + nutrition + insulin
│
├── phase5_insulin/                   # Phase 5 — Insulin Engine
│   ├── __init__.py
│   └── insulin_engine.py             #   ADA-based dose calculator (29KB)
│
├── phase6_app/                       # Phase 6 — Web Application
│   ├── app.py                        #   FastAPI main app (30 endpoints)
│   ├── constants.py                  #   App-wide constants
│   ├── auth/                         #   JWT authentication
│   │   └── router.py
│   ├── database/                     #   SQLite database + CRUD
│   │   ├── db.py
│   │   └── crud.py
│   ├── routers/                      #   API route handlers
│   │   ├── chat.py                   #     AI chatbot (44KB)
│   │   ├── notifications.py          #     Notifications + AI tips
│   │   ├── profile.py                #     Patient profile
│   │   ├── history.py                #     Food log history
│   │   ├── recommendations.py        #     Food recommendations
│   │   └── trackers.py               #     Water, glucose, wellness
│   └── frontend/                     #   Web UI
│       ├── index.html                #     Login / Register page
│       ├── onboarding.html           #     Patient onboarding
│       ├── dashboard.html            #     Main dashboard (373KB)
│       ├── assets/                   #     CSS, JS, fonts
│       └── images/                   #     UI images
│
├── phase7_glucose/                   # Phase 7 — Glucose Prediction
│   ├── models.py                     #   LSTM, CNN-LSTM, Transformer
│   ├── train.py                      #   Training script (3 models)
│   ├── preprocess.py                 #   CGM data preprocessing
│   ├── data_loader.py                #   Multi-source data fusion
│   ├── shap_explain.py               #   SHAP explainability
│   └── checkpoints/
│       ├── cnnlstm_best.pt           #     Production model (R²=0.9859)
│       ├── lstm_best.pt
│       └── transformer_best.pt
│
├── phase8_nutrition_engine/          # Phase 8 — Nutrition Planning
│   ├── nutrition_plan_engine.py      #   7-day meal plan + risk detection
│   ├── notification_service.py       #   Smart notification system
│   └── rag_advisor.py                #   RAG-based nutrition advisor
│
├── data/                             # Datasets
│   ├── food101/food-101/             #   101,000 images, 101 classes
│   └── nutrition5k/                  #   4,742 dishes with nutrition labels
│
├── all_visualizations/               # Training & analysis plots
│   ├── 01_phase1_nutrition5k_distributions.png
│   ├── 05_phase2_food101_training_curves.png
│   ├── 08_phase7_glucose_training_curves.png
│   ├── 09_phase7_glucose_actual_vs_predicted.png
│   ├── 11_phase7_glucose_shap_importance.png
│   └── ... (11 plots total)
│
├── tests/                            # Test Suite (12 test files)
│   ├── test_auth.py
│   ├── test_chat_intents.py
│   ├── test_database.py
│   ├── test_frontend_assets.py
│   ├── test_phase1_eda.py
│   ├── test_phase2_classifier.py
│   ├── test_phase3_nutrition.py
│   ├── test_phase4_pipeline.py
│   ├── test_phase5_insulin.py
│   ├── test_phase7_glucose_models.py
│   ├── test_phase8_nutrition_engine.py
│   └── verify_chat_e2e.py
│
├── show_db.py                        # Inspect SQLite database
└── user_data.py                      # Lookup user data by name/email
```

---

## 💉 Insulin Formula

```
Total Dose = Meal Bolus + Correction Bolus

Meal Bolus    = Carbs_g / ICR
Correction    = max(0, (BG_current − BG_target − 30) / ISF)

Defaults: ICR = 15, ISF = 40, Target BG = 110 mg/dL
Safety:   Max single dose = 20 units
```

> ⚠️ **For educational/research purposes only. Always consult your physician.**

---

## 🖥️ Environment

| Item | Value |
|------|-------|
| GPU | NVIDIA GeForce RTX 5060 Laptop (8.5 GB VRAM) |
| CUDA | 12.8 |
| PyTorch | 2.11.0+cu128 |
| Python | 3.12.10 |
| OS | Windows 11 |

---

## 🔑 External APIs

| API | Provider | Purpose | Key |
|-----|----------|---------|-----|
| Groq LLM | Groq Cloud | AI chatbot + health tips (LLaMA 3.3 70B) | `GROQ_API_KEY` in `.env` |

All other components (food detection, nutrition, insulin, glucose prediction) run **entirely locally** on your GPU.

---

## 📦 Installation

### 1. Install PyTorch (with CUDA for RTX 5060)

```powershell
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128
```

### 2. Install dependencies

```powershell
pip install -r requirements.txt
pip install groq python-dotenv
```

### 3. Setup datasets

```powershell
python setup_datasets.py
```

### 4. Set your Groq API key

Create a `.env` file in the project root:

```
GROQ_API_KEY=your_groq_api_key_here
```

### 5. Run preflight check

```powershell
python preflight_check.py
```

---

## 🚀 Running the App

```powershell
cd diadose
python run.py
```

The browser will open automatically at `http://127.0.0.1:8000` once the server is ready.

---

## 🧪 Running Tests

```powershell
python -m pytest tests/ -v
```

---

## 📊 Training Models

```powershell
# Phase 2 — Food classifier
python phase2_food101/train_efficientnet.py
python phase2_food101/train_resnet.py          # comparison

# Phase 3 — Nutrition estimator
python phase3_nutrition5k/train_nutrition_effnet.py
python phase3_nutrition5k/train_nutrition_mlp.py

# Phase 7 — Glucose prediction (trains LSTM, CNN-LSTM, Transformer)
python phase7_glucose/train.py
```

---

## 📊 Datasets

### Food-101
- **Source**: ETH Zurich
- **Size**: 101,000 images across 101 food classes
- **Split**: 750 train / 250 test per class
- **Location**: `data/food101/food-101/`

### Nutrition5K
- **Source**: Google Research
- **Size**: 4,742 dishes with nutrition labels (calories, carbs, fat, protein)
- **Location**: `data/nutrition5k/`

### CGM Glucose Data
- **Source**: Multi-source CGM (Continuous Glucose Monitor) data
- **Used by**: Phase 7 glucose prediction models
- **Preprocessing**: `phase7_glucose/preprocess.py`

---

## 📜 License

This project is a graduation project for academic purposes.

> ⚠️ DiaDose is an educational tool. It is **not** a certified medical device. Always consult your healthcare provider for medical decisions.
