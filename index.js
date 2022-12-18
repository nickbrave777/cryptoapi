
const express = require('express')

require('dotenv').config()

const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const port = process.env.PORT

app.use(express.json())


const obtenerPrecios = async () => {
    try {
        const url = 'https://coinmarketcap.com/'

        const { data } = await axios({
            method: "GET",
            url
        })

        const $ = cheerio.load(data)

        const valores = [
            'id',
            'name',
            'price',
            'hora',
            'dia',
            'semana',
            'MarketCap',
            'Volume24h',
            'Circulacion'

        ]

        const elementSelector = '#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div:nth-child(1) > div.sc-f7a61dda-2.efhsPu > table > tbody > tr'

        const objectosArray = []

        $(elementSelector).each((obtenerIndex, obtenerElementos) => {

            let valorIndex = 0

            const objetos = {}

            if (obtenerIndex <= 9) {
                $(obtenerElementos).children().each((obtenerIndexH, obtenerElementosH) => {
                    const tdValue = $(obtenerElementosH).text()
                    if (tdValue) {
                        objetos[valores[valorIndex]] = tdValue
                        valorIndex++
                    }
                })

                objectosArray.push(objetos)
            }

        })

        return objectosArray

    } catch (error) {
        console.log(error)
    }
}


app.get('/', async (req, res) => {
    try {

        const precios = await obtenerPrecios()

        console.log(precios)

        return res.status(200).json({
            ok: true,
            resultado: precios
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: error

        })
    }

})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})