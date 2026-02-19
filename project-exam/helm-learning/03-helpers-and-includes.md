# 03: Helpers และการ Reuse Code

ใช้สำหรับจัดการส่วนของ YAML ที่ต้องเขียนซ้ำๆ หรือมี Logic การตั้งชื่อที่ซับซ้อน

## 1. Named Templates (define)

เรามักเขียนไว้ในไฟล์ `_helpers.tpl` เพื่อประกาศชื่อ Block ของ Code

**ตัวอย่าง:**

```yaml
{{- define "mychart.labels" -}}
app: bookstore
env: dev
{{- end -}}
```

---

## 2. การเรียกใช้ (include vs template)

ใน Helm แนะนำให้ใช้ `include` เพราะรองรับการใช้ Pipeline และการจัดการช่องว่างได้ดีกว่า

**ตัวอย่าง:**

```yaml
metadata:
  labels:
    {{- include "mychart.labels" . | nindent 4 }}
```

- `include "mychart.labels" .`: ไปดึง Block ชื่อนั้นมา โดยส่ง Context `.` ไปให้ด้วย
- `nindent 4`: ให้ย่อหน้าเข้าไป 4 ช่อง และขึ้นบรรทัดใหม่ให้โดยอัตโนมัติ

---

## 3. สรุปความแตกต่าง

| คำสั่ง | หน้าที่ |
|:---|:---|
| `define` | ประกาศ Block ชื่อที่เราต้องการ |
| `include` | นำ Block มาวางไว้ที่นี่ (แนะนำตัวนี้) |
| `template` | นำ Block มาวาง (แบบเก่า ไม่รับ Pipeline) |
