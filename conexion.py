import mysql.connector

config = {
  'user': 'root',
  'password': 'admin01',
  'host': 'localhost',
  'port': 3306,
  'database': 'vuelos_jjr',
  'raise_on_warnings': True
}

try:
    conn = mysql.connector.connect(**config)
    print("¡Conexión exitosa a la base de datos!")
except mysql.connector.Error as err:
    print(f"Error: {err}")

try:
    query = conn.cursor()
    query.execute("SELECT * FROM user")
    rows = query.fetchall()

    for row in rows:
        print(row)

except mysql.connector.Error as err:
    print(f"Error al ejecutar la consulta: {err}")


query.close()
conn.close()
