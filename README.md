ng new inventario-frontend  --routing=true --style=scss --standalone=false  --skip-tests=true
    




ng g module core
ng g module layout
ng g module shared



ng g module auth --routing
ng g module features/inventory --routing

mkdir src/app/layout/auth-layout
mkdir src/app/layout/main-layout

mkdir src/app/auth/pages/login
mkdir src/app/auth/pages/register

mkdir src/app/features/inventory/pages/productos
mkdir src/app/features/inventory/pages/movimientos

mkdir src/app/core/services
mkdir src/app/core/guards
mkdir src/app/core/interceptors


src/app
│
├── core/               # servicios globales
│   ├── guards/
│   ├── interceptors/
│   ├── services/
│   └── core.module.ts
│
├── layout/             # layouts visuales
│   ├── auth-layout/
│   ├── main-layout/
│   └── layout.module.ts
│
├── auth/               # login / registro
│   ├── pages/
│   │   ├── login/
│   │   └── register/
│   ├── auth-routing.module.ts
│   └── auth.module.ts
│
├── features/
│   └── inventory/
│       ├── pages/
│       │   ├── productos/
│       │   └── movimientos/
│       ├── inventory-routing.module.ts
│       └── inventory.module.ts
│
├── shared/             # componentes reutilizables
│   ├── components/
│   ├── models/
│   └── shared.module.ts
│
├── app-routing.module.ts
└── app.module.ts


ng add @angular/material