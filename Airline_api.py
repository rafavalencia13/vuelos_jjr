import pyodbc
from flask import Flask, jsonify, request
import json
from flask_cors import CORS
import locale
from datetime import datetime

locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')
"""
DECLARACIÓN DE LA CONEXIÓN A LA BASE DE DATOS

"""

server = 'DESKTOP-BCSFQFN'
database = 'vuelos_jjr'
username = 'sa'
password = 'admin01'

Con = f'DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}'

"""
CONSULTAS A DB AIRLINE

"""

def Buscar_Usuario(email,pswd):
    try:
        conn = pyodbc.connect(Con)

        cursor = conn.cursor()

        cursor.execute("SELECT user_id,name,email,address,password FROM [dbo].[user] WHERE email=? and password = ?", email,pswd)
        rows = cursor.fetchall()
        
        if not rows:  # Verifica si la lista de filas está vacía
            return None
        else:
            datos = []
            for row in rows:
                user_id,name,email,address,password = row
                
            
            cursor.close()
            conn.close()
            return user_id,name,email,address,password
        
    except pyodbc.Error as e:
        print("Error de conexión: ", e)

def Crear_Usuario(name,email,address,pswd):
    bandera = 0
    try:
        conn = pyodbc.connect(Con)
        cursor = conn.cursor()

        cursor.execute("INSERT INTO [dbo].[user] (name, email, address, password) VALUES (?,?,?,?);",name,email,address,pswd)
        conn.commit()  # Es importante hacer commit después de una operación que modifica la base de datos

        cursor.close()
        conn.close()
        bandera = 1
    except pyodbc.Error as e:
        print("Error de conexión:", e)
    return bandera

def Buscar_Destinos():
    try:
        conn = pyodbc.connect(Con)

        cursor = conn.cursor()

        cursor.execute("SELECT destiny_id, country, city, airport FROM [dbo].[destiny]")
        rows = cursor.fetchall()
        
        if not rows:
            return None
        else:
            datos = []
            for row in rows:
                destiny_id, country, city, airport = row
                datos.append({
                    "destiny_id": destiny_id,
                    "country": country,
                    "city": city,
                    "airport": airport
                })

            cursor.close()
            conn.close()
            
            # Convertir datos a formato JSON
            json_data = json.dumps(datos)
            return json_data
        
    except pyodbc.Error as e:
        print("Error de conexión: ", e)

def Buscar_Origenes():
    try:
        conn = pyodbc.connect(Con)

        cursor = conn.cursor()

        cursor.execute("SELECT origin_id, country, city, airport FROM origin")
        rows = cursor.fetchall()
        
        if not rows:
            return None
        else:
            datos = []
            for row in rows:
                origin_id, country, city, airport = row
                datos.append({
                    "origin_id": origin_id,
                    "country": country,
                    "city": city,
                    "airport": airport
                })

            cursor.close()
            conn.close()
            
            json_data = json.dumps(datos)
            return json_data
        
    except pyodbc.Error as e:
        print("Error de conexión: ", e)

def Consultar_vuelos(origen_id, destino_id, date):
    try:
        conn = pyodbc.connect(Con)

        cursor = conn.cursor()

        cursor.execute("SELECT flight.flight_id, flight.destiny_id, flight.origin_id, flight.date, flight.check_in, flight.check_out, flight.airplane_id, flight.flight_state FROM flight INNER JOIN origin ON flight.origin_id = origin.origin_id INNER JOIN destiny ON flight.destiny_id = destiny.destiny_id WHERE flight.origin_id = ? AND flight.destiny_id = ? AND flight.date = ?", origen_id, destino_id, date)
        rows = cursor.fetchall()
        if not rows:
            return None
        else:
            datos = []
            for row in rows:
                flight_id, destiny_id, origin_id, date, check_in, check_out, airplane_id, flight_state = row
                # Convertir date a objeto datetime
                date_obj = datetime.strptime(date, "%Y-%m-%d")
                # Formatear la fecha con el día de la semana en español
                date_str = date_obj.strftime("%A %d de %B de %Y").encode('latin-1').decode('utf-8')
                # Extraer la hora de check_in y check_out
                check_in_time = check_in.strftime("%H:%M")
                check_out_time = check_out.strftime("%H:%M")
                # Agregar datos al JSON
                datos.append({
                    "flight_id": flight_id,
                    "destiny_id": destiny_id,
                    "origin_id": origin_id,
                    "date": date_str,
                    "check_in": check_in_time,
                    "check_out": check_out_time,
                    "airplane_id": airplane_id,
                    "flight_state": flight_state
                })

            cursor.close()
            conn.close()
            
            return datos
            
    except pyodbc.Error as e:
        print("Error de conexión: ", e)

def Consultar_Asientos(airplane_id):
    try:
        conn = pyodbc.connect(Con)

        cursor = conn.cursor()

        cursor.execute("SELECT seat_id, name, flight_class_id, airplane_id, seat_state FROM seat WHERE airplane_id = ?",airplane_id)
        rows = cursor.fetchall()
        if not rows:
            return None
        else:
            datos = []
            for row in rows:
                seat_id, name, flight_class_id, airplane_id, seat_state = row
                datos.append({
                    "seat_id": seat_id,
                    "name": name,
                    "flight_class_id": flight_class_id,
                    "airplane_id": airplane_id,
                    "seat_state": seat_state,
                })

            cursor.close()
            conn.close()
            
            json_data = json.dumps(datos)
            return json_data
        
    except pyodbc.Error as e:
        print("Error de conexión: ", e)

def Consultar_Clases():
    try:
        conn = pyodbc.connect(Con)

        cursor = conn.cursor()

        cursor.execute("SELECT flight_class_id, name, price FROM flight_class")
        rows = cursor.fetchall()
        if not rows:
            return None
        else:
            datos = []
            for row in rows:
                flight_class_id, name_unicode, price_decimal = row
                # Convertir el precio de Decimal a float
                price = float(price_decimal)
                # Convertir la cadena a texto legible
                name = str(name_unicode)
                datos.append({
                    "flight_class_id": flight_class_id,
                    "name": name,
                    "price": price,
                })

            cursor.close()
            conn.close()
            
            return json.dumps(datos)
        
    except pyodbc.Error as e:
        print("Error de conexión: ", e)

def Status_Seat(seat_id):
    bandera = 0
    try:
        conn = pyodbc.connect(Con)
        cursor = conn.cursor()

        cursor.execute("UPDATE seat SET seat_state = 'Ocupado' WHERE seat_id = ?;",seat_id)
        conn.commit()

        cursor.close()
        conn.close()
        bandera = 1
    except pyodbc.Error as e:
        print("Error de conexión:", e)
    return bandera

def Asignar_vuelo(user_id,flight_id,seat_id):
    bandera = 0
    try:
        conn = pyodbc.connect(Con)
        cursor = conn.cursor()

        cursor.execute("INSERT INTO user_flight (user_id, flight_id, seat_id) VALUES (?, ?, ?);",user_id,flight_id,seat_id)
        conn.commit()

        cursor.close()
        conn.close()
        flag = Status_Seat(seat_id)
        if flag == 1:
            bandera = 1
        else:
            bandera = 0
    except pyodbc.Error as e:
        print("Error de conexión:", e)
    return bandera


def cancelar_vuelo(user_flight_id):
    bandera = 0
    try:
        conn = pyodbc.connect(Con)
        cursor = conn.cursor()

        cursor.execute("DELETE FROM [dbo].[user_flight] WHERE user_flight_id = ?;",user_flight_id)
        conn.commit()  # Es importante hacer commit después de una operación que modifica la base de datos

        cursor.close()
        conn.close()
        bandera = 1
    except pyodbc.Error as e:
        print("Error de conexión:", e)
    return bandera

def Consulta_macabrona(user_id):
    try:
        conn = pyodbc.connect(Con)

        cursor = conn.cursor()

        cursor.execute("SELECT uf.user_flight_id, uf.user_id, uf.flight_id, uf.seat_id, f.flight_id AS flight_id_2, f.destiny_id, f.origin_id, f.date, f.check_in, f.check_out, f.airplane_id, f.flight_state, s.seat_id AS seat_id_2, s.flight_class_id, s.airplane_id AS airplane_id_2, s.seat_state, s.name AS seat_name, [user].name AS user_name, o.city AS origin_city, d.city AS destiny_city FROM user_flight uf JOIN flight f ON uf.flight_id = f.flight_id JOIN seat s ON uf.seat_id = s.seat_id JOIN [user] ON uf.user_id = [user].user_id JOIN origin o ON f.origin_id = o.origin_id JOIN destiny d ON f.destiny_id = d.destiny_id WHERE uf.user_id = ?", user_id)
        rows = cursor.fetchall()
        if not rows:
            return None
        else:
            datos = []
            for row in rows:
                # Convertir los objetos datetime a cadenas de texto en formato ISO 8601
                formatted_row = list(row)
                for i in range(len(formatted_row)):
                    if isinstance(formatted_row[i], datetime):
                        if i == 8 or i == 9:  # Check_in y check_out
                            formatted_row[i] = formatted_row[i].strftime('%H:%M')  # Formato HH:MM
                        else:
                            formatted_row[i] = formatted_row[i].isoformat()

                # Añadir los campos devueltos a la lista de datos
                user_flight_id, user_id, flight_id, seat_id, flight_id_2, destiny_id, origin_id, date, check_in, check_out, airplane_id, flight_state, seat_id_2, flight_class_id, airplane_id_2, seat_state, seat_name, user_name, origin_city, destiny_city = formatted_row
                datos.append({
                    "user_flight_id": user_flight_id,
                    "user_id": user_id,
                    "flight_id": flight_id,
                    "seat_id": seat_id,
                    "flight_id_2": flight_id_2,
                    "destiny_id": destiny_id,
                    "origin_id": origin_id,
                    "date": date,
                    "check_in": check_in,
                    "check_out": check_out,
                    "airplane_id": airplane_id,
                    "flight_state": flight_state,
                    "seat_id_2": seat_id_2,
                    "flight_class_id": flight_class_id,
                    "airplane_id_2": airplane_id_2,
                    "seat_state": seat_state,
                    "seat_name": seat_name,
                    "user_name": user_name,
                    "origin_city": origin_city,
                    "destiny_city": destiny_city
                })

            cursor.close()
            conn.close()
            
            return json.dumps(datos)
    except Exception as e:
        return str(e)



"""
COMIENZO DE LA API

"""

app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return "Bienvenido a la API!"

"""
API DE AIRLINE JJR

"""
" Request GET a la tabla User para validación"
@app.route('/login/', methods=['POST'])
def obtener_usuario():
    datos = request.json
    email = datos.get('email')
    pswd = datos.get('pswd')
    datos = Buscar_Usuario(email,pswd)
    if datos:
        return jsonify({'respuesta': 'true',
                        'id': f'{datos[0]}'})

    else:
        return jsonify({'respuesta': 'false'}), 404

" Request POST a la tabla User"
@app.route('/create_user/', methods=['POST'])
def crear_usuario_Airline():
    datos = request.json

    if not datos:
        return jsonify({'respuesta': 'Se requiere un nombre, correo, dirección y contraseña'}), 400
    
    name = datos.get('name')
    email = datos.get('email')
    address = datos.get('address')
    pswd = datos.get('pswd')
    
    bandera = Crear_Usuario(name,email,address,pswd)
    if bandera == 1:
        return jsonify({'respuesta': 'El usuario se registró exitosamente'})
    elif bandera == 0:
        return jsonify({'respuesta': 'Error al crear al usuario'})

" Request GET en tabla Destiny "
@app.route('/destino/', methods=['GET'])
def obtener_destinos():
    datos = Buscar_Destinos()
    if datos is None:
        # Manejar el caso cuando no se encuentran datos
        return jsonify({"message": "No se encontraron destinos"}), 404
    else:
        return datos, 200

" Request GET en tabla Origin "
@app.route('/origen/', methods=['GET'])
def Obtener_origenes():
    datos = Buscar_Origenes()
    if datos is None:
        
        return jsonify({"message": "No se encontraron destinos"}), 404
    else:
        return datos, 200

" Request POST en la tabla Flight "
@app.route('/flight/', methods=['POST'])
def Consultar_vuelos_api():
    datos = request.json
    origen_id = datos.get('origen_id')
    destino_id = datos.get('destino_id')
    date = datos.get('date')

    vuelos = Consultar_vuelos(origen_id,destino_id,date)
    if vuelos is None:
        # Manejar el caso cuando no se encuentran datos
        return jsonify({"respuesta": "No se encontraron vuelos"}), 404
    else:
        return vuelos, 200
    
" Request POST a Seat"
@app.route('/seat/', methods=['POST'])
def Consultar_asientos_api():
    datos = request.json
    airplane_id = datos.get('airplane_id')

    vuelos = Consultar_Asientos(airplane_id)
    if vuelos is None:
        # Manejar el caso cuando no se encuentran datos
        return jsonify({"respuesta": "No se encontraron destinos"}), 404
    else:
        return vuelos, 200

" Request GET a Flight_Class"
@app.route('/clases/', methods=['GET'])
def Consultar_clases_api():

    clases = Consultar_Clases()
    if clases is None:
        # Manejar el caso cuando no se encuentran datos
        return jsonify({"respuesta": "No se encontraron destinos"}), 404
    else:
        return clases, 200

" Request POST a User_Flight"
@app.route('/asignar/', methods=['POST'])
def Asignar_vuelo_api():
    datos = request.json

    if not datos:
        return jsonify({'respuesta': 'Se requiere un nombre, correo, dirección y contraseña'}), 400
     
    user_id = datos.get('user_id')
    flight_id  = datos.get('flight_id')
    seat_id = datos.get('seat_id')

    flag = Asignar_vuelo(user_id,flight_id,seat_id)

    if flag == 1:
        return jsonify({'respuesta': 'El vuelo se registró exitosamente'})
    elif flag == 0:
        return jsonify({'respuesta': 'Error al registrar vuelo'})
    
@app.route('/cancelar/', methods=['POST'])
def cancelar_vuelo_api():
    datos = request.json

    if not datos:
        return jsonify({'respuesta': 'Se requiere id'}), 400
    
    user_flight_id = datos.get('user_flight_id')
    
    bandera = cancelar_vuelo(user_flight_id)
    if bandera == 1:
        return jsonify({'respuesta': 'Vuelo cancelado exitosamente'})
    elif bandera == 0:
        return jsonify({'respuesta': 'Error al cancelar el vuelo'})
    
" Request POST a Consulta macabrona jaja así es"
@app.route('/macabron/', methods=['POST'])
def Consulta_macabrona_api():
    datos = request.json
    user_id = datos.get('user_id')
    campos = Consulta_macabrona(user_id)
    if campos is None:
        # Manejar el caso cuando no se encuentran datos
        return jsonify({"respuesta": "No se encontraron destinos"}), 404
    else:
        return campos, 200



if __name__ == '__main__':
    app.run(debug=True)
