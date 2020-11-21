//const { query } = require('express');
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

    consultarPacientes(callback){
        let sql="SELECT * FROM paciente";
        this.con.query(sql, function(err, results){
            if (err){ 
                let result="error";
                callback(result);

            }
            else{
                callback(results);
            }
            
        });
    }

    registrarPaciente(userValues,callback){
        let nombre=userValues[0];
        let noSegSoc=userValues[1];
        let password=userValues[2];
        let poliza=userValues[3];
        let sql="INSERT INTO paciente(nombre,noSegSoc,password,poliza) VALUES ('"+nombre+"','"+noSegSoc+"','"+password+"','"+poliza+"')";
        this.con.query(sql, function(err, results){
            if (err){ 
                let result="error";
                callback(err,result);

            }
            else{
                let result="success";
                console.log(results);
                callback(err,result);
            }
            
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

    buscaMedico(credentials,callback){
        var existe=false;
        let cedula=credentials[2];
        var sql="select * from medico where cedPro = '"+cedula+"';";
        console.log(sql);
        this.con.query(sql, function(err, results){
            if (err){ 
                console.log("El error es:"+err);
                existe=false;
                callback(err,existe);
            }
            else{
                if(results.length==0){
                    existe=false;
                    console.log("Si se puede crear");
                    callback(err,existe);
                }
                else{
                    existe=true;
                    console.log("Ya existe esta repetido");
                    callback(null,existe);
                }

                    
                
            }
            
        })
      
    }
    buscaMedicoNom(credentials,callback){
        var existe=false;
        let cedula=credentials[0];
        var sql="select * from medico where nombre = '"+cedula+"';";
        console.log(sql);
        this.con.query(sql, function(err, results){
            if (err){ 
                console.log("El error es:"+err);
                existe=false;
                callback(err,existe);
            }
            else{
                if(results.length==0){
                    existe=false;
                    console.log("Si se puede crear");
                    callback(err,existe);
                }
                else{
                    existe=true;
                    console.log("Ya existe esta repetido");
                    callback(null,existe);
                }

                    
                
            }
            
        })
      
    }
    buscaMedicoCed(credentials,callback){
        var existe=false;
        let cedula=credentials[0];
        var sql="select * from medico where cedPro = '"+cedula+"';";
        console.log(sql);
        this.con.query(sql, function(err, results){
            if (err){ 
                console.log("El error es:"+err);
                existe=false;
                callback(err,existe);
            }
            else{
                if(results.length==0){
                    existe=false;
                    console.log("Si se puede crear");
                    callback(err,existe);
                }
                else{
                    existe=true;
                    console.log("Ya existe esta repetido");
                    callback(null,existe);
                }

                    
                
            }
            
        })
      
    }

    registrarMedico(credentials,callback){
        var existe=false;
        let cedula=credentials[2];
        var sql="insert into medico (nombre,especialidad,cedPro,password,equipoTrabajo,universidad,afilicacion) values ('"+credentials[0]+"','"+credentials[1]+"','"+credentials[2]+"','"+credentials[3]+"','"+credentials[4]+"','"+credentials[5]+"','"+credentials[6]+"');";
        console.log(sql);
        this.con.query(sql, function(err, results){
            if (err){ 
                console.log("El error es:"+err);
                existe=false;
                callback(err,existe);
            }
            else{ 
                existe=true;
                callback(err,existe);
            }
            
        })
      
    }

}



module.exports=MedicalDAO;