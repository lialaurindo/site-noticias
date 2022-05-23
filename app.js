// importando express
const res = require('express/lib/response')
const express = require ('express')
// const noticias = require ('./mockup.js')

//conexão do banco de dados com a aplicação
const db=require('./dbConnection')

const port= process.env.PORT || 3000

//importando o arquivo mockup dentro do arquivo app
const app = express ()

// transforma o que recebe de info em json e recebe no banco de dados
app.use(express.json())
app.use(express.urlencoded({extend:true}))

app.set ('view engine', 'ejs')
//configurando o ejs

app.use (express.static ('./views/public'))

// criando a primeira rota
app.get('/', async (req,res) =>{
    var result= await db.query('SELECT *FROM noticias ORDER BY id_noticia DESC LIMIT 3')
    res.render('home/index',{noticias:result.rows,title:'Home'})
})

app.get ('/noticias', async (req, res) => {
    var result= await db.query ('SELECT * FROM noticias ORDER BY id_noticia DESC')
    res.render ('noticias/noticias', {noticias:result.rows, title: 'Notícias'})

})

app.get ('/noticia', async (req, res) => {
     var id = req.query.id
     let result= await db.query ('SELECT * FROM noticias WHERE id_noticia=$1', [id])
     res.render ('noticias/noticia', {noticias:result.rows[0], title: 'Noticia'})

})

app.get ('/admin', (req, res) => {
    res.render ('admin/form_add_noticia', {title: 'Formulário'})
})

//criar uma rota responsável por salvar a notícia

app.post('/admin/salvar-noticia', async(req,res) => {
    // recuperar clientInformationcao pelo método post
    let{titulo,conteudo}= req.body
    await db.query('INSERT INTO noticias(titulo,conteudo)VALUES($1,$2)',[titulo,conteudo],(err, result)=>{
        res.redirect('/noticias')
    })
})


app.listen (port, () => {
    console.log ('Escutando na porta 3000 com Express')
})
