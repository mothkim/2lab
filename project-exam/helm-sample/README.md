# Bookstore Chart

คู่มือการใช้งาน Helm Chart สำหรับโปรเจกต์ Bookstore (Educational Purpose)

## 🐳 รายละเอียดเบื้องต้น

Chart นี้ถูกออกแบบมาเพื่อใช้ในการสอนเรื่อง Kubernetes Deployment ผ่านการทำ Parameterization โดยแยกส่วนประกอบหลักออกเป็น:

- **Backend**: API server (Node.js)
- **Frontend**: Web interface (Nginx)
- **Database**: PostgreSQL (Alpine)

---

## 🚀 วิธีการใช้งาน (Quick Start)

### 1. ติดตั้ง Chart

รันคำสั่งนี้เพื่อติดตั้งโปรเจกต์ลงใน Namespace ชื่อ `bookstore`:

```bash
helm install bookstore ./helm/bookstore-chart -n bookstore --create-namespace 
```

### 2. อัปเดตการแก้ไข

หากมีการแก้ไขไฟล์ใน `values.yaml` หรือไฟล์ใน `templates/`:

```bash
helm upgrade bookstore ./ -n bookstore
```

### 3. ลบโปรเจกต์

```bash
helm uninstall bookstore -n bookstore
```

---

## 🛠 คำสั่งสำหรับตรวจสอบ (Debugging)

- **รัน Lint เพื่อตรวจสอบ Syntax:**

  ```bash
  helm lint ./
  ```

- **จำลองการทำงาน (Dry Run) เพื่อดู YAML ที่จะถูก Generate:**

  ```bash
  helm template bookstore ./ -n bookstore --dry-run
  ```

- **ตรวจสอบสถานะ Release:**

  ```bash
  helm list -n bookstore
  ```

---

## 📁 โครงสร้างของไฟล์ที่น่าสนใจ

- `values.yaml`: ศูนย์กลางการกำหนดค่า (เช่น Image Tag, Resource Limits)
- `Chart.yaml`: ข้อมูลพื้นฐานของ Chart ชุดนี้
- `templates/`: โฟลเดอร์เก็บแม่แบบ YAML ที่ฝัง logic ของ Helm เอาไว้
- `templates/_helpers.tpl`: ไฟล์สำหรับจัดการ Named Templates เพื่อลดความซ้ำซ้อนของ Code

---
> [!NOTE]
> อย่าลืมตรวจสอบว่า Image ชื่อ `project-exam-backend:latest` และ `project-exam-frontend:latest` ถูกโหลดเข้าไปใน Cluster (เช่น Kind) เรียบร้อยแล้วก่อนทำการติดตั้ง

---
helm install nginx-sample ./helm-sample -n sample-ns
|
└── 📦 Namespace: sample-ns
    |
    ├── 🛡️ Helm Release: nginx-sample (Logical Manager)
    │   └── 📑 Metadata stored in Secret: sh.helm.release.v1.nginx-sample.v1
    │
    └── 🏗️ Kubernetes Resources (Mapped with Labels)
        │
        ├── 🌐 Ingress: sample-ingress
        │   └── 🏷️ labels: [instance: nginx-sample]
        │
        ├── 🔌 Service: sample-frontend
        │   ├── 🏷️ labels: [instance: nginx-sample]
        │   └── 🎯 selector: [instance: nginx-sample] (ใช้ชี้ไปที่ Pod)
        │
        ├── 📈 HPA: sample-frontend-hpa
        │   ├── 🏷️ labels: [instance: nginx-sample]
        │   └── 🎯 target: Deployment/sample-frontend
        │
        └── 🏗️ Deployment: sample-frontend
            ├── 🏷️ labels: [instance: nginx-sample]  (ที่ตัว Deployment เอง)
            ├── 🎯 selector: [instance: nginx-sample] (ใช้คุม ReplicaSet)
            └── 📦 Pod Template
                ├── 🏷️ labels: [instance: nginx-sample] (ติดไปกับทุก Pod ที่เกิดใหม่)
                └── 🚀 Container: nginx
                    └── 🖼️ Image: nginx:latest