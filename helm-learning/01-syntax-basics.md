# 01: พื้นฐาน Syntax และตัวแปร (Variables)

ใน Helm Template เราใช้สัญลักษณ์ `{{` และ `}}` เพื่อบอกให้ Helm รู้ว่าเป็นพื้นที่สำหรับเขียนคำสั่งหรือดึงข้อมูลมาใส่

## 1. การดึงข้อมูลจาก values.yaml

เราใช้จุด `.` เป็นตัวอ้างอิงถึง Root object และตามด้วยชื่อ Key ใน `values.yaml`

**ตัวอย่าง:**
ใน `values.yaml`:

```yaml
replicaCount: 2
```

ใน Template:

```yaml
replicas: {{ .Values.replicaCount }}
```

*ผลลัพธ์จะกลายเป็น `replicas: 2`*

---

## 2. การใช้ Function และ Integration

Function ใน Helm มีไว้สำหรับจัดการข้อความหรือข้อมูล

**ตัวอย่างที่พบบ่อย:**

- `quote`: ใส่เครื่องหมายคำพูดครอบข้อความ
- `default`: กำหนดค่า Default ถ้าไม่มีข้อมูลส่งมา
- `upper`: ทำเป็นตัวพิมพ์ใหญ่

**การใช้ Pipeline (`|`):**
เราสามารถส่งข้อมูลต่อกันเหมือนคำสั่ง Linux ได้

```yaml
name: {{ .Values.name | quote }}
# ถ้า name คือ bookstore ผลลัพธ์จะเป็น "bookstore"
```

---

## 3. Scope ของจุด (`.`)

- `.` (จุดตัวเดียว) หมายถึง Context ปัจจุบัน
- ในบางกรณี ถ้าเราเข้าไปอยู่ใน Loop หรือ Block เฉพาะ จุดจะเปลี่ยนเป้าหมายไป
- เราสามารถใช้ `$` เพื่อเรียกหา Global Scope (Root) เสมอ เช่น `$.Values.xxx`
