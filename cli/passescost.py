from argparse import ArgumentParser
import requests
from  apiBaseURL import Baseurl
import csv


def getPassesCost(op1,op2,dateFrom, dateTo,format):
    try:
        requestURL = Baseurl +'passescost'+'/'+ op1 + '/' +op2 +'/'+ dateFrom+'/'+dateTo
        response = requests.get(requestURL)
        response = response.json()
        ###########
        if format =='csv':
            with open(str(op1)+'_'+str(op2)+'_'+str(dateFrom) +'_' +str(dateTo)+'_'+'passesCost.csv', 'w') as f:
                field_names = ['NumberOfPasses', 'PassesCost', 'PeriodFrom','PeriodTo','RequestTimestamp','op_1ID',"op_2ID"]
                writer = csv.DictWriter(f, fieldnames=field_names)

                writer.writeheader()
                for row in [response]:
                    writer.writerow(row)
        #############
        else:
            print(response)
    except Exception as e :
        print("Make sure that operators and date are valid and in correct foramt yyyymmdd")
        print(e)
    return response


if __name__ == '__main__':
    parser = ArgumentParser(description='')
    parser.add_argument('--op1',action='append')
    parser.add_argument('--op2',action='append')
    parser.add_argument('--datefrom', action='append')
    parser.add_argument('--dateto', action='append')
    parser.add_argument('--format', action='append')

    args = parser.parse_args()
    if args.format[0] != 'csv' and args.format[0] != 'json':
        print('format must be either "json" or "csv"')
    else:
        if args.op1 and args.op2 and  args.datefrom and args.dateto and args.format:
            getPassesCost(args.op1[0],args.op2[0] ,args.datefrom[0],args.dateto[0],args.format[0])
        else:
            print('please provide --op1, --op2, --datefrom, --dateto')
    