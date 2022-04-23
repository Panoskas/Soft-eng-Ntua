from argparse import ArgumentParser
import requests
import csv
from  apiBaseURL import Baseurl



def getChragerBy(op,dateFrom, dateTo,format):
    try:
        requestURL = Baseurl +'chargesby'+'/' +op +'/'+ dateFrom+'/'+dateTo
        response = requests.get(requestURL)
        response = response.json()
        #############
        if format =='csv':
            with open(str(op)+'_'+str(dateFrom) +'_' +str(dateTo)+'_'+'chargesby.csv', 'w') as f:
                field_names = ['NumberOfPasses', 'PassesCost', 'VisitingOperator']
                writer = csv.DictWriter(f, fieldnames=field_names)

                writer.writeheader()
                for row in response['PROList']:
                    writer.writerow(row)
        #############
        else:
            print(response)
    except Exception as e :
        print("Make sure that operator and date are valid and in correct foramt yyyymmdd")
        print(e)
    return response


if __name__ == '__main__':
    parser = ArgumentParser(description='')
    parser.add_argument('--op',action='append')
    parser.add_argument('--datefrom', action='append')
    parser.add_argument('--dateto', action='append')
    parser.add_argument('--format', action='append')

    args = parser.parse_args()

    if args.format[0] != 'csv' and args.format[0] != 'json':
        print('format must be either "json" or "csv"')
    else:
        if args.op and  args.datefrom and args.dateto and args.format:
            getChragerBy(args.op[0],args.datefrom[0],args.dateto[0],args.format[0])
        else:
            print('please provide --op, --datefrom, --dateto, --format')
    