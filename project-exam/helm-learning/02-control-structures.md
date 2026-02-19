# 02: โครงสร้างควบคุม (Control Structures)

ใช้สำหรับสร้าง Logic ในการตัดสินใจว่าควรจะ Generate YAML ส่วนไหนออกมาบ้าง

## 1. IF / ELSE

ใช้สำหรับเช็คเงื่อนไข ถ้าเป็นจริงถึงจะแสดงผล

**ตัวอย่าง:**

```yaml
{{- if .Values.ingress.enabled }}
apiVersion: networking.k8s.io/v1
kind: Ingress
...
{{- end }}
```

> [!TIP]
> เครื่องหมาย `-` (Dash) เช่น `{{-` ใช้สำหรับ "ลบช่องว่าง (Whitespace)" ที่จะเกิดขึ้นในไฟล์ YAML เพื่อให้ Code สะอาด

---

## 2. WITH

ใช้สำหรับย้าย "จุด" (`.`) เข้าไปอยู่ใน Object เฉพาะ เพื่อให้เขียน Code สั้นลง

**ตัวอย่าง:**

```yaml
# แบบปกติ
name: {{ .Values.ingress.annotations.name }}

# แบบใช้ WITH
{{- with .Values.ingress.annotations }}
name: {{ .name }}  # จุดตอนนี้จะหมายถึง .Values.ingress.annotations แล้ว
{{- end }}
```

---

## 3. RANGE (Loop)

ใช้สำหรับวนลูปข้อมูลที่เป็น List หรือ Map

**ตัวอย่าง:**
ใน `values.yaml`:

```yaml
env:
  - name: DB_HOST
    value: db
  - name: DB_PORT
    value: "5432"
```

ใน Template:

```yaml
env:
{{- range .Values.env }}
  - name: {{ .name }}
    value: {{ .value | quote }}
{{- end }}
```

*ผลลัพธ์จะ Generate รายการ env ออกมาตามจำนวนใน List*
