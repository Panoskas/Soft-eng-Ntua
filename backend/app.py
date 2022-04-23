from flask import Flask, jsonify, render_template, request
from flask_mysqldb import MySQL
from flask_cors import CORS
import pandas as pd
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'admin'
app.config['MYSQL_DB'] = 'softeng21'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)


@app.route('/')
def index_page():
    return "Hello, this is ultrapass' backend! Have a nice journey!"


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        try:
            requestJson = request.get_json(force=True)
            username = requestJson['username']
            password = requestJson['password']
            userIdentity = requestJson['userIdentity']
            #print(username)
            #print(password)
            #print(userIdentity)
            cursor = mysql.connection.cursor()
            cursor.execute('''USE softeng21;''')
            cursor.execute('''SELECT *FROM User WHERE username = %(un)s AND password = %(ps)s AND userIdentity = %(ui)s;''', {'un': username, 'ps': password, 'ui':userIdentity})
            results = cursor.fetchall()
                
        except:
            return {'status': 'failed', 'dbconnection': 'Cannot connect to database'}
        else:
            return jsonify(results)


@app.route('/admin/healthcheck', methods=['GET'])
def healthCheck():
    if request.method == 'GET':
        try:
            cursor = mysql.connection.cursor()
            cursor.execute('''USE softeng21;''')
        except:
            return {'status': 'failed', 'dbconnection': 'Cannot connect to database'}
        else:
            return {'status': 'OK', 'dbconnection': 'Connection successful'}


@app.route('/admin/resetvehicles', methods=['POST'])
def resetVehicles():
    if request.method == 'POST':
        try:
            vehicles = pd.read_csv(
                '../data/sampledata01_vehicles_100.csv', header=0, delimiter=';').to_numpy()
            cursor = mysql.connection.cursor()

            cursor.execute('''DELETE FROM Vehicle;''')
            mysql.connection.commit()

            for v in vehicles:
                cursor.execute('''INSERT INTO Vehicle(vehicleID, tagID, tagProvider, providerAbbr, licenseYear) VALUES(%(vehicleID)s,%(tagID)s,%(tagProvider)s,%(providerAbbr)s,%(licenseYear)s);''', {
                               'vehicleID': v[0], 'tagID': v[1], 'tagProvider': v[2], 'providerAbbr': v[3], 'licenseYear': v[4]})
                mysql.connection.commit()

            #cursor.execute('''SELECT *FROM Vehicle;''')
            # return jsonify(cursor.fetchall())
        except:
            return {'status': 'failed'}
        else:
            return {'status': 'ok'}


@app.route('/admin/resetstations', methods=['POST'])
def resetStations():
    if request.method == 'POST':
        try:
            stations = pd.read_csv(
                '../data/sampledata01_stations.csv', header=0, delimiter=';').to_numpy()
            cursor = mysql.connection.cursor()

            cursor.execute('''DELETE FROM Station;''')
            mysql.connection.commit()

            for s in stations:
                cursor.execute('''INSERT INTO Station(stationID, stationProvider, stationName) VALUES(%(stationID)s,%(stationProvider)s,%(stationName)s);''', {
                               'stationID': s[0], 'stationProvider': s[1], 'stationName': s[2]})
                mysql.connection.commit()

            cursor.execute('''SELECT *FROM Station;''')
            # return jsonify(cursor.fetchall())
        except:
            return {'status': 'failed'}
        else:
            # return jsonify(cursor.fetchall())
            return {'status': 'ok'}


@app.route('/admin/resetpasses', methods=['POST'])
def resetPasses():
    if request.method == 'POST':
        try:
            passes = pd.read_csv(
                '../data/sampledata01_passes100_8000.csv', header=0, delimiter=';').to_numpy()
            cursor = mysql.connection.cursor()

            cursor.execute('''DELETE FROM Pass;''')
            mysql.connection.commit()

            for p in passes:
                datetime_str = p[1]
                datetime_object = datetime.strptime(
                    datetime_str, '%d/%m/%Y %H:%M')
                cursor.execute('''INSERT INTO Pass(passID, timestamp, charge, Station_stationID, Vehicle_vehicleID) VALUES(%(passID)s,%(timestamp)s,%(charge)s, %(Station_stationID)s, %(Vehicle_vehicleID)s);''', {
                               'passID': p[0], 'timestamp': datetime_object, 'charge': p[4], 'Station_stationID': p[2], 'Vehicle_vehicleID': p[3]})
                mysql.connection.commit()

            cursor.execute('''SELECT *FROM Pass;''')
            # return jsonify(cursor.fetchall())
        except:
            return {'status': 'failed'}
        else:
            # return jsonify(cursor.fetchall())
            return {'status': 'ok'}


# helpersStart

def converToDateTime(date):
    try:
        date += " 00:00:00"
        datetime_object = datetime.strptime(date, '%Y%m%d %H:%M:%S')
        return datetime_object
    except:
        raise TypeError("Date_from not valid. Must be in format YYYYMMDD")


# helpersEnd
@app.route('/passesperstation/<stationID>/<date_from>/<date_to>', methods=['GET'])
def passesPerStation(stationID, date_from, date_to):
    try:
        datetime_object_from = converToDateTime(date_from)
        datetime_object_to = converToDateTime(date_to)

        cursor = mysql.connection.cursor()
        cursor.execute('''SELECT Pass.PassID,Pass.timestamp,Pass.charge,Pass.Vehicle_vehicleID, Vehicle.providerAbbr FROM Pass JOIN Vehicle ON Vehicle.vehicleID = Vehicle_vehicleID WHERE Station_StationID = %(stID)s AND timestamp >= %(dtFrom)s AND timestamp <= %(dtTo)s''',
                       {'stID': stationID, 'dtFrom': datetime_object_from, 'dtTo': datetime_object_to})
        results = cursor.fetchall()

        ans = {}
        ans['Station'] = stationID
        ans['StationOperator'] = stationID[:2]
        ans['RequestTimestamp'] = datetime.today()
        ans['PeriodFrom'] = date_from
        ans['PeriodTo'] = date_to
        ans['NumberOfPasses'] = len(results)
        ans['PassesList'] = results

        return jsonify(ans)
    except Exception as e:
        return str(e)


#the following endpoints all require the information of whose cars passed on foreign station
# e.g. if a car with tag "attiki_odos"(op2) passes from a station belonging to "kedriki_odos" (op1)
# Thus we have seperated the part of the query that pulls such information and everytime we select something different
#############################################################
# YOU HAVE TO ADD THE SELECT .... FROM PART OF THE QUERY!!!!!!!!
GetCarsPassingFromForeignStationsQuery = '''(
            SELECT *FROM(
                /*get all vehicles from op2*/
                (SELECT * FROM Vehicle WHERE Vehicle.tagProvider =  %(op_2ID)s) 
                AS op2Vehicles 
                
                INNER JOIN 

                (SELECT * FROM 
                        /* get all the stations of op1*/
                        ( SELECT * FROM Station WHERE Station.stationProvider = %(op_1ID)s) 
                    AS company_stations
                    /* and get all the passes from these stations*/
                    INNER JOIN Pass ON company_stations.stationID =Pass.Station_stationID 
                    )
                AS op1Pass 
                /* now keep all the passes that belong to vehicles from op2Vehicles*/
                ON op2Vehicles.vehicleID = op1Pass.Vehicle_vehicleID
            )  
        )AS final
        /* get only the ones that are in the specific period*/
         WHERE  final.timestamp >= %(dtFrom)s AND final.timestamp <= %(dtTo)s '''
#############################################################



@app.route('/passesanalysis/<op_1ID>/<op_2ID>/<date_from>/<date_to>', methods=['GET'])
def passesAnalysis(op_1ID, op_2ID, date_from, date_to):
    try:
        datetime_object_from = converToDateTime(date_from)
        datetime_object_to = converToDateTime(date_to)

        cursor = mysql.connection.cursor()
        cursor.execute('''
        SELECT passID,stationID,timestamp,vehicleID,charge FROM ''' + GetCarsPassingFromForeignStationsQuery,
                       {'op_2ID': op_2ID,'op_1ID' :op_1ID, 'dtFrom': datetime_object_from, 'dtTo': datetime_object_to})
        results = cursor.fetchall()


        ans = {}
        ans['op_1ID'] = op_1ID
        ans['op_2ID'] = op_2ID
        ans['RequestTimestamp'] = datetime.today()
        ans['PeriodFrom'] = date_from
        ans['PeriodTo'] = date_to
        ans['NumberOfPasses'] = len(results)
        ans['PassesList'] = list(results)

        return jsonify(ans)

    except Exception as e:
        return str(e)

####################################################
@app.route('/passescost//<op_1ID>/<op_2ID>/<date_from>/<date_to>', methods=['GET'])
def passesCost(op_1ID, op_2ID, date_from, date_to):
    try:
        datetime_object_from = converToDateTime(date_from)
        datetime_object_to = converToDateTime(date_to)

        cursor = mysql.connection.cursor()
        cursor.execute('''
        SELECT COUNT(passID), SUM(charge) FROM''' + GetCarsPassingFromForeignStationsQuery,
                       {'op_2ID': op_2ID,'op_1ID' :op_1ID, 'dtFrom': datetime_object_from, 'dtTo': datetime_object_to})
        results = cursor.fetchall()
        #print(results)

        ans = {}
        ans['op_1ID'] = op_1ID
        ans['op_2ID'] = op_2ID
        ans['RequestTimestamp'] = datetime.today()
        ans['PeriodFrom'] = date_from
        ans['PeriodTo'] = date_to
        ans['NumberOfPasses'] = results[0]['COUNT(passID)']
        ans['PassesCost'] = results[0]['SUM(charge)']


        return jsonify(ans)

    except Exception as e:
        return str(e)



@app.route('/chargesby/<op_ID>/<date_from>/<date_to>', methods=['GET'])
def ChargesBy(op_ID, date_from, date_to):
    try:

        datetime_object_from = converToDateTime(date_from)
        datetime_object_to = converToDateTime(date_to)

        cursor = mysql.connection.cursor()
        cursor.execute('''select DISTINCT stationProvider from Station''')
        operatos = cursor.fetchall()

        op_1ID = op_ID

        ans = {}
        ans['op_ID'] = op_ID
        ans['RequestTimestamp'] = datetime.today()
        ans['PeriodFrom'] = date_from
        ans['PeriodTo'] = date_to
        ans['PROList'] = []

        for operator in operatos:
            op_2ID = operator['stationProvider']
            if op_1ID != op_2ID:
                cursor = mysql.connection.cursor()
                cursor.execute('''
                SELECT COUNT(*),SUM(charge) FROM''' + GetCarsPassingFromForeignStationsQuery,
                            {'op_2ID': op_2ID,'op_1ID' :op_1ID, 'dtFrom': datetime_object_from, 'dtTo': datetime_object_to})
                results = cursor.fetchall()
                

                temp ={}
                temp['VisitingOperator'] = op_2ID
                temp['NumberOfPasses'] = results[0]['COUNT(*)']
                temp['PassesCost']  = results[0]['SUM(charge)']
                ans['PROList'].append(temp)



        return jsonify(ans)
    except Exception as e:
        return str(e)
