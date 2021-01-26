from apscheduler.schedulers.blocking import BlockingScheduler as scheduler
import requests
import os,sys,mh_z19


apiPass = "123456"
baseUrl = "http://127.0.0.1:3000"
sendDataPerSecond = 5;

def myfn():
    sensorData = mh_z19.read()

    co2data = sensorData["co2"]

    parameters = {
        "apiPass": apiPass,
        "co2data": co2data
    }

    requestUrl = baseUrl+"/save/"+parameters["apiPass"]+"/"+str(parameters["co2data"])
    response = requests.get(requestUrl)
    print(response.json())


# Executing code before starting the scheduler.
print('Starting scheduler, ctrl-c to exit!')

sch = scheduler()
sch.add_job(myfn, 'interval', seconds=sendDataPerSecond)
sch.start()