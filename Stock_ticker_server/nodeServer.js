var express = require('express');
var mysql = require('mysql');
var app = express();
var router = express.Router();    
var bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connectionStringObj = {
   // properties......
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stockticker'
}

var connection = mysql.createConnection(connectionStringObj);

connection.connect(function(error){
   // callback 
    if(!!error){
        console.log("error connecting to db");
    }else{
        console.log("connected to: "+connectionStringObj.database);
    }
});

app.listen(1335);
console.log("Server running");
createMasterTable();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,     Content-Type, Accept");
    next();
});

//getallstockNames
app.get('/getallstockNames', function(req, resp){
    console.log("A user made a request"+req.url);      
       
    connection.query("SELECT ID,Name FROM stockTicker2", function(error, rows, fields){
        // callback
        if(!!error){
            console.log("some error");
            resp.write("Error x in query");
        }else{
            // parse rows
            console.log("Data retrieved from stockTicker2");
            resp.write(JSON.stringify(rows));
            
            resp.end();
        }
    });
    
})

app.get('/getLiveStockUpdates', function(req, resp){
    console.log("Live update requested");  
    var res = null;
    var querylist = null;
    if(req.query.selectedList){
        querylist = req.query.selectedList;   
        console.log(querylist)
    }
    
    var sqlQuery = null;
    
    if(querylist){
        sqlQuery = "SELECT Id, Price FROM stocks WHERE Id IN ("+querylist+") ";
    }
    
    connection.query(sqlQuery, function(error, rows, fields){
        // callback
        if(!!error){
            console.log(sqlQuery);                                    
            resp.write(error);
            resp.end();
        }else{
            // parse rows
            console.log(sqlQuery);
            console.log("Live update sent");
            resp.write(JSON.stringify(rows));
            
            resp.end();
        }
    });
})

app.get('/getallstocks', function(req, resp){
    console.log("A user made a request"+req.url);  
    var res = null;
    var querylist = null;
    if(req.query.selectedList){
        querylist = req.query.selectedList;   
        res = querylist.split(",");        
        console.log("Parameter length : "+res.length);
    }
    
    var sqlQuery = null;
    
    if(querylist){
        sqlQuery = "SELECT * FROM stocks WHERE Id IN ("+querylist+") ";
    }else{
        sqlQuery = "SELECT * FROM stocks";
    }
    
    connection.query(sqlQuery, function(error, rows, fields){
        // callback
        if(!!error){
            console.log("some error");                                    
            
            resp.write("Error x in query");
        }else{
            // parse rows
            console.log(sqlQuery);
            resp.write(JSON.stringify(rows));
            
            resp.end();
        }
    });
    
})

app.post('/addNewStock', function(req, resp){
    console.log("addNewStock post requst came");  
    console.log(req.body);
    
    if(req.body.Name){
        var name = req.body.Name,
            Price = req.body.Price,
            ImageUrl = req.body.ImageUrl;
        
        var sqlQuery = null;
        
        sqlQuery = "INSERT INTO stocks (Name,Price,ImageUrl) VALUES ('"+name+"','"+Price+"','"+ImageUrl+"')";

        connection.query(sqlQuery, function(error, rows, fields){
            // callback
            if(!!error){
                console.log("some error");                                    

                resp.write("Error x in query");
            }else{
                // parse rows
                console.log(sqlQuery);
                resp.write(JSON.stringify(rows));

                resp.end();
            }
        });
        
        
        
    }
})

app.post('/animal', function(req, res){
    console.log("post requst came");  
    console.log(req.body);
    var data = {
        name: 'Husny',
        age: 24
    }
    
    res.write(JSON.stringify(data));
    res.end();
})


app.get('/fetch', function(req, resp){
    
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
    
    console.log("A user made a request"+req.url);  
    
    resp.writeHeader(200, {'Context-Type':'application/json'});
    
    //about sql
    connection.query("SELECT * FROM mySampleTaable", function(error, rows, fields){
        // callback
        if(!!error){
            console.log("Error in query")
        }else{
            // parse rows
            console.log(rows);
            resp.write(JSON.stringify(rows));
            
            resp.end();
        }
    });
})


function createMasterTable(){
    var query = `
        CREATE TABLE stockTicker
        (
            Id int NOT NULL AUTO_INCREMENT,
            Name varchar(255) NOT NULL,
            Price varchar(255),
            ImageUrl varchar(300),
            PRIMARY KEY (ID)
        )    
    `
    
    var checkIfDataExistInTable = `select count(*) AS namesCount from stocks`;
    
    var insertQuery = `
    INSERT INTO stocks (Id, Name, Price, ImageUrl) VALUES
    (1, 'Pepsi', '66', 'http://beverageindustrynews.com.ng/wp-content/uploads/2015/11/pepsi_logo.png'),
    (2, 'Facebook', '60', 'http://static.dnaindia.com/sites/default/files/2015/05/03/333140-facbook.jpg'),
    (3, 'Google', '103', 'http://4.bp.blogspot.com/-Nyfdpymc_Lo/VkQw-nJ79mI/AAAAAAAARYg/6o9VeoTvu-I/s1600-r/logo_chrome.png'),
    (4, 'Yahoo', '336', 'https://tctechcrunch2011.files.wordpress.com/2013/09/yahoo-day-2.jpg'),
    (5, 'Jaguar', '373', 'http://s3.reutersmedia.net/resources/r/?m=02&d=20140908&t=2&i=971017924&w=644&fh=&fw=&ll=&pl=&sq=&r=LYNXMPEA870W5'),
    (6, 'Lambogini', '251', 'http://3.bp.blogspot.com/-iupK_Ih6Vs4/TyphIB1A-nI/AAAAAAAACqs/0-5AYcWuqeI/s1600/lamborghini_logo+6.png'),
    (7, 'Aston Martin', '403', 'http://cdn.astonmartin.com/sitefinity/heritage-navigation/Aston_logo3_1940hr.jpg'),
    (8, 'Pizza', '264', 'http://www.boholtourismph.com/wp-content/uploads/2014/11/Pizza_Hut-logo.png'),
    (9, 'KFC', '113', 'https://lh4.ggpht.com/P3EHfEsC90YisBe_-LdYcrtJbr54C4_w6fD_XPdoml5o3G0u6fFRSuO9GLS6ijBL66A=w300'),
    (10, 'Audi', '271', 'https://s-media-cache-ak0.pinimg.com/236x/79/33/cc/7933cc9786dde84d82c7bf9263a9746e.jpg'),
    (11, 'Lambogini', '150', 'http://www.cortilepittsburgh.org/uploads/2/9/6/4/29646119/7646421.jpg');
`
    
    var dataExist = null;
    var rowCount = null;
connection.query(checkIfDataExistInTable, function(error, rows, fields){
    // callback
    if(!!error){        
        console.log("Error in getting count")
    }else{        
        rowCount = rows[0].namesCount;
        
        if(rowCount>0){
            dataExist = true;
        }else{
            insertStockTableData();
        }                
        
    }
})

function insertStockTableData(){
    connection.query(insertQuery, function(error, rows, fields){
        // callback
        if(!!error){
            console.log("Error in Insert to createTable")
        }else{
            // parse rows
            console.log("INSERT INTO stockTicker success");            
        }
    }) 
}


;
}

