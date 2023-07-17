### Backend Environment Setup

#### 1.install environmnet
```shell
python -m pip  install -r requirements.txt
```
#### 2. start the server
```shell
python manage.py runserver
```


### Interface 

1.  **songs/** All songs in the dataset, POST needs name, singer,period(YYYY-MM-DD) 
2.  **query/** POST needs name, mood, text,
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
            "favoritesongs":{
                
            }
        }
    ```

    5.  **like/**   POST needs songID.(developping)
