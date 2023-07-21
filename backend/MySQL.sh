#!/bin/sh
sudo apt install pkg-config
sudo apt install python3-dev default-libmysqlclient-dev build-essential
export MYSQLCLIENT_LDFLAGS=$(pkg-config --libs mysqlclient)
export MYSQLCLIENT_CFLAGS=$(pkg-config --cflags mysqlclient)
pip install mysqlclient

export RDS_HOSTNAME=backend.ccrtawu91aoe.us-east-1.rds.amazonaws.com

export RDS_PORT=3306

export RDS_DB_NAME=backend

export RDS_USERNAME=admin

export RDS_PASSWORD=12345678
