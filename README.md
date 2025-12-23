Aqui está o `README.md` completo, formatado profissionalmente e adaptado para a sua PoC (Prova de Conceito) do **Vitta Notifications**, considerando a arquitetura MVVM e o fluxo "Bare Workflow" que configuramos.

```markdown
# Vitta Notifications PoC 🔔

Micro aplicação desenvolvida em **React Native (Expo Bare Workflow)** com **TypeScript** para validar a arquitetura e a usabilidade das notificações nativas (iOS e Android) do ecossistema Vitta.

O objetivo é simular os fluxos de agendamento e confirmação entre **Nutricionista** e **Paciente** de forma isolada, garantindo que as regras de negócio e a infraestrutura de *Deep Linking* funcionem antes da integração com o superapp.

---

## 📱 Funcionalidades

### Visão Nutricionista
- [x] Simulação de recebimento de "Solicitação de Consulta".
- [x] Ação de toque na notificação para abrir a agenda.

### Visão Paciente
- [x] Feedback de status de consulta: **Aceita** (✅), **Recusada** (❌) ou **Cancelada** (⚠️).
- [x] Deeplink para detalhes do agendamento.

---

## 🛠 Tecnologias & Arquitetura

O projeto segue estritamente a **Clean Architecture** e o padrão **MVVM** definido para o Vitta:

* **React Native** (Expo SDK 50+ / CNG)
* **TypeScript**
* **Expo Router** (Navegação baseada em arquivos)
* **Expo Notifications** (Gerenciamento Local/Push)
* **Injeção de Dependência** (Container Manual)

### Estrutura de Pastas
```bash
src/
├── app/                  # Rotas e Layouts (Expo Router)
├── di/                   # Injeção de Dependência (Container Singleton)
├── infra/                # Implementações externas (Expo Notification Service)
├── model/                # Entidades e Interfaces de Domínio
├── usecase/              # Regras de Negócio (Lógica Pura)
├── view/                 # Camada de Apresentação
│   ├── components/       # Design System Vitta (Botões, Cards)
│   ├── pages/            # Telas de Validação
│   └── themes/           # Tokens de Design (Cores, Fontes)
└── viewmodel/            # Gerenciamento de Estado (Logic Hooks)

```

---

## 🚀 Configuração do Ambiente

Certifique-se de ter as seguintes ferramentas instaladas:

1. **Node.js** (LTS)
2. **Git**
3. **CocoaPods** (apenas para macOS/iOS)
4. **Xcode** (para iOS) ou **Android Studio** (para Android)

### 1. Instalação

Clone o repositório e instale as dependências:

```bash
npm install
# ou
yarn install

```

### 2. Sincronização Nativa (Prebuild)

Como este é um projeto "Bare Workflow" que utiliza código nativo, você deve gerar as pastas `android` e `ios` sempre que alterar configurações no `app.json` (como ícones, nome ou *schemes*):

```bash
npx expo prebuild

```

---

## 🍎 Como Rodar no iOS

1. Garanta que o **Xcode** está instalado e configurado.
2. Se você usa uma conta de desenvolvedor **gratuita**, abra o projeto no Xcode (`ios/vitta.xcworkspace`), vá em **Signing & Capabilities** e remova a capacidade **"Push Notifications"** (pois a Apple bloqueia em contas free; usaremos notificações locais).
3. Execute o comando para compilar e rodar no simulador ou dispositivo:

```bash
npx expo run:ios

```

> **Nota:** Se estiver rodando em um iPhone físico, certifique-se de que ele e o Mac estão na mesma rede Wi-Fi.

---

## 🤖 Como Rodar no Android

1. Abra o **Android Studio** e inicie um emulador (ou conecte seu dispositivo USB com depuração ativada).
2. Execute o comando para compilar e instalar:

```bash
npx expo run:android

```

---

## 🔗 Deep Linking

O aplicativo está configurado com o esquema personalizado para testes de abertura via URL.

**Scheme configurado:** `vitta://` (ou `vittanotifications://`)

Para testar se o App abre via link no terminal:

**iOS:**

```bash
npx uri-scheme open vitta:// --ios

```

**Android:**

```bash
npx uri-scheme open vitta:// --android

```

---

## 🐛 Solução de Problemas Comuns

**1. Erro "No script URL provided" (Tela Branca no iPhone Físico)**

* Certifique-se de que o terminal com o Metro Bundler (`npx expo start`) está rodando.
* Garanta que o iPhone e o PC estão na mesma rede Wi-Fi.
* Se persistir, force a reinstalação: `npx expo run:ios --device`.

**2. Erro de Provisioning Profile no Xcode**

* Se não tiver conta paga da Apple, remova a *Capability* "Push Notifications" no Xcode. O app usará agendamento local, que funciona sem certificado pago.

**3. Mudanças no `app.json` não refletem**

* Sempre rode `npx expo prebuild` após alterar configurações nativas.
