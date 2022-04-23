from argparse import ArgumentParser
import requests
from  apiBaseURL import Baseurl
import csv


def getPassesPerStation(stationId,dateFrom, dateTo,format):
    try:    
        requestURL = Baseurl+"passesperstation"+'/' +stationId +'/'+ dateFrom+'/'+dateTo
        response = requests.get(requestURL)
        response = response.json()
           ###########
        if format =='csv':
            with open(str(stationId)+'_'+str(dateFrom) +'_' +str(dateTo)+'_'+'passesPerStation.csv', 'w') as f:
                field_names = ['PassID', 'Vehicle_vehicleID', 'charge','PeriodTo','providerAbbr','timestamp']
                writer = csv.DictWriter(f, fieldnames=field_names)

                writer.writeheader()
                for row in response['PassesList']:
                    writer.writerow(row)
        #############
        else:
            print(response)
    except Exception as e :
        print("Make sure that Station, and date are valid and in correct foramt yyyymmdd")
        print(e)
    return response


if __name__ == '__main__':
    parser = ArgumentParser(description='')
    parser.add_argument('--station',action='append')
    parser.add_argument('--datefrom', action='append')
    parser.add_argument('--dateto', action='append')
    parser.add_argument('--format', action='append')

    args = parser.parse_args()
    
    if args.format[0] != 'csv' and args.format[0] != 'json':
        print('format must be either "json" or "csv"')
    else:
        if args.station and args.datefrom and args.dateto and args.format:
            getPassesPerStation(args.station[0],args.datefrom[0],args.dateto[0],args.format[0])
        else:
            print('please provide --staion, --datefrom, --dateto')
    