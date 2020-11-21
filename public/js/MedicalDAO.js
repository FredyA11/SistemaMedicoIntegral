const { query } = require('express');
const mysql=require('mysql');

class MedicalDAO{
    constructor(){
        
    }

    createConnection(){
        this.con = mysql.createConnection({
            host: "localhost",
            user: "test1",
            password: "Octubre.19",
            database:"centromedicodb"
        });
    }

    connectToDatabase(){
        this.con.connect(function(err) {
            if (err) throw err;
            console.log("Connected to database!");
        });
    }

    loginUsuario(credentials,callback){
        var existe=false;
        let tipoUsuario=credentials[0];
        var sql="";
        if(tipoUsuario=="Administrador"){
            console.log("El tipo es administrador");
            sql = "SELECT * from administrador where id ='"+credentials[1]+"' AND password='"+credentials[2]+"';";
        }
        if(tipoUsuario=="Medico"){
            console.log("El tipo es medico");
            sql = "SELECT * from medico where cedPro ='"+credentials[1]+"' AND password='"+credentials[2]+"';";
        }
        if(tipoUsuario=="Paciente"){
            console.log("El tipo es paciente");
            sql = "SELECT * from paciente where noSegSoc ='"+credentials[1]+"' AND password='"+credentials[2]+"';";
        }
        console.log(sql);
        this.con.query(sql, function(err, results){
            if (err){ 
                console.log(err);
                existe=false;
                let usuario2=null;
                callback(err,existe,usuario);
                throw err;
                
            }
            else{
                if(results.length==0){
                    existe=false;
                    let usuario2=null;
                    callback(err,existe,usuario);
                }
                else{
                    existe=true;
                    
                }

                let usuario="";
                    if(tipoUsuario=="Administrador"){
                        usuario=results[0].id;
                    }
                    if(tipoUsuario=="Medico"){
                        usuario=results[0].cedPro;
                    }
                    if(tipoUsuario=="Paciente"){
                        usuario=results[0].noSegSoc;
                    }
                    
                    console.log(usuario);
                    callback(null,existe,usuario);
                
            }
            
        })
      
    }

}



module.exports=MedicalDAO;