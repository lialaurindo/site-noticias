const {Pool}= require('pg')

const client= new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://dwdmgytcgtynnw:a04cb1b2856f295166d2f470b640218f4b504a05340e128d8288e9d482f362f8@ec2-3-211-6-217.compute-1.amazonaws.com:5432/d2r601dke9b2ai',
    ssl:{
        rejectUnauthorized:false
    }
})
//teste de conexão
// async function connecTeste(){
//     const res= await client.query('SELECT $1::text as message',['olá mundo'],(err,result) =>{
//         console.log(result.rows[0].message)
//     })
// }

// connecTeste()

module.exports=client