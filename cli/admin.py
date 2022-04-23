from argparse import ArgumentParser
import requests
from  apiBaseURL import Baseurl




if __name__ == '__main__':
    parser = ArgumentParser(description='')
    parser.add_argument('--action',action='append')
    args = parser.parse_args()
    action = args.action[0]



    if action != 'healthcheck' and  action != 'resetvehicles' and action != 'resetstations' and action != 'resetpasses':
        print('please chose between healthcheck, resetvehicles, resetstations and resetpasses')
    else:
        requestURL = Baseurl +'admin/' +action
        if action == 'healthcheck':
            response = requests.get(requestURL)
        else:
            response = requests.post(requestURL)
        response = response.json()
        print(response)
