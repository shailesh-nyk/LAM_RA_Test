# LAM_RA_Test

## Step 1 -- Install SOLR
Use the below link for instructions on how to install SOLR DB in your machine
https://computingforgeeks.com/install-latest-apache-solr-on-ubuntu-debian/

## Step 2 -- SETUP SOLR DB in CLOUD mode

Reference: https://lucene.apache.org/solr/guide/8_2/solr-tutorial.html#create-a-new-collection

1. cd to SOLR home folder
2. bin/solr start -e cloud
3. Select default settings and proceed (use 2 nodes/instances when prompted)
4. After startup is complete, you’ll be prompted to create a collection to use for indexing data.
5. Create collection with name "students"  (use 2 shards & replication factor when prompted)
6. http://localhost:8983/solr to check admin console and confirm SOLR is running
6. Load the Student registration data -- Provided in root folder of the project
7. bin/post -c students PATH_TO_PROJECT/student_reg_sample_data.csv
8. Once you are done with this step, go to http://localhost:8983/solr/#/students/query and run the basic query to check if data is loaded

## Step 3 -- Running this project

You will find 3 folders inside the root project folder which will be created after you clone or unzip this repository.
1. frontend -- React Client for this project
2. backend -- NodeJS server for student details from SOLR
3. monitoring_backend -- NodeJS server for the monitoring system 

### 1. Running `backend`

1. cd backend
2. npm install
3. npm start

### 2. Running `monitoring_backend`

1. cd monitoring_backend
2. npm install
3. Make changes in config.js 
4. Change `directory` property for NodeJS service(1) to the root directory of the `backend` folder
5. Change `directory` property for the SOLR instances (2 & 3) to the HOME directory where you installed SOLR

### 3. Running `frontend`

1. cd frontend
2. npm install
3. npm start
4. Make changes in /src/config.js if you are running backend on different port than default

### 4. Accessing the client

1. Client will run on http://localhost:3000 by default.
2. Student registration details page is on '/studentlist' route
..* This page will display the details from the data we previously loaded into SOLR DB
..* Data table has pagination, search and sort column feature
3. Service monitoring page is on '/monitor' route
..* You can see services and their status in different cards
..* Start/Stop buttons to start or stop service alternatively
..* When service is running, there's a info button which will give some details about the running service
..* There's a log button which shows the terminal logs provided the service was started from the client and not externally.

### 5. Testing

1. Make sure all services are up and running
2. navigate to `backend` 
3. run `npm test`
4. navigate to `monitoring_backend`
5. run `npm test`

### Thank you!
