//Imports
//Creo ya sirve esta cosa
//ojala que si ojala ojala Ni sirve que burroide
const express=require("express");
const session=require("express-session");
const MedicalDAO= require("./public/js/MedicalDAO.js")
const app=express();
const port=8080;
const medicalDAO= new MedicalDAO();
var bodyParser = require('body-parser')
//Static files
app.use(session({
    secret:'ESTO ES SECRETO',
    resave:true,
    saveUninitialized:true,
    
}));

app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'));
app.use('/js',express.static(__dirname+'public/js'));
app.use('/images',express.static(__dirname+'public/images'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//Set views
app.set('views','./views');
app.set('view engine','ejs');


//GET POST REQUESTS
app.get('',(req,res)=>{
    /*
    if(req.session.cuenta==null){
        req.session.cuenta=1;
    }
    else{
        req.session.cuenta+=1;
    }
    if(req.session.username==null){
        req.session.username="fredy";
    }
    console.log("Usuario:"+req.session.username);*/
    //let veces=req.session.cuenta;
    res.render("index");
});

app.post("/login",(req,res)=>{
    medicalDAO.createConnection();
    medicalDAO.connectToDatabase();
    var credentials=[req.body.tipoUsuario,req.body.username,req.body.password];
    medicalDAO.loginUsuario(credentials, function(err,result,cred){
        if(result==true){
            req.session.username=cred;
            console.log("La sesion ha guardado el usuario:"+req.session.username);
            res.render("menuGeneral");
        }
        else{
            res.render("index");
        }
    
        //rest of your code goes in here
     });
    
});

app.post("/logout",(req,res)=>{
    if(req.session.username!=null){
        console.log("La sesion con el username"+req.session.username+" ha cido cerrada");
        req.session.username=null;
        
    }

    res.render("index");
});

app.get("/registrarPaciente",(req,res)=>{
    let registro=false;
    let fallido=false;
    res.render("registroPaciente",{registro,fallido});
});

app.post("/registrarPaciente",(req,res)=>{
    console.log("Registrado correctamente");
    medicalDAO.createConnection();
    medicalDAO.connectToDatabase();
    var credentials=[req.body.nombre,req.body.seguroSoc,req.body.poliza,req.body.password];
    medicalDAO.registrarPaciente(credentials, function(err,result){
        if(result=="error"){
            let registro=true;
            let fallido=true;
            res.render("registroPaciente",{registro,fallido});
        }
        else{
            console.log("Paciente registrado con exito");
            let registro=true;
            let fallido=false;
            res.render("registroPaciente",{registro,fallido});
        }
            
        
        //rest of your code goes in here
     });
});

app.get("/registrarMedico",(req,res)=>{
    let registro=false;
    let fallido=false;
    res.render("registroMedico",{registro,fallido});
});

app.post("/guardarMedico",(req,res)=>{
    medicalDAO.createConnection();
    medicalDAO.connectToDatabase();
    var credentials=[req.body.medicoName,req.body.especialidad,req.body.cedPro,req.body.passwordM,req.body.eqTrabajo,req.body.uni,req.body.afiliacion];
    medicalDAO.buscaMedico(credentials, function(err,result){
        if(result==true){
            console.log("No se puede registrar");
            let registro=true;
            let fallido=true;
            res.render("registroMedico",{registro,fallido});
        }
        else{
            medicalDAO.registrarMedico(credentials, function(err,result){
                if (result==true){
                    let registro=true;
                    let fallido=false;
                    res.render("registroMedico",{registro,fallido});
                }
                else{
                    let registro=true;
                    let fallido=true;
                    res.render("registroMedico",{registro,fallido});
                }
            });
        }
    
        //rest of your code goes in here
     });
    
});

//Listen on port
app.listen(port,()=>{
    console.log("Listening on port 8080");
});
