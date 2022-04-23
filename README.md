Unzip Files

Install the MySQL database schema from ./database/softeng21_DB_schema.sql

Inside the backend/app.py there are some database configurations.
Change them based on yours:

    app.config['MYSQL_HOST'] = 'localhost'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = 'admin'
    app.config['MYSQL_DB'] = 'softeng21'
    app.config['MYSQL_PORT'] = 3306
    app.config['MYSQL_CURSORCLASS'] = 'DictCursor'



Inside the directory bill_softeng create a virtual env:

    pipenv install Flask

    pipenv install flask-mysqldb

    pipenv install numpy

    pipenv install pandas



Since you have created and activated the virtual env as well as installed everything,
go inside the backend and run:

    pipenv shell
    cd backend
    flask run

The backend server must be working.
If you experience any trouble running the app try running the following commands:

    sudo apt-get install mysql-server

    sudo apt-get install libmysqlclient-dev


Now you can open postman and start sending requests.

	POST:   localhost:5000/admin/resetstations
	POST:   localhost:5000/admin/resetvehicles
	POST:   localhost:5000/admin/resetpasses    (takes some minutes)


In order to run app on background, install pm2 with npm and run:

	pm2 start "flask run"

If frontend throws watchers error do this:

    sudo sysctl fs.inotify.max_user_watches=524288

