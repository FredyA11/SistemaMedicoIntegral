//const { query } = require('express');
const mysql=require('mysql');

class MedicalDAO{
    constructor(){
        
    }

    createConnection(){
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
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
                console.log("El error es:"+err);
                existe=false;
                let usuario2=null;
                callback(err,existe,usuario);

            }
            else{
                if(results.length==0){
                    existe=false;
                    let usuario2=null;
                    callback(err,existe,usuario2);
                }
                else{
                    existe=true;
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

                    
                
            }
            
        })
      
    }

    consultarPaciente(idP, callback){
        var sql = "SELECT * FROM paciente WHERE noSegSoc ='"+idP+"';";
        console.log(sql);
        var existe = false;
        this.con.query(sql, function(err, results){
            if (err){ 
                console.log("El error es:"+err);
                existe=false;
            }
            else{
                console.log(results);
                if(results.length==0){
                    existe=false;
                    callback(err,existe);
                }
                else{
                    existe=true;
                    callback(null,existe);
                }
            }
        })
    }

}



module.exports=MedicalDAO;