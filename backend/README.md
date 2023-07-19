### Backend Environment Setup

#### 1.install environmnet
```shell
python -m pip  install -r requirements.txt
```
#### 2. start the server
```shell
python manage.py runserver
```
#### 3. start uwsgi
```shell
cd path/to/project/
cd backend
uwsgi --ini backend_uwsgi.ini 
```

### Interface 

1.  **songs/** All songs in the dataset, POST needs name, singer,period(YYYY-MM-DD) 
2.  **query/** availble after login, POST needs name, mood, text, 
3.  **users/**
    1.  **register/**   need email, username, password 
    2.  **login/**  need email, password
    3.  **logout/**      
    4.  **user/**   show basic info
    ```JSON
        {
            "user":{
                "email":"...",
                "username":"..."
            },
            "happy songs":{
                
            },
            "sad songs": {

            },
            "..."
        }
    ```
    5.  **like/**   POST needs songID.(developping)
