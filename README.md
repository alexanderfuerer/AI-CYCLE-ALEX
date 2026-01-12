# FIVE LI Content Flow

Visual Node-basierte Web-App zur Erstellung von LinkedIn-Posts mit mitarbeiterspezifischer Tonalität basierend auf dem PPP-System (Prime, Prompt, Polish).

## Features

- **Mitarbeiter-Verwaltung**: Mitarbeiter anlegen mit individuellen Stilprofilen
- **PPP-Stilanalyse**: Automatische Analyse von Mustertexten mit Claude AI
- **Visual Node Editor**: Drag & Drop Workflow-Editor mit React Flow
- **Post-Generierung**: LinkedIn-Posts im individuellen Stil des Mitarbeiters
- **Google Docs Integration**: Automatische Erstellung von Google Docs
- **E-Mail Benachrichtigung**: Mitarbeiter werden automatisch informiert

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Node Editor**: React Flow (@xyflow/react)
- **Backend**: Firebase (Firestore, Storage)
- **AI**: Anthropic Claude Sonnet API
- **APIs**: Google Drive/Docs API
- **E-Mail**: SendGrid oder Firebase Extension

## Installation

```bash
npm install
```

## Entwicklung

```bash
npm run dev
```

## Environment Variables

Erstelle eine `.env.local` Datei:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Projektstruktur

```
/src
  /components
    /ui (Buttons, Inputs, Cards, Modal)
  /nodes
    ContentInputNode.tsx
    EmployeeSelectNode.tsx
    GeneratorNode.tsx
    ReviewNode.tsx
    GoogleDocsNode.tsx
    NotificationNode.tsx
  /pages
    WorkflowPage.tsx
    EmployeesPage.tsx
    EmployeeSetupPage.tsx
  /services
    firebase.ts
    firestoreService.ts
    claudeService.ts
    googleService.ts
    notificationService.ts
  /hooks
    useEmployees.ts
    useWorkflow.ts
    useStyleProfile.ts
  /types
    index.ts
```

## Lizenz

Privat - FIVE Agency
