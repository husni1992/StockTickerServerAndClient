var express = require('express');
var mysql = require('mysql');
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");

// this is used to catch data from the post requst
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var connectionStringObj = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stocktickerDb'
}

var dbConnection = mysql.createConnection(connectionStringObj);

dbConnection.connect(function(error) {
    console.log("Estqablishing connection with: " + connectionStringObj.database);
    if (!!error) {
        console.log("Error connecting to db");
    } else {
        console.log("Established connecttion with: " + connectionStringObj.database);
    }
});

app.listen(1335);
console.log("Server running");
seedStockTable();

// access control --> allowed all origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getLiveStockUpdates', function(req, res) {
    console.log("Get: " + req.url);
    
    var querylist = null;
    if (req.query.selectedList) {
        querylist = req.query.selectedList;
        console.log(querylist)
    }

    var sqlQuery = null;

    if (querylist) {
        sqlQuery = "SELECT Id, Price FROM stocks WHERE Id IN (" + querylist + ") ";
    }

    dbConnection.query(sqlQuery, function(error, rows, fields) {        
        if (!!error) {
            console.log(sqlQuery);
            res.write(error);
            res.end();
        } else {
            // parse rows
            console.log(sqlQuery);
            console.log("Live update sent");
            
            res.write(JSON.stringify(rows));
            res.end();
        }
    });
})

app.get('/getallstocks', function(req, res) {
    console.log("Get request recieved: " + req.url);

    var querylist = null;
    if (req.query.selectedList) {
        querylist = req.query.selectedList;
        
        var selectedListArray = querylist.split(",");
        console.log("Parameter length : " + selectedListArray.length);
    }

    var selectFromStocksQuery = null;

    if (querylist) {
        selectFromStocksQuery = "SELECT * FROM stocks WHERE Id IN (" + querylist + ") ";
    } else {
        selectFromStocksQuery = "SELECT * FROM stocks";
    }

    dbConnection.query(selectFromStocksQuery, function(error, rows, fields) {
        // callback
        if (!!error) {
            console.log("some error");

            res.write("Error x in query");
        } else {
            // parse rows
            console.log(selectFromStocksQuery);
            res.write(JSON.stringify(rows));

            res.end();
        }
    });

})

app.post('/addNewStock', function(req, res) {
    
    console.log("Post request recieved: " + req.url);
//    console.log(req.body);

    if (req.body.Name) {
        var name = req.body.Name,
            Price = req.body.Price,
            ImageUrl = req.body.ImageUrl;

        var insertIntoStocksQuery = "INSERT INTO stocks (Name,Price,ImageUrl) VALUES ('" + name + "','" + Price + "','" + ImageUrl + "')";

        dbConnection.query(insertIntoStocksQuery, function(error, rows, fields) {
            if (!!error) {
                console.log("some error");

                res.write("Some error in addNewStock query");
            } else {
                // parse rows
                console.log(insertIntoStocksQuery);
                res.write(JSON.stringify(rows));

                res.end();
            }
        });


    }
});

function seedStockTable() {

    var checkIfDataExistInTable = `select count(*) AS namesCount from stocks`;

    var insertStocksQuery = `
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
        (10, 'Audi', '271', 'https://s-media-cache-ak0.pinimg.com/236x/79/33/cc/7933cc9786dde84d82c7bf9263a9746e.jpg')
    `

    var dataExist = null;
    var rowCount = null;
    dbConnection.query(checkIfDataExistInTable, function(error, rows, fields) {
        // callback
        if (!!error) {
            console.log("Error getting count")
        } else {
            rowCount = rows[0].namesCount;

            if (rowCount > 0) {
                dataExist = true;
            } else {
                insertStockTableData();
            }

        }
    })

    function insertStockTableData() {
        dbConnection.query(insertStocksQuery, function(error, rows, fields) {
            // callback
            if (!!error) {
                console.log("Error inserting data to stocks table")
            } else {
                // parse rows
                console.log("Succesfully inserted data into stocks table");
            }
        })
    }


    ;
}